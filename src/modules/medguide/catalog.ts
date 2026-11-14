/**
 * Maintenance of the medicine catalogue (Admin only): the list MedGuide,
 * "add from catalogue" and bill matching all read. API, hooks, types and the
 * form's validation in one file, since only two screens use them.
 */
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@api/apiClient";
import {
  requiredText,
  freeText,
  optionalNonNegative,
} from "@shared/form/fields";

export interface CatalogProduct {
  _id: string;
  sku: string;
  name: string;
  saltComposition: string;
  manufacturerName: string;
  mrp: number;
  prescriptionRequired: boolean;
  productForm: string;
  packLabel: string;
  /** Pack hierarchy used when a medicine is added to the store's products. */
  packUnit: string;
  packQty: number;
  baseUnit: string;
  hsnCode: string;
  isActive: boolean;
}

export interface CatalogStats {
  total: number;
  active: number;
  withImages: number;
  withClinical: number;
}

interface ListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CatalogListParams {
  page?: number;
  limit?: number;
  search?: string;
}

const api = {
  stats: () =>
    apiClient.get("/catalog/stats").then((r) => r.data.data as CatalogStats),
  list: (params: CatalogListParams) =>
    apiClient
      .get("/catalog", { params })
      .then((r) => r.data as { data: CatalogProduct[]; meta: ListMeta }),
  get: (id: string) =>
    apiClient.get(`/catalog/${id}`).then((r) => r.data.data as CatalogProduct),
  create: (body: Partial<CatalogProduct>) =>
    apiClient.post("/catalog", body).then((r) => r.data.data as CatalogProduct),
  update: (id: string, body: Partial<CatalogProduct>) =>
    apiClient
      .patch(`/catalog/${id}`, body)
      .then((r) => r.data.data as CatalogProduct),
  remove: (id: string) =>
    apiClient.delete(`/catalog/${id}`).then((r) => r.data.data),
};

// MedGuide searches read the same rows, so a change refreshes those too.
const invalidate = (qc: ReturnType<typeof useQueryClient>) => {
  qc.invalidateQueries({ queryKey: ["catalog"] });
  qc.invalidateQueries({ queryKey: ["medguide"] });
};

export const useCatalogStats = () =>
  useQuery({ queryKey: ["catalog", "stats"], queryFn: api.stats });

export const useCatalog = (params: CatalogListParams) =>
  useQuery({
    queryKey: ["catalog", "list", params],
    queryFn: () => api.list(params),
  });

export const useCatalogProduct = (id: string | undefined) =>
  useQuery({
    queryKey: ["catalog", "item", id],
    queryFn: () => api.get(id as string),
    enabled: Boolean(id),
  });

export function useCreateCatalog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (b: Partial<CatalogProduct>) => api.create(b),
    onSuccess: () => invalidate(qc),
  });
}

export function useUpdateCatalog(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (b: Partial<CatalogProduct>) => api.update(id, b),
    onSuccess: () => invalidate(qc),
  });
}

export function useDeleteCatalog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.remove(id),
    onSuccess: () => invalidate(qc),
  });
}

/** Whole count; "" means not set. */
const optionalWhole = z
  .string()
  .trim()
  .refine((v) => v === "" || /^\d+$/.test(v), "Enter a whole number");

/** "" -> undefined so the server keeps its own default instead of storing 0. */
export const optionalNumber = (v: string) =>
  v.trim() === "" ? undefined : Number(v);

/**
 * A catalogue entry. Products are created from this, so a coerced
 * `Number("12..5") || 0` writing ₹0 MRP is not an acceptable failure mode —
 * non-numeric input is refused rather than rounded to nothing.
 *
 * packUnit/packQty/baseUnit/hsnCode feed "add from catalogue": without them
 * an added product has no pack hierarchy, a "pcs" base unit and a blank HSN on
 * every invoice line.
 */
export const catalogProductSchema = z.object({
  sku: requiredText("SKU"),
  name: requiredText("Name"),
  saltComposition: freeText,
  manufacturerName: freeText,
  mrp: optionalNonNegative,
  productForm: freeText,
  packLabel: freeText,
  packUnit: freeText,
  packQty: optionalWhole,
  baseUnit: freeText,
  hsnCode: freeText,
  prescriptionRequired: z.boolean(),
});
