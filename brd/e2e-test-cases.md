# End-to-End Test Cases — ClaimLane Portal

> **How to use this document:** Find your team section below. Each test case is numbered and self-contained. Follow the steps exactly as written. Only test cases marked **Ready for Testing** should be executed.
>
> **Status values:**
>
> | Status | Meaning |
> |--------|---------|
> | `Not Built Yet` | Feature is not yet developed. **Do not test.** |
> | `Ready for Testing` | Dev team has deployed this feature. **Go ahead and test.** |
> | `In Progress` | Tester is currently executing this test case. |
> | `PASS` | All steps passed as expected. |
> | `FAIL` | One or more steps did not match expected results. See Notes. |
>
> **For the dev team:** When a feature is deployed and ready, update the Status field from `Not Built Yet` to `Ready for Testing` and note the date.
>
> **Priority levels:**
>
> | Priority | Meaning |
> |----------|---------|
> | `P0 — Critical` | Core happy paths. Nothing works without these. |
> | `P1 — High` | Key business rules and major alternate flows. |
> | `P2 — Medium` | Edge cases, validation, and secondary flows. |
> | `P3 — Low` | Polish, UX, and operational verification. |
>
> **Testing model:** Each team is **self-sufficient**. CX testers play the customer role to submit returns/claims, then test CX agent actions. Operations testers play the customer role to create test data, then test warehouse, logistics, and vendor actions. No team depends on another team to set up test data.

---

## Team A — Product Team (Product Onboarding)

### TC-P01: Onboard New Products via Excel Upload (CA & US Templates) — `P0`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Log in to the ClaimLane admin portal. | Dashboard loads. |
| 2 | Navigate to **Product Onboarding**. | Upload screen appears with **two separate upload areas: CA template and US template**. |
| 3 | Download the **CA Excel template**. | Template downloads with columns: SKU, Product Name, Category, Subcategory, Final Sale (Yes/No), Fallback Weight (kg), Fallback Dimensions (LxWxH cm), Warranty Only (Yes/No). **No Region column** — region is determined by which template is used. |
| 4 | Fill in the CA template with **2 products**: one Mattress and one Accessory. | File saves without errors. |
| 5 | Upload the CA file. System asks for **admin confirmation** before saving. Confirm. | System confirms upload. Shows success count: 2 CA products added. Upload event logged (file name + timestamp). |
| 6 | Download the **US Excel template**. | Same column structure as CA template. |
| 7 | Fill in the US template with **2 products**: one Furniture (Final Sale = Yes) and the **same Accessory SKU** from Step 4 (product available in both regions). | File saves without errors. |
| 8 | Upload the US file. Confirm when prompted. | System confirms upload. Shows success count: 2 US products added. |
| 9 | Go to the **Product Listing** page. | Products organized into **two datasets: CA and US**. CA shows the Mattress and Accessory. US shows the Furniture and Accessory. |
| 10 | Verify the US Furniture item shows **Final Sale = Yes**. | Confirmed. |
| 11 | Verify the shared Accessory appears in **both** the CA and US datasets. | Confirmed — same SKU visible in both regions. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-P02: Upload Replacement Parts (Second Sheet) — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Prepare a **CA or US Excel template** with a furniture product on Sheet 1, and a **Replacement Parts** sheet (Sheet 2) with Parent SKU, Part SKU, and Part Name (e.g., "Drawer – Top Left"). | File ready with both sheets. |
| 2 | Upload the file to the corresponding region (CA or US). Confirm when prompted. | System confirms: 1 product added, replacement parts linked. |
| 3 | Go to **Product Listing**. Find the furniture SKU. | Product shows with linked replacement parts visible. |
| 4 | On the product detail page, click **Upload Product Guide**. | A file upload dialog appears accepting image or PDF files. |
| 5 | Upload a **product guide** (image or PDF) that shows which part comes from where (e.g., an annotated diagram labeling each replacement part on the product). | System confirms upload. The product guide is saved and displayed on the product detail page. |
| 6 | Verify the product guide is visible and linked to the correct SKU. | Product guide thumbnail/link appears on the product detail page. Clicking it opens the full guide. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-P03: Update an Existing Product via Excel Re-Upload — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Prepare a **CA or US Excel template** with a **previously onboarded SKU** for that region. Change the Weight to a new value. | File ready. |
| 2 | Upload the file to the corresponding region. Confirm when prompted. | System confirms update. Shows "1 product updated." |
| 3 | Go to **Product Listing** and find the SKU. | Weight reflects the new value. All other fields unchanged. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-P04: Remove a Product by Omitting from Upload — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Upload a new **CA Excel template** that **does not include** a previously onboarded CA SKU. Confirm when prompted. | System processes upload. The omitted SKU is removed from the **CA** product list. |
| 2 | Go to **Product Listing**. Search for the omitted SKU in the **CA dataset**. | SKU no longer appears in the CA product list. If the same SKU exists in the US template, it remains in the US dataset. |
| 3 | Check an existing ticket that previously referenced this SKU. | Ticket still shows the original product info (historical data preserved). |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-P05: Upload with Invalid / Missing Data — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Prepare a CA or US Excel template with: one row **missing the SKU field**, one row with an **invalid Category** (e.g., "Electronics"), one row with **missing Category**. | File ready. |
| 2 | Upload the file. | System rejects the file or flags the invalid rows with clear error messages per row. No partial import without confirmation. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-P06: View Product Listing — Read-Only, Search & Filter — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to **Product Listing**. | All onboarded products display. Products are organized into **two datasets: CA and US**. |
| 2 | Confirm columns: SKU, Name, Category, Final Sale flag. | All columns present and populated. |
| 3 | **Search** by SKU. | Correct product found. |
| 4 | **Search** by Product Name. | Correct product found. |
| 5 | **Filter** by Category (e.g., "Mattress"). | Only mattress products shown. |
| 6 | Attempt to edit a product directly from this screen. | No inline editing available (read-only). |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-P07: Warranty-Only Product Cannot Be Returned — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Onboard a product with **Warranty Only = Yes** (e.g., Custom Hybrid Mattress). | Product added. |
| 2 | On the customer portal, look up an order containing this product. Start a **Return**. | Item displays as **not eligible** for return. Cannot be selected. |
| 3 | Switch to **Warranty Claim**. | Item **is selectable** for a warranty claim (if within warranty period). |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

