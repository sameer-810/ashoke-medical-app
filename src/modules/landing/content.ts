/**
 * Everything the public home page says. Edit here; the screen only lays it out.
 * A blank contact value hides its row; a blank licence shows "Displayed at the store".
 */
import {
  BadgeCheck,
  CalendarCheck,
  PackageCheck,
  Receipt,
  ShieldCheck,
  Snowflake,
  Stethoscope,
  Truck,
  type LucideIcon,
} from "lucide-react-native";

export const STORE = {
  name: "Ashok Medical & General Stores",
  tagline: "Chemist & Druggist",
  phone: "",
  whatsapp: "",
  address: "",
  hours: "",
  mapUrl: "",
};

export const LICENCES: { label: string; value: string }[] = [
  { label: "Drug Licence (Form 20)", value: "" },
  { label: "Drug Licence (Form 21)", value: "" },
  { label: "GSTIN", value: "" },
  { label: "Registered Pharmacist", value: "" },
];

export const REASONS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: BadgeCheck,
    title: "Genuine medicines only",
    text: "Every strip comes from an authorised distributor, with its purchase bill on record.",
  },
  {
    icon: CalendarCheck,
    title: "Expiry checked on every sale",
    text: "Stock is tracked batch by batch. The earliest-expiring batch is sold first, and expired stock cannot be billed.",
  },
  {
    icon: Stethoscope,
    title: "A pharmacist you can ask",
    text: "Dose, timing, substitutes and side effects explained at the counter before you pay.",
  },
  {
    icon: Receipt,
    title: "A proper bill, every time",
    text: "A GST bill with batch number and expiry date, so you always know exactly what you were given.",
  },
  {
    icon: Snowflake,
    title: "Stored the right way",
    text: "Medicines are kept as their label requires, away from heat, light and moisture.",
  },
  {
    icon: ShieldCheck,
    title: "Prescription medicines, responsibly",
    text: "Scheduled medicines are sold against a valid prescription and entered in the register.",
  },
];

export const QUALITY_STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Truck,
    title: "Bought",
    text: "From licensed distributors of the manufacturer.",
  },
  {
    icon: PackageCheck,
    title: "Checked",
    text: "Batch, expiry and MRP verified when stock arrives.",
  },
  {
    icon: Snowflake,
    title: "Stored",
    text: "Shelved by batch under the conditions on the label.",
  },
  {
    icon: Receipt,
    title: "Billed",
    text: "Sold with a bill that names the batch and expiry.",
  },
];

/** Manufacturers shown in the moving strip. Keep only the ones the store stocks. */
export const COMPANIES = [
  "Sun Pharma",
  "Cipla",
  "Dr. Reddy's",
  "Lupin",
  "Mankind",
  "Zydus",
  "Torrent",
  "Alkem",
  "Abbott",
  "GSK",
  "Pfizer",
  "Glenmark",
  "Intas",
  "Macleods",
  "Aristo",
  "Ipca",
  "Alembic",
  "Micro Labs",
  "USV",
  "Emcure",
  "Wockhardt",
  "Biocon",
  "Himalaya",
  "Dabur",
];
