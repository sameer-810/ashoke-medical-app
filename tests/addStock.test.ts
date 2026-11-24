/** Inventory → Add stock: what may be saved, what must be fixed first. */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  checkAddStock,
  AddStockForm,
} from "../src/modules/inventory/addStock.validation";

const today = new Date(2026, 10, 24); // 24 Nov 2026
const good: AddStockForm = {
  productId: "p1",
  barcode: "",
  scanned: false,
  batchNumber: "AB123",
  mfgDate: "2026-01",
  expiryDate: "2028-06",
  quantity: "1",
  purchasePrice: "80",
  mrp: "100",
};
const check = (patch: Partial<AddStockForm>) =>
  checkAddStock({ ...good, ...patch }, today);

test("a complete form is valid", () => {
  const r = check({});
  assert.equal(r.valid, true);
  assert.deepEqual(r.warnings, []);
});

test("mandatory fields", () => {
  const r = check({
    productId: null,
    batchNumber: " ",
    expiryDate: "",
    quantity: "",
    purchasePrice: "",
  });
  assert.equal(r.valid, false);
  for (const k of [
    "productId",
    "batchNumber",
    "expiryDate",
    "quantity",
    "purchasePrice",
  ] as const)
    assert.ok(r.errors[k], k);
});

test("quantity must be a positive number", () => {
  assert.ok(check({ quantity: "0" }).errors.quantity);
  assert.ok(check({ quantity: "-2" }).errors.quantity);
  assert.ok(check({ quantity: "abc" }).errors.quantity);
  assert.equal(check({ quantity: "2.5" }).valid, true);
});

test("expiry must be after today; this month counts to its last day", () => {
  assert.ok(check({ expiryDate: "2026-10" }).errors.expiryDate);
  assert.ok(check({ expiryDate: "2026-11-24" }).errors.expiryDate);
  assert.equal(check({ expiryDate: "2026-11" }).valid, true); // 30 Nov
});

test("mfg date: not in the future, not after expiry", () => {
  assert.ok(check({ mfgDate: "2027-01" }).errors.mfgDate);
  assert.ok(check({ mfgDate: "2026-05", expiryDate: "2026-12" }).valid);
  assert.ok(check({ mfgDate: "2026-11", expiryDate: "2026-11-25" }).valid);
  assert.equal(check({ mfgDate: "" }).valid, true);
});

test("MRP below cost warns but still saves", () => {
  const r = check({ mrp: "50" });
  assert.equal(r.valid, true);
  assert.equal(r.warnings.length, 1);
  assert.ok(check({ mrp: "1,00" }).errors.mrp);
});

test("a scan that produced no code is an error", () => {
  assert.ok(check({ scanned: true, barcode: "" }).errors.barcode);
  assert.equal(check({ scanned: true, barcode: "8901234567890" }).valid, true);
});
