import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { X, PackagePlus, Camera, ScanText } from "lucide-react-native";
import { inventoryApi } from "@modules/inventory/api/inventoryApi";
import { productApi } from "@modules/product/api/productApi";
import { useCreateProduct } from "@modules/product/hooks/useProducts";
import { useAllLocations } from "@modules/warehouse/hooks/useWarehouse";
import { useReceiveStock } from "@modules/inventory/hooks/useInventory";
import {
  useMedicineSearch,
  importCatalogMedicine,
  CATALOG_PREFIX,
} from "@modules/inventory/hooks/useMedicineSearch";
import {
  emptyLine,
  toReceiptLines,
  unitOptions,
} from "@modules/inventory/receiveDraft";
import {
  NewProductDraft,
  toCreatePayload,
} from "@modules/inventory/productFromBill";
import {
  AddStockForm,
  checkAddStock,
} from "@modules/inventory/addStock.validation";
import { PackRead, ProductLite } from "@modules/inventory/types";
import { QuickAddProduct } from "@modules/inventory/components/QuickAddProduct";
import { AddStockFields } from "@modules/inventory/components/AddStockFields";
import { CameraScanner } from "@shared/CameraScanner";
import { PackTextScanner } from "@shared/PackTextScanner";
import { useScanGun } from "@shared/useScanGun";
import { scanFeedback } from "@shared/scanFeedback";
import { apiErrorMessage } from "@api/apiClient";
import { palette, radius } from "@shared/designSystem";
import {
  Text,
  VStack,
  HStack,
  Button,
  Banner,
  TextField,
  Select,
} from "@shared/ui";

interface Props {
  onClose: () => void;
}

type Picked = ProductLite & { manufacturer: string; barcode: string };
type Note = { tone: "success" | "warning" | "danger" | "info"; text: string };

const blankForm = (): AddStockForm => ({
  productId: null,
  barcode: "",
  scanned: false,
  batchNumber: "",
  mfgDate: "",
  expiryDate: "",
  quantity: "1",
  purchasePrice: "",
  mrp: "",
});
const month = (d: string | null) => (d ? String(d).slice(0, 7) : "");
const newDraft = (name: string): NewProductDraft => ({
  name,
  baseUnit: "tablet",
  packUnit: "strip",
  packFactor: "",
  mrp: "",
  gstPct: "",
  hsnCode: "",
  categoryId: null,
  brandId: null,
});

/**
 * Inventory → Add stock. Uses the same barcode camera, USB scan gun and pack
 * reader as the till, then saves through the goods-received endpoint, which
 * already tops up a batch that exists instead of duplicating it and writes the
 * stock ledger. Mount it only while open, so each open starts blank.
 */