## Team B — Customer Service (CX) Team

> **Scope:** CX testers cover the customer-facing portal flows and CX agent admin actions (approve/decline, manual refund, overrides). Play the **customer role** to set up test data. Warehouse receiving, vendor assignment, and logistics are tested by the Operations team — see cross-references at the end of each test case.

### TC-CX01: Online CA Mattress Return — Auto-Refund (< $600) — `P0`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open the customer-facing portal. Select **Online Canada** as channel. | Channel selected. |
| 2 | Select **Return** as intent. | Return flow begins. |
| 3 | Enter a valid **order number + email** for a CA order with a mattress delivered within the last 365 nights, total value **under $600**, no bundles. | Items from the order display. Eligible items show as selectable (no status label on eligible items). |
| 4 | Select the mattress. | Item selected. |
| 5 | Choose a return reason (e.g., "Too Firm"). Confirm it is **not** "Defective." | Reason accepted. Proceeds to documentation. |
| 6 | Confirm whether mattress is **boxed or unboxed**. Select **Boxed**. | Boxed mattress flow activates. |
| 7 | Upload required photo: **photo of the box** (law tag is not required for boxed mattresses — it is only visible once unboxed). Enter lot number and description. | Upload accepted. Lot number and description saved. |
| 8 | Submit the return request. | Shipping label generated (package count determined automatically by shipping endpoint). Drop-off instructions displayed. Ticket created. |
| 9 | **[CX Agent]** Check the admin portal for the new ticket. | Ticket visible with all details: item, reason, photos, lot number, tags (category + issue type). |
| 10 | Customer drops off the package at the courier location (or courier picks up from customer). | Package in transit. **Auto-refund initiated** — system automatically triggers refund as soon as shipment is in transit (value < $600, no bundles) (BR-21, BR-26). |
| 11 | **Verify** shipment tracking in the admin portal. | System auto-tracks via **EasyPost API**. Status auto-updates to **"Picked"** when courier confirms pickup. No manual action required. |
| 12 | **[CX Agent]** Verify refund status in admin portal. | Refund already initiated at in-transit. Audit trail logged. No duplicate refund can be initiated (BR-12). |

> **Ops continuation:** Warehouse receiving and inspection → TC-OP01.

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX02: Online CA Mattress Return — Manual Refund (>= $600) — `P0`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Repeat TC-CX01 Steps 1–8 but use an order with mattress value **$600 or more**. | Ticket created. Label generated. |
| 2 | Customer drops off / courier picks up. **Verify** status tracking in admin portal. | System auto-tracks via **EasyPost API**. Status auto-updates to "Picked." No manual action required. |
| 3 | Once package is in transit, **verify** system flags for **manual CX refund** (does NOT auto-refund because value ≥ $600). | Ticket routed to CX for manual refund. Refund flagged at in-transit (not after warehouse processing). |
| 4 | **[CX Agent]** Manually process the refund. | Refund completed. Audit trail logged. No duplicate refund can be initiated (BR-12). |

> **Ops continuation:** Warehouse receiving and inspection → TC-OP01.

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### ~~TC-CX03: Mattress Return Within 30 Nights — Soft Warning~~ **[REMOVED]**

*This test case has been removed. The 30-night soft warning requirement was dropped per vendor platform constraints (ClaimLane does not support timed, delivery-date-based soft warnings). Mattresses within the first 30 nights are simply eligible for return with no special messaging. This scenario is already covered by TC-CX01.*

---

### TC-CX04: Online CA Unboxed Mattress Return (Vendor Pickup) — `P0`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start a return for a CA mattress order. At the boxed/unboxed step, select **Unboxed**. | Unboxed mattress flow activates. |
| 2 | Upload photos showing the mattress condition, **law tag photo**, and condition details. Enter lot number and description. | Uploads accepted. Lot number and description saved. |
| 3 | Submit the return. | Ticket created. **No shipping label generated** (unboxed mattresses require vendor pickup, not mail-in). Ticket routed to **Return Logistics Team**. |

> **Ops continuation:** Vendor assignment and pickup → TC-OP11. Vendor portal confirmation → TC-OP09.

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### ~~TC-CX05: Vendor Change After Assignment~~ **[MOVED → TC-OP12]**

*This test case has been moved to the Operations section as TC-OP12. Vendor assignment and change is an Operations (Return Logistics) responsibility.*

---

### ~~TC-CX06: Self-Donate — Full Customer Flow~~ **[MOVED → TC-OP13]**

