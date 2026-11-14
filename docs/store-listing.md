# Ashoke Medical — store listing text

For the Google Play and App Store listings, if the app is published there. For a staff-only app, a private channel is usually the better fit: see `ASHOKE_DEPLOYMENT.md` in the project root.

| Field | Text |
|---|---|
| App name | Ashoke Medical |
| Short description (80 characters) | Billing, stock and purchase software for the staff of Ashoke Medical. |
| Category | Business |
| Package / bundle id | `com.ashokemedical.app` |
| Privacy policy | `https://<web app address>/privacy-policy.html` |
| Account deletion | `https://<web app address>/delete-account.html` (also in the app: Profile → Delete account) |

## Full description

Ashoke Medical is the counter software of Ashoke Medical & General Stores, Chemist & Druggist. It is for the store's own staff; an account is created by the store's Admin.

- Bill at the counter by scanning a barcode or the pack, with batch and expiry picked automatically.
- Receive stock from a supplier bill, by typing it in or photographing it.
- See stock by batch and location, what is running low and what is about to expire.
- Keep customer and supplier accounts, payments and cheques.
- Record prescriptions for Schedule H, H1 and X medicines.
- Sales, purchase, GST, stock and Schedule H1 reports.
- Keeps billing when the internet drops and sends the bills when it returns.

## Review notes for the stores

- Sign-in is required. Give the reviewer a staff account created for the review, and remove it afterwards.
- **Camera** is used to scan barcodes and medicine packs and to photograph supplier bills, cheques and prescriptions.
- **Photos** are read only when the user picks an existing picture of a bill or cheque.
- Photographed bills, packs and cheques are sent to Google Gemini to read the printed text. The app asks before the first scan.
- The app records prescriptions and a Schedule H register. Declare this in the data-safety and privacy forms.
- No in-app purchases, no advertising, no tracking.

## Screenshots

Take them from the running app after the store's own data is in it, so they show Ashoke Medical rather than demo data: `scripts/captureStoreScreens.mjs` then `scripts/makeStoreScreenshots.mjs`.
