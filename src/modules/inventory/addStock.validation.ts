import { normalizeDateInput } from "@modules/inventory/receiveDraft";

/** What the Add Stock form holds. Dates are "YYYY-MM" (as printed on packs). */
export interface AddStockForm {
  productId: string | null;
  barcode: string;
  /** True once a barcode scan was attempted, so an empty code is a mistake. */
  scanned: boolean;
  batchNumber: string;
  mfgDate: string;
  expiryDate: string;
  quantity: string;
  purchasePrice: string;
  mrp: string;
}

export type AddStockErrors = Partial<Record<keyof AddStockForm, string>>;

export interface AddStockCheck {
  errors: AddStockErrors;
  /** Allowed to save, but worth a second look. */
  warnings: string[];
  valid: boolean;
}

function toDate(iso: string | undefined): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
}

/** A number typed in a field, or NaN when it isn't one. Blank is NaN too. */
function num(s: string): number {
  const t = s.trim();
  return t && /^\d*\.?\d+$/.test(t) ? Number(t) : NaN;
}

/**
 * The rules for adding stock by scan. A month-only expiry means the last day of
 * that month, a month-only mfg date the 1st, exactly as the server reads them.
 */
export function checkAddStock(
  f: AddStockForm,
  today: Date = new Date(),
): AddStockCheck {
  const errors: AddStockErrors = {};
  const warnings: string[] = [];
  const day = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (!f.productId) errors.productId = "Pick or create the medicine";
  if (f.scanned && !f.barcode.trim())
    errors.barcode = "The scan gave no barcode — scan again or clear it";
  if (!f.batchNumber.trim()) errors.batchNumber = "Batch number is required";

  const exp = toDate(normalizeDateInput(f.expiryDate, "expiry"));
  if (!f.expiryDate.trim()) errors.expiryDate = "Expiry date is required";
  else if (!exp) errors.expiryDate = "Enter a valid expiry date";
  else if (exp <= day) errors.expiryDate = "Expiry must be after today";

  if (f.mfgDate.trim()) {
    const mfg = toDate(normalizeDateInput(f.mfgDate, "mfg"));
    if (!mfg) errors.mfgDate = "Enter a valid manufacturing date";
    else if (mfg > day)
      errors.mfgDate = "Manufacturing date can't be in the future";
    else if (exp && mfg > exp)
      errors.mfgDate = "Manufacturing date must be before expiry";
  }

  const qty = num(f.quantity);
  if (!f.quantity.trim()) errors.quantity = "Quantity is required";
  else if (Number.isNaN(qty)) errors.quantity = "Enter a number";
  else if (qty <= 0) errors.quantity = "Quantity must be more than 0";

  const price = num(f.purchasePrice);
  if (!f.purchasePrice.trim())
    errors.purchasePrice = "Purchase price is required";
  else if (Number.isNaN(price)) errors.purchasePrice = "Enter a valid price";

  const mrp = num(f.mrp);
  if (f.mrp.trim() && Number.isNaN(mrp)) errors.mrp = "Enter a valid MRP";
  else if (!Number.isNaN(mrp) && !Number.isNaN(price) && mrp < price)
    warnings.push(
      "MRP is lower than the purchase price — this stock sells at a loss.",
    );

  return { errors, warnings, valid: Object.keys(errors).length === 0 };
}