*This test case has been moved to the Operations section as TC-OP13. Self-donate is initiated by the Return Logistics Manager (Operations role).*

---

### TC-CX07: Online CA Furniture Return (CX Pre-Approval + Charges) — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start a return for a **CA Furniture** order (delivered within 30 days). | Items display. Furniture item selectable. |
| 2 | Select the furniture item. Choose a return reason. Upload required photos (multiple angles, tag, assembly guide markup if missing parts). Enter lot number and description. | All accepted. |
| 3 | System calls WooCommerce API for a **shipping/pickup charge quote**. Destination: **Caledonia warehouse**. | Quote amount displayed to customer. *(Disposal pickups use the same courier rate — standardized charge per BR-17.)* |
| 4 | Customer **accepts** the charge. Provides pickup details and access constraints. Submits. | Ticket created. Marked as **pending CX approval**. Charge agreed but **not finalized** until CX approves. |
| 5 | **[CX Agent]** Review the ticket (photos + agreed charge). **Approve** the return. | Shipping label **auto-generates**. Destination: Caledonia warehouse. Charge finalized/processed. Customer receives approval email with label and pickup instructions. |
| 6 | **[CX Agent]** Test the **decline** path: decline a different furniture return. | Customer receives decline email. No label generated. No charge processed. |

> **Ops continuation:** Shipment tracking verification → TC-OP07. Warehouse receiving and inspection → TC-OP01.

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX08: Online US Furniture Return (Fulfil API Routing) — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start a return for a **US Furniture** order. Upload photos, enter details. System calls WooCommerce API for shipping charge. | Charge quote displayed. |
| 2 | Customer accepts charge, provides pickup details, submits. | Ticket created as **pending CX approval**. Charge agreed but not finalized. |
| 3 | **[CX Agent]** Approve the return. System determines destination via **Fulfil ERP API** — origin warehouse (LA or NJ). | Label **auto-generated** with correct US warehouse destination. Charge finalized. |
| 4 | For an order shipped from **multiple warehouses**, verify the system routes to the **closest warehouse** to the customer's address (Google Maps geocoding). | Correct closest warehouse (LA – JDLLA or NJ – JDLNJ) on the label. |

> **Ops continuation:** Shipment tracking verification → TC-OP08. US warehouse offline processing → TC-OP04.

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX09: CA Accessories / Bedding Return — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start a return. Channel: **Online Canada**. Select an **Accessory or Bedding** item (delivered within 100 nights). | Item selectable. |
| 2 | Choose a return reason. Upload required photos and tag photos. Enter lot number and description. | All accepted. |
| 3 | Submit. | **Mail-in return label** generated with instructions. Destination: **Caledonia warehouse** (BR-18 single-step flow). |

> **Ops continuation:** Shipment tracking → TC-OP07. Warehouse receiving and inspection → TC-OP01.

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX10: US Accessories Return — Opened Item (50% Keep Offer) — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start a return. Channel: **Online US**. Select an **Accessory/Bedding** item (delivered within 100 nights). | Item selectable. |
| 2 | Indicate the item is **opened/used**. | System presents **Option 1: Keep the item at 50% of full website price** (no proof required). |
| 3 | Customer **accepts** the 50% keep offer. | 50% refund processed. No return label generated. Customer keeps the item. Ticket created with "50% keep" resolution. Decision logged. |
| 4 | Repeat — customer **rejects** the 50% keep offer. | **Customer Care ticket** created. CX contacts the customer offline to encourage Option 2 (donate for 100% refund with CX-verified proof). Rejection logged on ticket. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX11: US Accessories Return — Unopened Item — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start a return for a US Accessory that is **unopened**. | No 50% keep offer shown (keep offer is for opened items only per BR-23). |
| 2 | Complete documentation and submit. | Shipping label generated. Standard mail-in return flow. |

> **Ops continuation:** Shipment tracking → TC-OP08. US warehouse offline processing → TC-OP04.

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX12: Defective Reason — Blocked, Redirect to Warranty — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start a **Return** flow. Select any item. | Item selected. |
| 2 | Choose **"Defective"** as the return reason. | System **blocks** the return. Displays message: *"This is a warranty claim. Please restart the process and select 'Warranty Claim' as your intent."* |
| 3 | Confirm the customer cannot proceed with the return from this point. | Blocked. No ticket created. No "Next" or "Continue" button available. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX13: Warranty Claim — Full Flow with Replacement — `P0`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open portal. Select channel. Select **Warranty Claim** as intent. | Warranty flow begins. |
| 2 | Enter valid order number + email. | Items display with **replacement parts shown with product context** (e.g., Nara Dresser → Drawer – Top Left, Screw, etc.). Items within warranty period are selectable (even if return window is closed). |
| 3 | Verify the **product guide** is displayed for the selected product (e.g., annotated diagram showing which part comes from where). | Product guide visible — helps customer identify the correct defective part before selecting. Guide was uploaded during product onboarding (see TC-P02). |
| 4 | Select the item. Choose the defective **part/component** (e.g., a specific drawer). | Part selected. |
| 5 | Complete documentation: issue description, photos of defect, address confirmation. Enter lot number and description. | All accepted. |
| 6 | Submit the warranty claim. Verify **no pickup assistance option** is presented during submission (FR-35 — pickup is CX follow-on only). | Ticket created with selected part SKUs, evidence, and notes. Marked as **pending CX review**. No pickup fields shown to customer. |
| 7 | **[CX Agent]** Review the claim. Validate photos. **Override the part selection** to a different part (test CX override capability). **Approve** the warranty claim. | Claim approved with overridden part SKU. Default assumption: customer does **not** need pickup assistance. |
| 8 | **Verify** replacement order is automatically created via **WooCommerce API** using the approved replacement part SKUs. | System auto-creates the order using customer's billing/shipping details (FR-24). Order status set to "Processing." Customer notified via WooCommerce. Order linked to the warranty ticket. |
| 9 | Case closed. | Case marked complete after replacement order placed. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX14: Warranty Claim — Courier Pickup with "(Defective)" Label — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Complete and approve a warranty claim (TC-CX13 Steps 1–7). | Claim approved. |
| 2 | **[Customer → CX Agent]** Customer calls CX to request **pickup assistance**. CX adds pickup assistance to the case. | Pickup assistance added. |
| 3 | **[CX Agent]** Select **Courier Pickup** as the pickup type. | Return label generated. Label includes the text **"(Defective)"** to signal the warehouse to bypass inspection (BR-27). |
| 4 | Verify the label text. | "(Defective)" text confirmed on label. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX15: Warranty Claim — Disposal Pickup — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | **[CX Agent]** From an approved warranty claim with pickup assistance, select **Disposal Pickup**. | Case logged for **Return Logistics Team** to assign a disposal vendor. |