export function AddStockModal({ onClose }: Props) {
  const [form, setForm] = useState<AddStockForm>(blankForm);
  const [product, setProduct] = useState<Picked | null>(null);
  const [unit, setUnit] = useState<string | null>(null);
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<Note | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [packOpen, setPackOpen] = useState(false);
  const [creating, setCreating] = useState<NewProductDraft | null>(null);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 250);
    return () => clearTimeout(t);
  }, [query]);

  const { items, loading } = useMedicineSearch(debounced);
  const { data: locations } = useAllLocations();
  const [locationId, setLocationId] = useState<string | null>(null);
  const location =
    locationId ?? (locations?.length === 1 ? locations[0].id : null);
  const createProduct = useCreateProduct();
  const receive = useReceiveStock();

  const set = (patch: Partial<AddStockForm>) => {
    setForm((f) => ({ ...f, ...patch }));
    setTouched((t) => new Set([...t, ...Object.keys(patch)]));
  };
  const check = checkAddStock(form);
  const err = (k: keyof AddStockForm) =>
    touched.has(k) ? check.errors[k] : undefined;
  const canSave =
    check.valid &&
    Boolean(location) &&
    Boolean(unit) &&
    !busy &&
    !receive.isPending;

  /** Load the medicine, default to its pack unit, and return the factor used. */
  const pick = async (id: string): Promise<number> => {
    const full = await productApi.get(id);
    const lite: Picked = {
      id: full.id,
      name: full.name,
      sku: full.sku,
      baseUnit: full.baseUnit,
      packs: full.packs || [],
      manufacturer: full.brandName || "",
      barcode: full.barcode || "",
    };
    const pack = lite.packs[0];
    setProduct(lite);
    setUnit(pack?.unit ?? lite.baseUnit);
    set({ productId: lite.id });
    return pack?.factor ?? 1;
  };

  const choose = async (value: string | null) => {
    if (!value) return;
    setBusy("Loading medicine…");
    try {
      const id = value.startsWith(CATALOG_PREFIX)
        ? (await importCatalogMedicine(value.slice(CATALOG_PREFIX.length))).id
        : value;
      await pick(id);
    } catch (e) {
      setNote({ tone: "danger", text: apiErrorMessage(e) });
    } finally {
      setBusy(null);
    }
  };

  /** A barcode from the camera, the scan gun, or typed + Enter. */
  const onBarcode = async (raw: string) => {
    setCameraOpen(false);
    const code = raw.trim();
    set({ barcode: code, scanned: true });
    if (!code) return;
    setBusy("Identifying medicine…");
    try {
      const res = await inventoryApi.scan(code);
      if (!res.product) throw new Error("not linked");
      const factor = await pick(res.product.id);
      const lot = res.kind === "batch" ? res.batch : undefined;
      if (lot)
        set({
          batchNumber: lot.batchNumber,
          mfgDate: month(lot.mfgDate),
          expiryDate: month(lot.expiryDate),
          mrp: lot.mrp ? String(+(lot.mrp * factor).toFixed(2)) : "",
          purchasePrice: lot.purchasePrice
            ? String(+(lot.purchasePrice * factor).toFixed(2))
            : "",
        });
      scanFeedback("ok");
      setNote({ tone: "success", text: `Found ${res.product.name}.` });
    } catch {
      scanFeedback("error");
      setNote({
        tone: "warning",
        text: `Barcode ${code} isn't linked to a medicine yet. Pick or create it below — the barcode is saved on it.`,
      });
    } finally {
      setBusy(null);
    }
  };
  useScanGun((code) => void onBarcode(code), {
    enabled: !cameraOpen && !packOpen && !creating,
    ignoreSelector: "#add-stock-barcode",
  });

  /** What the pack reader made out of the printed BATCH / EXP / MRP panel. */
  const onPack = async ({ read, match, candidates }: PackRead) => {
    setPackOpen(false);
    set({
      batchNumber: read.batchNumber || form.batchNumber,
      mfgDate: month(read.mfgDate) || form.mfgDate,
      expiryDate: month(read.expiryDate) || form.expiryDate,
      // The pack prints MRP for the whole pack, which is the default unit.
      mrp: read.mrp ? String(read.mrp) : form.mrp,
    });
    const known = match?.product ?? candidates[0]?.product;
    if (known && !product) {
      setBusy("Identifying medicine…");
      try {
        await pick(known.id);
      } finally {
        setBusy(null);
      }
    } else if (!product && read.productName) setQuery(read.productName);
    setNote({
      tone: read.batchNumber ? "success" : "warning",
      text: read.batchNumber
        ? "Read the pack. Check each value against the pack before saving."
        : "Couldn't read a batch number — type it from the pack.",
    });
  };

  const saveNew = (draft: NewProductDraft) =>
    createProduct.mutate(toCreatePayload(draft), {
      onSuccess: (created) => {
        setCreating(null);
        void choose(created.id);
      },
    });

  const save = async () => {
    if (!product || !location || !unit) return;
    setNote(null);
    try {
      // A scanned code that matched nothing is saved on the medicine, so the
      // next scan of this pack finds it straight away.
      if (form.barcode && !product.barcode)
        await productApi.update(product.id, { barcode: form.barcode });
      const line = {
        ...emptyLine(),
        productId: product.id,
        batchNumber: form.batchNumber.trim(),
        mfgDate: form.mfgDate,
        expiryDate: form.expiryDate,
        unit,
        quantity: form.quantity.trim(),
        purchasePrice: form.purchasePrice.trim(),
        mrp: form.mrp.trim(),
        locationId: location,
      };
      const receipt = await receive.mutateAsync({
        source: "scan",
        notes: "Added from Inventory by barcode scan / batch capture",
        lines: toReceiptLines([line], { [product.id]: product }),
      });
      scanFeedback("ok");
      const topped = receipt.lines[0]?.existingBatch;
      setNote({
        tone: "success",
        text: topped
          ? `Batch already exists, quantity updated. ${product.name} · ${line.batchNumber} (+${line.quantity} ${unit}).`
          : `Stock added: ${product.name} · new batch ${line.batchNumber} (${line.quantity} ${unit}).`,
      });
      setForm(blankForm());
      setTouched(new Set());
      setProduct(null);
      setUnit(null);
      setQuery("");
    } catch (e) {
      scanFeedback("error");
      setNote({ tone: "danger", text: apiErrorMessage(e) });
    }
  };

  const units = useMemo(() => unitOptions(product), [product]);

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <HStack align="center" gap={10} style={{ marginBottom: 12 }}>
            <View style={styles.icon}>
              <PackagePlus
                size={18}
                color={palette.teal[700]}
                strokeWidth={2}
              />
            </View>
            <VStack gap={1} flex={1}>
              <Text variant="h4" tone="primary">
                Add stock
              </Text>
              <Text variant="caption" tone="tertiary">
                Scan the barcode or read the batch panel, check, then save
              </Text>
            </VStack>
            <Pressable
              onPress={onClose}
              hitSlop={8}
              style={styles.close}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <X size={18} color={palette.text.tertiary} strokeWidth={2} />
            </Pressable>
          </HStack>

          <ScrollView keyboardShouldPersistTaps="handled">
            <VStack gap={12}>
              {note ? <Banner tone={note.tone} message={note.text} /> : null}
              {busy ? (
                <HStack gap={8} align="center">
                  <ActivityIndicator color={palette.teal[600]} />
                  <Text variant="body-sm" tone="secondary">
                    {busy}
                  </Text>
                </HStack>
              ) : null}

              <HStack gap={8} wrap>
                <Button
                  label="Scan barcode"
                  variant="secondary"
                  fullWidth={false}
                  icon={<Camera size={18} color={palette.text.primary} />}
                  onPress={() => setCameraOpen(true)}
                />
                <Button
                  label="Capture batch details"
                  variant="secondary"
                  fullWidth={false}
                  icon={<ScanText size={18} color={palette.text.primary} />}
                  onPress={() => setPackOpen(true)}
                />
              </HStack>

              <TextField
                nativeID="add-stock-barcode"
                label="Barcode"
                value={form.barcode}
                placeholder="Scan, or type and press Enter"
                onChangeText={(v) => set({ barcode: v })}
                onSubmitEditing={() => void onBarcode(form.barcode)}
                error={err("barcode")}
                trailing={
                  <Pressable
                    onPress={() => setCameraOpen(true)}
                    accessibilityRole="button"
                    accessibilityLabel="Scan barcode with camera"
                    hitSlop={8}
                  >
                    <Camera size={18} color={palette.teal[700]} />
                  </Pressable>
                }
              />

              <Select
                label="Medicine *"
                placeholder="Search your stock and the medicine catalogue"
                value={form.productId}
                selectedLabel={product?.name}
                options={items.map((i) => ({
                  value: i.value,
                  label: i.sublabel ? `${i.label} — ${i.sublabel}` : i.label,
                }))}
                onSearch={setQuery}
                loading={loading}
                onChange={(v) => void choose(v)}
                onRequestCreate={(typed) =>
                  setCreating(newDraft(typed || query))
                }
                createNoun="medicine"
                error={err("productId")}
                hint={
                  product
                    ? `Manufacturer: ${product.manufacturer || "not set"} · SKU ${product.sku}`
                    : undefined
                }
              />

              <AddStockFields
                form={form}
                set={set}
                err={err}
                unit={unit}
                units={units}
                onUnit={setUnit}
              />

              {(locations?.length ?? 0) > 1 ? (
                <Select
                  label="Location *"
                  value={location}
                  options={(locations || []).map((l) => ({
                    value: l.id,
                    label: `${l.code} — ${l.name}`,
                  }))}
                  onChange={setLocationId}
                />
              ) : null}

              {check.warnings.map((w) => (
                <Banner key={w} tone="warning" message={w} />
              ))}

              <HStack gap={10} justify="flex-end">
                <Button
                  label="Done"
                  variant="ghost"
                  fullWidth={false}
                  onPress={onClose}
                />
                <Button
                  label="Save stock"
                  fullWidth={false}
                  loading={receive.isPending}
                  disabled={!canSave}
                  onPress={() => void save()}
                />
              </HStack>
            </VStack>
          </ScrollView>
        </View>
      </View>

      <CameraScanner
        visible={cameraOpen}
        title="Scan pack barcode"
        onDetected={(code) => void onBarcode(code)}
        onClose={() => setCameraOpen(false)}
      />
      {packOpen ? (
        <PackTextScanner
          onPicked={() => undefined}
          onRead={(res) => void onPack(res)}
          onClose={() => setPackOpen(false)}
        />
      ) : null}
      {creating ? (
        <QuickAddProduct
          visible
          initial={creating}
          fromBill={Boolean(creating.name)}
          saving={createProduct.isPending}
          error={
            createProduct.isError ? apiErrorMessage(createProduct.error) : null
          }
          onCancel={() => {
            createProduct.reset();
            setCreating(null);
          }}
          onSave={saveNew}
        />
      ) : null}
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15,23,42,0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  sheet: {
    width: "100%",
    maxWidth: 640,
    maxHeight: "92%",
    backgroundColor: palette.surface.primary,
    borderRadius: radius.lg,
    padding: 20,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: palette.teal[50],
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
});
