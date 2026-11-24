import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProducts } from "@modules/product/hooks/useProducts";
import { productApi } from "@modules/product/api/productApi";
import { medguideApi } from "@modules/medguide/api/medguideApi";
import { ProductLite } from "@modules/inventory/types";
import { toProductLite } from "@modules/inventory/productFromBill";

/** Marks a picker row that comes from the GLOBAL catalogue, not this store. */
export const CATALOG_PREFIX = "catalog:";
/** Below this, a catalogue search matches too much to be worth the round trip. */
export const CATALOG_MIN_CHARS = 2;

/**
 * Searches this pharmacy's own products and the global medicine catalogue
 * (4 lakh+ medicines) together, so a medicine stocked for the first time is
 * picked from the catalogue instead of being typed in under a new spelling.
 * Catalogue rows the store already stocks (same SKU) are left out. `query`
 * should already be debounced.
 */
export function useMedicineSearch(query: string) {
  const { data: products, isFetching: productsLoading } = useProducts({
    search: query || undefined,
    limit: 50,
  });
  const catalogReady = query.trim().length >= CATALOG_MIN_CHARS;
  const { data: catalogHits, isFetching: catalogLoading } = useQuery({
    queryKey: ["grn-catalog", query],
    queryFn: () => medguideApi.search({ search: query, limit: 8 }),
    enabled: catalogReady,
    // A given search over a 4-lakh-row catalogue doesn't change mid-entry.
    staleTime: 5 * 60 * 1000,
  });

  const results = useMemo<ProductLite[]>(
    () => (products?.data || []).map(toProductLite),
    [products],
  );

  const items = useMemo(() => {
    const mine = results.map((p) => ({
      value: p.id,
      label: p.name,
      sublabel: p.sku,
    }));
    const haveSku = new Set(results.map((p) => p.sku));
    const fromCatalog = (catalogHits?.data || [])
      .filter((m) => !haveSku.has(m.sku))
      .map((m) => ({
        value: `${CATALOG_PREFIX}${m._id}`,
        label: m.name,
        sublabel: [m.saltComposition, m.manufacturerName]
          .filter(Boolean)
          .join(" · "),
        right: "+ Catalogue",
      }));
    return [...mine, ...fromCatalog];
  }, [results, catalogHits]);

  return {
    results,
    items,
    loading: productsLoading || catalogLoading,
  };
}

/**
 * Import a global-catalogue medicine into this store. Everything the catalogue
 * knows (salt, brand, pack unit + factor, MRP, GST, HSN, Rx flag) is copied
 * server-side, so nothing has to be typed.
 */
export async function importCatalogMedicine(
  catalogId: string,
  returnExisting = false,
): Promise<ProductLite> {
  const created = await medguideApi.addToStore(catalogId, { returnExisting });
  return toProductLite(await productApi.get(created.id));
}