> **Ops continuation:** Vendor assignment for disposal pickup → TC-OP14.

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX16: Warranty Claim — Declined — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Submit a warranty claim (TC-CX13 Steps 1–6). | Ticket created. |
| 2 | **[CX Agent]** Review and **decline** the warranty claim. | Customer receives decline email with reason. No replacement order created. Ticket closed with decline reason logged. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX17: Third-Party Vendor Return — TSC / EQ3 — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open the **vendor-specific generic link** for TSC or EQ3 (link identifies vendor only, not customer-specific). | Third-party flow begins. |
| 2 | **Terms & Conditions gate** appears. Verify it states: (1) No refund will be issued by Silk & Snow, (2) The return is not authorized by the third-party partner. | T&C page displayed with both disclosures. There is **no decline button** — customer either accepts or closes the page. |
| 3 | **Accept** T&C (checkbox + confirm button). | Proceeds to pickup details. |
| 4 | Enter pickup details: address, access constraints, preferred dates, contact info. Upload photos. | All fields captured. |
| 5 | Submit. | Ticket created, tagged with the third-party vendor name (TSC or EQ3). |
| 6 | **[CX Agent]** Review. Select **Courier** pickup — generate return label. | Label generated. Pickup coordinated. **No S&S refund issued** (refund is vendor's responsibility per BR-1). |
| 7 | **[CX Agent]** For a separate ticket, select **Disposal** pickup. | Case logged for **Return Logistics Team** to assign a disposal vendor. |

> **Ops continuation:** Third-party vendor assignment and pickup → TC-OP11, TC-OP14.

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX18: Retail Store Return (Shopify POS) — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Select **Silk & Snow Retail Store** as channel. | Routes to WooCommerce online order flow (shared with Shopify POS orders). |
| 2 | Enter order number + email. | Order validated against WooCommerce/Shopify POS data. |
| 3 | Complete return flow for an eligible item. | Ticket created with retail channel context. Routing follows standard rules. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX19: Sleep Country Retail Store — Blocked — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Select **Sleep Country Retail Store** as channel. | System displays message: *"This return cannot be processed through this portal. Please call the Sleep Country Customer Service team for further instructions."* |
| 2 | Confirm the flow ends. No order lookup, no ticket, no label. | Flow ends completely. No further actions available. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX20: Duplicate Return Prevention — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Complete a return for an item (use any previous test case). | Ticket created. |
| 2 | Attempt to start **another return for the same item** on the same order. | System blocks the duplicate. Item shows as **"Already Returned."** |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX21: Double Submit Prevention — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Complete a return flow up to the final Submit step. | Ready to submit. |
| 2 | Click **Submit** rapidly **twice** (or refresh and re-submit). | Only **one** ticket is created. Only **one** refund is initiated. No duplicates. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX22: Ineligible Item — Past Return Window — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Look up an order with a mattress delivered **more than 365 nights ago**. | Item displays as **ineligible** with a fixed ineligibility message (no specific reason shown). |
| 2 | Confirm the item **cannot be selected** for return. | Item is greyed out or blocked. |
| 3 | Switch to **Warranty Claim**. Mattress is within 15-year warranty period. | Item **is selectable** for warranty. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX23: Final Sale Item — Not Returnable — `P1`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Look up an order containing a **Final Sale** item (the one onboarded with Final Sale = Yes in TC-P01). | Item displays as **ineligible**. |
| 2 | Confirm it cannot be selected for return. | Blocked. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX24: Order Lookup — Security Validation — `P0`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter a **valid order number** with an **incorrect email**. | Lookup fails. Generic error message. No order details revealed. |
| 2 | Enter an **invalid order number** with a valid email. | Same generic error. No details revealed. |
| 3 | Enter an email with **leading/trailing spaces** and a valid order number. | System trims email spaces. Order found and displays successfully (FR-4). |
| 4 | Enter a valid email and an **order number with leading/trailing spaces**. | Lookup fails — order number is **not trimmed** (FR-4). Generic error message. |
| 5 | Enter an **invalid email format** (e.g., "notanemail"). | Validation error shown before lookup attempt. |
| 6 | Enter **both correct** (valid email + valid order number). | Order details display. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX25: Upload Validation — File Type and Size — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | During documentation upload, attempt to upload an **unsupported file type** (e.g., .exe, .zip). | Upload rejected with clear error: invalid file type. |
| 2 | Upload an image file **larger than 50 MB**. | Upload blocked with clear error: file too large (50 MB limit). |
| 3 | Upload a video file in an **unsupported format** (e.g., .avi, .wmv). | Upload rejected. Only **.mov** and **.mp4** video formats are accepted. |
| 4 | Upload a valid **.mov or .mp4** video file. | Upload accepted. Video compressed if above 50 MB. |
| 5 | Upload a valid photo in **any image format** (e.g., .jpg, .png, .bmp, .webp). | Upload accepted — no image format restriction is enforced. Preview shown. |
| 6 | Attempt to **submit without uploading all required documents**. | Submission blocked. Missing documents highlighted. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX26: CX Documentation Override — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | A customer submits a return/warranty claim but is missing a required document (e.g., no tag photo). | Submission blocked on the customer side. |
| 2 | **[CX Agent]** Manually override the documentation requirement for this ticket. | Override applied. CX can proceed with the ticket. Override action logged in audit trail. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX27: Label Reprint — No Duplicate Labels — `P3`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Complete a return where a shipping label was generated. | Label visible with tracking number. |
| 2 | Click **Reprint Label**. | Same label reprints. **No new label created.** Same tracking number. No extra charges. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX28: Return Label Count Cap — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Complete a return for an order that originally shipped in **2 boxes**. | System calls the shipping endpoint. |
| 2 | Verify the number of return labels generated does **not exceed 2** (the original box count). | Labels capped at original order's box count (BR-22). |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX29: Session State Preservation — `P3`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start a return. Complete order lookup and item selection. | Progress saved. |
| 2 | Close the browser tab or navigate away. Reopen / return to the portal. | Session resumes from where the customer left off. No data lost. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX30: Help Page Content — `P3`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to the **Help** page from any screen. | Help page loads. |
| 2 | Verify the page shows: **Silk & Snow support email** and **chatbot link**. | Both present. |
| 3 | Verify **no telephone numbers** or other support channels are listed. | Confirmed — only email and chatbot. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX31: Email Notifications — All Triggers — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | CX approves a furniture return. | Customer receives approval email. |
| 2 | CX declines a furniture return. | Customer receives decline email. |
| 3 | CX declines a warranty claim. | Customer receives decline email with reason. |

> **Note:** Vendor-related email notifications (assignment, change, pickup) are tested in Operations: TC-OP11, TC-OP12, TC-OP15.

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### ~~TC-CX32: Category Filtering — Only Relevant Items Shown~~ **[REMOVED]**

*This test case has been removed. FR-8 (Category Filtering) was dropped per stakeholder feedback — the portal shows all items on the order regardless of category and the flow adapts based on what the customer selects.*

---

## Team C — Operations Team

> **Scope:** Operations testers cover warehouse processing (Caledonia & US), vendor/logistics management (Return Logistics Manager), and the Vendor Portal. Play the **customer role** to create test data when needed (submit returns via the portal to generate tickets). Roles tested: Caledonia Team, Return Logistics Manager, Internal Ops, Vendor.

### TC-OP01: Caledonia Warehouse — Receive & Inspect Return — `P0`

**Prerequisites:** Submit a CA return via the customer portal (e.g., follow TC-CX01 Steps 1–8 as the customer) and have the package delivered to Caledonia warehouse.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Log in to ClaimLane with **Caledonia warehouse role** (limited access). | Only warehouse-relevant screens visible. No access to CX functions, refunds, or product onboarding. |
| 2 | Find the return that has been physically received at Caledonia. | Return record visible with item details. |
| 3 | Update status from **Delivered → Processing**. | Status updates. Timestamp logged. |
| 4 | Update status from **Processing → Inspection Completed**. | System prompts for **Inspection Grade**. |
| 5 | Select **Grade A (Resalable)**. Enter a mandatory reason/note. | Grade and reason saved. Status is now "Inspection Completed." |
| 6 | Repeat with **Grade B (Donatable)** and **Grade C (Damaged)** on separate items. | All grades accepted with mandatory reasons. |
| 7 | Verify this status update triggers the **"Received" logic** (WF-089). | Status transitions to "Received." Note: refund is already initiated at **in-transit** (not at warehouse receiving). Warehouse receiving confirms physical receipt and completes the inspection record. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP02: Caledonia — Inspection Grade Requires Reason — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | During inspection, select a grade but **leave the reason blank**. | System prevents saving. Error: "Reason is required." |
| 2 | Try to skip the grade dropdown (leave it unselected) and save. | System prevents saving. Grade selection is mandatory. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP03: Returned Items Report — Caledonia — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to **Returned Items Report**. | Report loads. |
| 2 | Verify report columns: **SKU, Description, Inspection Grade (A/B/C), Delivery Date, Inspection Date, Quantity**. | All columns present and populated. |
| 3 | Find an item that has **multiple units with different grades** (e.g., 2 units of same SKU — one Grade A, one Grade B). | Each grade shows as a **separate row** with correct quantity per row. |
| 4 | Verify **Delivery Date** = date the return was received at the warehouse. Verify **Inspection Date** = date the inspection grade was assigned. | Both dates correct and distinct. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP04: US Warehouse — Offline Status Update (LA/NJ) — `P2`

**Prerequisites:** Submit a US return via the customer portal (e.g., follow TC-CX08 or TC-CX11 as the customer) and have the package delivered to the US warehouse.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Simulate: a return arrives at LA or NJ warehouse. Warehouse staff sends an **email to Internal Ops** with item status. | Email received by Internal Ops. |
| 2 | **[Internal Ops]** Log into ClaimLane and manually update the return status: **Delivered → Processing → Inspection Completed** (with grade and reason). | Status updated in the portal. Audit trail logged. |
| 3 | Verify the update triggers the **"Received" logic** (WF-089) and refund processing begins. | Refund auto-processes if value < $600 and no bundles. Flags for manual CX refund if ≥ $600 or bundles. |
| 4 | Verify the update appears in the **Returned Items Report**. | Item shows with correct SKU, grade, dates, and quantity. |
| 5 | Verify Internal Ops has **no Caledonia-specific access** (US portal only). | Confirmed — access scoped to US warehouse operations. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP06: Caledonia Role — Access Restriction — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Log in with Caledonia warehouse credentials. | Limited dashboard loads. |
| 2 | Attempt to access **CX ticket management**. | Access denied or menu not visible. |
| 3 | Attempt to access **Refund processing**. | Access denied or menu not visible. |
| 4 | Attempt to access **Product Onboarding**. | Access denied or menu not visible. |
| 5 | Confirm the only available actions are: **update return status, select inspection grade, view returned items report**. | Confirmed — no other functionality accessible. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP07: Warehouse Routing — CA Returns to Caledonia — `P1`

**Prerequisites:** Submit a CA return via the customer portal (any category).

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Complete a CA return (any category). | Shipping label generated. |
| 2 | Verify the label destination is **Caledonia warehouse**. | Confirmed. |
| 3 | **Verify** shipment tracking in the admin portal. | System auto-tracks via **EasyPost API**. Status auto-updates to **"Picked"** when courier confirms pickup. No manual action required. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP08: Warehouse Routing — US Returns via Fulfil API — `P1`

**Prerequisites:** Submit a US return via the customer portal.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Complete a US return for an item shipped from a **single warehouse**. | System calls Fulfil ERP API. |
| 2 | Verify the label destination is the **origin warehouse** (LA or NJ). | Correct warehouse on the label. |
| 3 | Complete a US return for an order shipped from **multiple warehouses** (split shipment). | System calls Fulfil ERP API + Google Maps geocoding. |
| 4 | Verify the label destination is the **closest warehouse** to the customer's shipping address. | Correct closest warehouse (LA – JDLLA or NJ – JDLNJ) on the label. |
| 5 | **Verify** shipment tracking in the admin portal. | System auto-tracks via **EasyPost API**. Status auto-updates to **"Picked"** when courier confirms pickup. No manual action required. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP09: Vendor Portal — Pickup Confirmation — `P1`

**Prerequisites:** An unboxed mattress return has been submitted and a vendor has been assigned (see TC-OP11).

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Log in as a **donation/pickup vendor**. | Vendor portal loads. Only assigned pickups visible. No access to other tickets or admin functions. |
| 2 | Find an assigned pickup. View details: address, access constraints, available dates. Confirm **no customer photos** are visible (for unboxed mattress pickups — FR-20). | Details visible. Photos not shown. |
| 3 | Mark the item as **"Picked"**. | Status auto-transitions: **"Picked" → "Received"** (BR-16). Change reflected in the admin portal. Refund logic triggers based on order value (auto if < $600, manual if ≥ $600). |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP10: Audit Trail Verification — `P3`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Perform several actions across the system: create a ticket, assign a vendor, process a refund, update warehouse status. | All actions complete. |
| 2 | Review the **audit trail** for each action. | Every action logged with: **who** performed it, **what** was done, and **timestamp**. |
| 3 | Verify failed API calls (label generation, refund) are logged with error details. | Failures logged with clear guidance for resolution. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP11: Unboxed Mattress — Vendor Assignment & Pickup — `P0`

**Prerequisites:** Submit an unboxed mattress return via the customer portal (follow TC-CX04 Steps 1–3 as the customer). Ticket is routed to Return Logistics Team.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | **[Return Logistics Manager]** Open the ticket. Select a **donation/pickup vendor** from the vendor list. | Vendor assigned. |
| 2 | Confirm that **photos are NOT sent to the vendor** (FR-20). | Vendor receives automated email notification (without customer photos). Customer receives notification with pickup details. |
| 3 | **[Vendor]** Log in to the **Vendor Portal**. Find the assigned pickup. | Vendor sees the pickup with address, access constraints, and available dates — **no customer photos visible**. |
| 4 | **[Vendor]** Pick up the mattress. Mark the item as **"Picked"** in the Vendor Portal. | Status auto-transitions: **"Picked" → "Received"** (BR-16). Refund logic triggers based on order value (auto if < $600, manual if ≥ $600). |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP12: Vendor Change After Assignment — `P2`

**Prerequisites:** An unboxed mattress return has a vendor assigned (use TC-OP11).

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | **[Return Logistics Manager]** Change the vendor to a **different vendor**. | New vendor assigned. |
| 2 | Verify: old vendor receives notification of removal, new vendor receives assignment notification, customer receives updated notification. | All three emails sent. |
| 3 | **[Vendor]** New vendor logs in to Vendor Portal. | Sees the reassigned pickup. Old vendor no longer sees it. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP13: Self-Donate — Return Logistics Flow — `P2`

**Prerequisites:** An unboxed mattress return has been submitted (follow TC-CX04 Steps 1–3 as the customer). Ticket is routed to Return Logistics Team.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | **[Return Logistics Manager]** Confirm no vendor is available. Select **"Self-Donation"** from the vendor list. | Self-donation option selected. Customer receives self-donation instruction email. |
| 2 | **[Customer]** Donates the item, takes a photo as proof, and contacts CX via call or email with the photo. | CX receives the proof. |
| 3 | **[CX Agent]** Manually process the return in ClaimLane. Close the case. | Return processed. Case closed with donation proof logged. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP14: Warranty Disposal — Vendor Assignment — `P2`

**Prerequisites:** A warranty claim has been approved with disposal pickup selected by CX (see TC-CX15).

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | **[Return Logistics Manager]** Open the disposal case. Assign a **disposal vendor**. | Vendor assigned. Customer receives notification with pickup details. |
| 2 | **[Vendor]** Log in to the **Vendor Portal**. Find the assigned disposal pickup. | Vendor sees the pickup with address, access constraints, and available dates. |
| 3 | **[Vendor]** Pick up the item. Mark as **"Picked"** in the Vendor Portal. | Status auto-transitions: **"Picked" → "Received"** (BR-16). |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP15: Email Notifications — Operations Triggers — `P2`

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Assign a vendor to an unboxed mattress pickup. | Vendor receives assignment email. Customer receives pickup notification. |
| 2 | Change the vendor. | Old vendor: removal email. New vendor: assignment email. Customer: updated notification. |
| 3 | Third-party pickup ticket created (TSC/EQ3). Assign vendor. | Vendor receives assignment email. |
| 4 | Vendor completes a third-party pickup. | Vendor notified that item has been collected. |
| 5 | Select self-donation for a ticket. | Customer receives self-donation instruction email. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

## Open Q&A — Testing Questions

| # | Question | Status | Answer / Resolution |
|---|----------|--------|---------------------|
| Q1 | Once a label gets generated, how do we simulate **"Picked Up"** status in testing? This status triggers downstream processes (auto-refund at in-transit, EasyPost tracking, warehouse receiving). Do we need an EasyPost sandbox/test mode, or a manual override in the admin portal? | **Open** | _Needs technical input_ |
| Q2 | For TC-CX08 (US Furniture Return), we need to test shipments routed to **different US warehouse locations (LA vs. New Jersey)** via Fulfil ERP API. How do we set up test data / SKUs that route to each location? CX team needs guidance on this. | **Open** | _Needs technical input_ |
| Q3 | Technical team needs to provide test data: (1) an order with a **mattress delivered more than 365 days ago** (to test return window expiry / eligibility rejection — TC-CX22), and (2) an order with an item marked as **final sale** (to test final sale blocking — TC-CX23). | **Open** | _Needs technical input_ |

---

## Quick Reference — Test Coverage Map

| Area | Test Cases | Primary Team | Priority | Status |
|------|-----------|--------------|----------|--------|
| Product Onboarding & Excel Upload | TC-P01 to TC-P05 | Product | P0–P2 | Not Built Yet |
| Product Listing, Search & Filter | TC-P06 | Product | P1 | Not Built Yet |
| Warranty-Only Products | TC-P07 | Product | P1 | Not Built Yet |
| CA Mattress Returns (Boxed) | TC-CX01, TC-CX02 | CX | P0 | Not Built Yet |
| CA Mattress Returns (Unboxed — Customer Portal) | TC-CX04 | CX | P0 | Not Built Yet |
| CA Furniture Returns (CX Pre-Approval) | TC-CX07 | CX | P1 | Not Built Yet |
| US Furniture Returns (CX Approval + Fulfil Routing) | TC-CX08 | CX | P1 | Not Built Yet |
| CA Accessories / Bedding Returns | TC-CX09 | CX | P1 | Not Built Yet |
| US Accessories Returns (50% Keep, Unopened) | TC-CX10, TC-CX11 | CX | P1–P2 | Not Built Yet |
| Defective Reason Blocking | TC-CX12 | CX | P1 | Not Built Yet |
| Warranty Claims (Full Flow, Courier, Disposal, Decline) | TC-CX13 to TC-CX16 | CX | P0–P2 | Not Built Yet |
| Third-Party Returns (TSC, EQ3) | TC-CX17 | CX | P1 | Not Built Yet |
| Retail & Sleep Country Channel Routing | TC-CX18, TC-CX19 | CX | P2 | Not Built Yet |
| Duplicate / Double-Submit Prevention | TC-CX20, TC-CX21 | CX | P1 | Not Built Yet |
| Eligibility (Return Window, Final Sale) | TC-CX22, TC-CX23 | CX | P1 | Not Built Yet |
| Security & Input Validation | TC-CX24, TC-CX25 | CX | P0–P2 | Not Built Yet |
| CX Overrides & Label Management | TC-CX26, TC-CX27, TC-CX28 | CX | P2–P3 | Not Built Yet |
| Session, Help Page | TC-CX29, TC-CX30 | CX | P3 | Not Built Yet |
| CX Email Notifications | TC-CX31 | CX | P2 | Not Built Yet |
| ~~Category Filtering~~ | ~~TC-CX32~~ | ~~CX~~ | — | Removed |
| Caledonia Warehouse (Receive & Inspect) | TC-OP01, TC-OP02, TC-OP03 | Operations | P0–P2 | Not Built Yet |
| Caledonia Role Access | TC-OP06 | Operations | P2 | Not Built Yet |
| US Warehouse (Offline Processing) | TC-OP04 | Operations | P2 | Not Built Yet |
| Warehouse Routing (CA & US) | TC-OP07, TC-OP08 | Operations | P1 | Not Built Yet |
| Vendor Portal (Pickup Confirmation) | TC-OP09 | Operations | P1 | Not Built Yet |
| Vendor Assignment & Pickup (Unboxed Mattress) | TC-OP11 | Operations | P0 | Not Built Yet |
| Vendor Change After Assignment | TC-OP12 | Operations | P2 | Not Built Yet |
| Self-Donate Flow | TC-OP13 | Operations | P2 | Not Built Yet |
| Warranty Disposal — Vendor Assignment | TC-OP14 | Operations | P2 | Not Built Yet |
| Operations Email Notifications | TC-OP15 | Operations | P2 | Not Built Yet |
| Audit Trail | TC-OP10 | Operations | P3 | Not Built Yet |

---

## Requirements Traceability

| Requirement | Covered By |
|-------------|-----------|
| FR-1 (Channel Selection) | TC-CX01, TC-CX18, TC-CX19 |
| FR-2 (Intent Selection) | TC-CX01, TC-CX13 |
| FR-3/4/5 (Order Lookup & Validation) | TC-CX24 |
| FR-6 (Display Items) | TC-CX01, TC-CX22 |
| FR-7 (Eligibility Calculation) | TC-CX22, TC-CX23, TC-P07 |
| ~~FR-8 (Category Filtering)~~ | ~~TC-CX32~~ — Removed |
| FR-10 (Item Selection) | TC-CX01 |
| FR-12/13/14 (Reasons & Mapping) | TC-CX01, TC-CX12, TC-CX13 |
| FR-15/16/17 (Documentation) | TC-CX25, TC-CX26 |
| FR-18 (Package Count) | TC-CX01 |
| FR-19 (Label Generation) | TC-CX01, TC-CX28 |
| FR-20 (Pickup & Freight) | TC-CX04, TC-CX07, TC-CX08, TC-OP11 |
| FR-21 (Label Reprint) | TC-CX27 |
| FR-22 (Ticket Creation) | TC-CX01, TC-CX20 |
| FR-23 (Refund Processing) | TC-CX02, TC-OP01 |
| FR-24 (Replacement Order) | TC-CX13 |
| FR-26 (Session / Double Submit) | TC-CX29, TC-CX21 |
| FR-27 (Help Page) | TC-CX30 |
| FR-30 (Caledonia Portal) | TC-OP01, TC-OP02 |
| FR-31 (Reporting) | TC-OP03 |
| FR-32 (Email Triggers) | TC-CX31, TC-OP15 |
| FR-33 (Defective Blocking) | TC-CX12 |
| FR-34 (US Accessory Handling) | TC-CX10, TC-CX11 |
| FR-35 (Warranty Pickup) | TC-CX14, TC-CX15, TC-OP14 |
| FR-36/49 (Third-Party Logistics) | TC-CX17, TC-OP11 |
| FR-37 (US Warehouse Offline) | TC-OP04 |
| FR-38 (Self-Donate) | TC-OP13 |
| FR-39 (Flow Context Routing) | TC-CX01, TC-CX13, TC-CX17 |
| FR-41 (Warehouse Routing) | TC-OP07, TC-OP08 |
| FR-42 (Product Onboarding) | TC-P01, TC-P02 |
| FR-43 (Product Updates/Removal) | TC-P03, TC-P04 |
| FR-44 (Product Listing) | TC-P06 |
| FR-45 (Fulfil API) | TC-CX08, TC-OP08 |
| FR-46/47/48 (Third-Party Entry) | TC-CX17 |
| BR-1 (Third-Party No S&S Refund) | TC-CX17 |
| BR-2 (Order Security) | TC-CX24 |
| BR-5 (Complete Documentation + Override) | TC-CX25, TC-CX26 |
| BR-6 (CX Pre-Approval) | TC-CX07 |
| BR-7 (Duplicate Prevention) | TC-CX20 |
| BR-12 (Duplicate Refund Prevention) | TC-CX02 |
| BR-16 (Vendor Pickup → Received) | TC-OP09, TC-OP11 |
| BR-19 (Caledonia Role) | TC-OP01, TC-OP06 |
| BR-21 (Auto-Refund Threshold) | TC-OP01, TC-CX02 |
| BR-22 (Label Count Cap) | TC-CX28 |
| BR-27 (Warranty "(Defective)" Label) | TC-CX14 |
| BR-28 (US Warehouse Offline) | TC-OP04 |
| BR-29 (Self-Donate) | TC-OP13 |
| BR-30 (Furniture Destinations) | TC-CX07, TC-CX08 |
| NFR-6 (Audit Logging) | TC-OP10 |
| ~~NFR-8 (US Offline 24h SLA)~~ | ~~TC-OP05~~ — Removed |
