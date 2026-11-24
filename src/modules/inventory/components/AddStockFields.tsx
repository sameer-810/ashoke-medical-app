import React from "react";
import { View, StyleSheet } from "react-native";
import { AddStockForm } from "@modules/inventory/addStock.validation";
import { HStack, TextField, Select, DateField } from "@shared/ui";

interface Props {
  form: AddStockForm;
  set: (patch: Partial<AddStockForm>) => void;
  err: (key: keyof AddStockForm) => string | undefined;
  unit: string | null;
  units: { value: string; label: string }[];
  onUnit: (unit: string | null) => void;
}

/** Batch, dates, quantity and prices for Add stock. Prices are per `unit`. */
export function AddStockFields({ form, set, err, unit, units, onUnit }: Props) {
  const perUnit = unit ? ` (per ${unit})` : "";
  return (
    <>
      <HStack gap={10} wrap>
        <View style={styles.cell}>
          <TextField
            label="Batch number *"
            value={form.batchNumber}
            autoCapitalize="characters"
            onChangeText={(v) => set({ batchNumber: v })}
            error={err("batchNumber")}
          />
        </View>
        <View style={styles.cell}>
          <Select
            label="Unit"
            value={unit}
            options={units}
            onChange={onUnit}
            placeholder="Pick the medicine first"
          />
        </View>
      </HStack>

      <HStack gap={10} wrap>
        <View style={styles.cell}>
          <DateField
            label="Mfg date"
            mode="month"
            value={form.mfgDate}
            onChange={(v) => set({ mfgDate: v })}
            error={err("mfgDate")}
          />
        </View>
        <View style={styles.cell}>
          <DateField
            label="Expiry date *"
            mode="month"
            value={form.expiryDate}
            onChange={(v) => set({ expiryDate: v })}
            error={err("expiryDate")}
          />
        </View>
      </HStack>

      <HStack gap={10} wrap>
        <View style={styles.cell}>
          <TextField
            label={`Quantity *${unit ? ` (${unit})` : ""}`}
            value={form.quantity}
            keyboardType="decimal-pad"
            onChangeText={(v) => set({ quantity: v })}
            error={err("quantity")}
          />
        </View>
        <View style={styles.cell}>
          <TextField
            label={`Purchase price *${perUnit}`}
            value={form.purchasePrice}
            keyboardType="decimal-pad"
            onChangeText={(v) => set({ purchasePrice: v })}
            error={err("purchasePrice")}
          />
        </View>
        <View style={styles.cell}>
          <TextField
            label={`MRP${perUnit}`}
            value={form.mrp}
            keyboardType="decimal-pad"
            onChangeText={(v) => set({ mrp: v })}
            error={err("mrp")}
          />
        </View>
      </HStack>
    </>
  );
}

const styles = StyleSheet.create({
  cell: { flexGrow: 1, flexBasis: 160 },
});
