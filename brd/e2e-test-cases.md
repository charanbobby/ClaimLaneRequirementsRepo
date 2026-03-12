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

---

## Team A — Product Team (Product Onboarding)

### TC-P01: Onboard New Products via Excel Upload

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Log in to the ClaimLane admin portal. | Dashboard loads. |
| 2 | Navigate to **Product Onboarding**. | Upload screen appears. |
| 3 | Download the Excel template. | Template downloads with columns: SKU, Product Name, Category, Subcategory, Final Sale (Yes/No), Fallback Weight (kg), Fallback Dimensions (LxWxH cm), Warranty Only (Yes/No), Region (CA/US/BOTH). |
| 4 | Fill in **3 products**: one Mattress (Region: CA), one Furniture (Region: US, Final Sale = Yes), one Accessory (Region: BOTH). | File saves without errors. |
| 5 | Upload the completed Excel file. System asks for **admin confirmation** before saving. Confirm. | System confirms upload. Shows success count: 3 products added. Upload event logged (file name + timestamp). |
| 6 | Go to the **Product Listing** page. | All 3 products appear with correct values for every column. |
| 7 | Verify the Furniture item shows **Final Sale = Yes** and Region = **US**. | Confirmed. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-P02: Upload Replacement Parts (Second Sheet)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Prepare an Excel file with a furniture product on Sheet 1, and a **Replacement Parts** sheet (Sheet 2) with Parent SKU, Part SKU, and Part Name (e.g., "Drawer – Top Left"). | File ready with both sheets. |
| 2 | Upload the file. Confirm when prompted. | System confirms: 1 product added, replacement parts linked. |
| 3 | Go to **Product Listing**. Find the furniture SKU. | Product shows with linked replacement parts visible. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-P03: Update an Existing Product via Excel Re-Upload

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Prepare an Excel file with a **previously onboarded SKU**. Change the Weight to a new value. | File ready. |
| 2 | Upload the file. Confirm when prompted. | System confirms update. Shows "1 product updated." |
| 3 | Go to **Product Listing** and find the SKU. | Weight reflects the new value. All other fields unchanged. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-P04: Remove a Product by Omitting from Upload

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Upload a new Excel file that **does not include** a previously onboarded SKU. Confirm when prompted. | System processes upload. The omitted SKU is removed from active availability. |
| 2 | Go to **Product Listing**. Search for the omitted SKU. | SKU no longer appears in the active product list. |
| 3 | Check an existing ticket that previously referenced this SKU. | Ticket still shows the original product info (historical data preserved). |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-P05: Upload with Invalid / Missing Data

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Prepare an Excel file with: one row **missing the SKU field**, one row with an **invalid Category** (e.g., "Electronics"), one row with **missing Region**. | File ready. |
| 2 | Upload the file. | System rejects the file or flags the invalid rows with clear error messages per row. No partial import without confirmation. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-P06: View Product Listing — Read-Only, Search & Filter

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

### TC-P07: Warranty-Only Product Cannot Be Returned

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

### TC-CX01: Online CA Mattress Return — Auto-Refund (< $600)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open the customer-facing portal. Select **Online Canada** as channel. | Channel selected. |
| 2 | Select **Return** as intent. | Return flow begins. |
| 3 | Enter a valid **order number + email** for a CA order with a mattress delivered within the last 365 nights, total value **under $600**, no bundles. | Items from the order display. Eligible items show as selectable (no status label on eligible items). |
| 4 | Select the mattress. | Item selected. |
| 5 | Choose a return reason (e.g., "Too Firm"). Confirm it is **not** "Defective." | Reason accepted. Proceeds to documentation. |
| 6 | Confirm whether mattress is **boxed or unboxed**. Select **Boxed**. | Boxed mattress flow activates. |
| 7 | Upload required photos: base photo, full measurement photo, tag photo. Enter lot number and description. | All uploads accepted. Lot number and description saved. |
| 8 | Submit the return request. | Shipping label generated (package count determined automatically by shipping endpoint). Drop-off instructions displayed. Ticket created. |
| 9 | **CX Agent:** Check the admin portal for the new ticket. | Ticket visible with all details: item, reason, photos, lot number, tags (category + issue type). |
| 10 | Mark item as **Received** in the system. | Refund auto-processes (value < $600, no bundles). Refund confirmation logged with audit trail. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX02: Online CA Mattress Return — Manual Refund (>= $600)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Repeat TC-CX01 Steps 1–8 but use an order with mattress value **$600 or more**. | Ticket created. Label generated. |
| 2 | Mark item as **Received**. | System flags for **manual CX refund** (does NOT auto-refund). |
| 3 | CX agent manually processes the refund. | Refund completed. Audit trail logged. No duplicate refund can be initiated (BR-12). |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX03: Mattress Return Within 30 Nights — Soft Warning

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Look up an order with a mattress delivered **less than 30 nights ago**. | Mattress displays as eligible. |
| 2 | Select the mattress for return. | System shows a **soft warning** (e.g., "You are still within your trial period"). Item remains selectable — the warning does not block the return. |
| 3 | Proceed with the return. | Return completes normally. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX04: Online CA Unboxed Mattress Return (Vendor Pickup)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start a return for a CA mattress order. At the boxed/unboxed step, select **Unboxed**. | Unboxed mattress flow activates. |
| 2 | Upload photos showing the mattress condition. Enter lot number and description. | Uploads accepted. |
| 3 | Submit the return. | Ticket created. **No shipping label generated** (pickup required). |
| 4 | **Return Logistics Manager:** Open the ticket. Select a **donation/pickup vendor** from the vendor list. Confirm that **photos are NOT sent to the vendor** (FR-20). | Vendor assigned. Vendor receives automated email notification (without customer photos). |
| 5 | Verify the vendor can log in to the **Vendor Portal** and see the assigned pickup. | Vendor sees the pickup with address and details — no photos visible. |
| 6 | Vendor marks the item as **"Picked"** in the Vendor Portal. | Status updates to **"Picked"** → triggers transition to **"Received"** → refund logic begins (BR-16). |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX05: Vendor Change After Assignment

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | From an existing ticket with a vendor assigned (use TC-CX04), change the vendor to a **different vendor**. | New vendor assigned. |
| 2 | Verify: old vendor receives notification of removal, new vendor receives assignment notification, customer receives updated notification. | All three emails sent. |
| 3 | New vendor logs in to Vendor Portal. | Sees the reassigned pickup. Old vendor no longer sees it. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX06: Self-Donate — Full Customer Flow

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | **Return Logistics Manager:** For an unboxed mattress ticket, confirm no vendor is available. Select **"Self-Donation"** from the vendor list. | Self-donation option selected. Customer receives self-donation instruction email. |
| 2 | Customer donates the item and takes a photo as proof. Customer contacts CX via call or email with the photo. | CX receives the proof. |
| 3 | **CX Agent:** Manually processes the return in ClaimLane. Closes the case. | Return processed. Case closed with donation proof logged. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX07: Online CA Furniture Return (CX Pre-Approval + Charges)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start a return for a **CA Furniture** order (delivered within 30 days). | Items display. Furniture item selectable. |
| 2 | Select the furniture item. Choose a return reason. Upload required photos (multiple angles, tag, assembly guide markup if missing parts). Enter lot number and description. | All accepted. |
| 3 | System calls WooCommerce API for a **shipping/pickup charge quote**. Destination: **Caledonia warehouse**. | Quote amount displayed to customer. *(Disposal pickups use the same courier rate — standardized charge.)* |
| 4 | Customer **accepts** the charge. Provides pickup details and access constraints. Submits. | Ticket created. Marked as **pending CX approval**. |
| 5 | **CX Agent:** Review the ticket (photos + agreed charge). **Approve** the return. | Shipping label **auto-generates**. Destination: Caledonia warehouse. Customer receives approval email. |
| 6 | Test the **decline** path: CX **declines** a different furniture return. | Customer receives decline email. No label generated. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX08: Online US Furniture Return (Fulfil API Routing)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start a return for a **US Furniture** order. Complete documentation and CX approval (same as TC-CX07). | Ticket approved. |
| 2 | System determines destination via **Fulfil ERP API** (origin warehouse or closest: LA or NJ). | Label generated with correct US warehouse destination. |
| 3 | For an order shipped from **multiple warehouses**, verify the system routes to the **closest warehouse** to the customer's address (Google Maps geocoding). | Correct closest warehouse on the label. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX09: CA Accessories / Bedding Return

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start a return. Channel: **Online Canada**. Select an **Accessory or Bedding** item (delivered within 100 nights). | Item selectable. |
| 2 | Choose a return reason. Upload required photos and tag photos. Enter lot number and description. | All accepted. |
| 3 | Submit. | **Mail-in return label** generated with instructions. Destination: Caledonia. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX10: US Accessories Return — Opened Item (50% Keep Offer)

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

### TC-CX11: US Accessories Return — Unopened Item

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Start a return for a US Accessory that is **unopened**. | No 50% keep offer shown. |
| 2 | Complete documentation and submit. | Shipping label generated. Standard mail-in return flow. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX12: Defective Reason — Blocked, Redirect to Warranty

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

### TC-CX13: Warranty Claim — Full Flow with Replacement

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open portal. Select channel. Select **Warranty Claim** as intent. | Warranty flow begins. |
| 2 | Enter valid order number + email. | Items display with **replacement parts shown with product context** (e.g., Nara Dresser → Drawer – Top Left, Screw, etc.). Items within warranty period are selectable (even if return window is closed). |
| 3 | Select the item. Choose the defective **part/component** (e.g., a specific drawer). | Part selected. |
| 4 | Complete documentation: issue description, photos of defect, address confirmation. Enter lot number and description. | All accepted. |
| 5 | Submit the warranty claim. | Ticket created with selected part SKUs, evidence, and notes. Marked as **pending CX review**. |
| 6 | **CX Agent:** Review the claim. Validate photos. **Override the part selection** to a different part (test CX override capability). **Approve** the warranty claim. | Claim approved with overridden part SKU. |
| 7 | CX places a **replacement order** via WooCommerce using the **approved replacement part SKUs**. | Replacement order created, status set to "Processing." Customer notified via WooCommerce. Order linked to the warranty ticket. |
| 8 | Case closed. | Case marked complete after replacement order placed. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX14: Warranty Claim — Courier Pickup with "(Defective)" Label

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Complete and approve a warranty claim (TC-CX13 Steps 1–6). | Claim approved. |
| 2 | Customer calls CX to request **pickup assistance**. CX adds pickup assistance to the case. | Pickup assistance added. |
| 3 | CX selects **Courier Pickup** as the pickup type. | Return label generated. Label includes the text **"(Defective)"** to signal the warehouse to bypass inspection (BR-27). |
| 4 | Verify the label text. | "(Defective)" text confirmed on label. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX15: Warranty Claim — Disposal Pickup

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | From an approved warranty claim with pickup assistance, CX selects **Disposal Pickup**. | Case logged for **Return Logistics Team** to assign a disposal vendor. |
| 2 | Return Logistics Team assigns a vendor. | Vendor assigned. Same vendor pickup flow as unboxed mattress (TC-CX04 Steps 5–6). |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX16: Warranty Claim — Declined

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Submit a warranty claim (TC-CX13 Steps 1–5). | Ticket created. |
| 2 | **CX Agent:** Review and **decline** the warranty claim. | Customer receives decline email with reason. No replacement order created. Ticket closed with decline reason logged. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX17: Third-Party Vendor Return — TSC / EQ3

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Open the **vendor-specific generic link** for TSC or EQ3 (link identifies vendor only, not customer-specific). | Third-party flow begins. |
| 2 | **Terms & Conditions gate** appears. Verify it states: (1) No refund will be issued by Silk & Snow, (2) The return is not authorized by the third-party partner. | T&C page displayed with both disclosures. |
| 3 | **Decline** the T&C. | Flow ends. Message directs customer back to the vendor. |
| 4 | Re-open link. **Accept** T&C (checkbox + confirm button). | Proceeds to pickup details. |
| 5 | Enter pickup details: address, access constraints, preferred dates, contact info. Upload photos. | All fields captured. |
| 6 | Submit. | Ticket created, tagged with the third-party vendor name. |
| 7 | **CX Agent:** Review. Select **Courier** pickup — generate return label. | Label generated. Pickup coordinated. |
| 8 | **CX Agent:** For a separate ticket, select **Disposal** pickup — assign vendor. | Case logged for Return Logistics Team. Vendor assigned. |
| 9 | Item collected. | Vendor notified that item has been collected. **No S&S refund issued** (refund is vendor's responsibility per BR-1). Case closed. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX18: Retail Store Return (Shopify POS)

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

### TC-CX19: Sleep Country Retail Store — Blocked

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

### TC-CX20: Duplicate Return Prevention

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

### TC-CX21: Double Submit Prevention

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

### TC-CX22: Ineligible Item — Past Return Window

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

### TC-CX23: Final Sale Item — Not Returnable

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

### TC-CX24: Order Lookup — Security Validation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter a **valid order number** with an **incorrect email**. | Lookup fails. Generic error message. No order details revealed. |
| 2 | Enter an **invalid order number** with a valid email. | Same generic error. No details revealed. |
| 3 | Enter an email with **leading/trailing spaces** and a valid order number. | System trims spaces. Order found and displays successfully (FR-4). |
| 4 | Enter an **invalid email format** (e.g., "notanemail"). | Validation error shown before lookup attempt. |
| 5 | Enter **both correct** (valid email + valid order number). | Order details display. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX25: Upload Validation — File Type and Size

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | During documentation upload, attempt to upload an **unsupported file type** (e.g., .exe, .zip). | Upload rejected with clear error: invalid file type. |
| 2 | Attempt to upload a file that **exceeds the size limit**. | Upload rejected with clear error: file too large. |
| 3 | Upload a valid photo in a supported format. | Upload accepted. Preview shown. |
| 4 | Attempt to **submit without uploading all required documents**. | Submission blocked. Missing documents highlighted. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX26: CX Documentation Override

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | A customer submits a return/warranty claim but is missing a required document (e.g., no tag photo). | Submission blocked on the customer side. |
| 2 | **CX Agent:** Manually override the documentation requirement for this ticket. | Override applied. CX can proceed with the ticket. Override action logged in audit trail. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX27: Label Reprint — No Duplicate Labels

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

### TC-CX28: Return Label Count Cap

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

### TC-CX29: Session State Preservation

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

### TC-CX30: Help Page Content

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

### TC-CX31: Email Notifications — All Triggers

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Assign a vendor to an unboxed mattress pickup. | Vendor receives assignment email. |
| 2 | Change the vendor. | Old vendor: removal email. New vendor: assignment email. Customer: updated notification. |
| 3 | CX approves a furniture return. | Customer receives approval email. |
| 4 | CX declines a furniture return. | Customer receives decline email. |
| 5 | Third-party pickup ticket created (TSC/EQ3). | CX and vendor notified via email. |
| 6 | Third-party pickup completed. | Vendor notified that item has been collected. |
| 7 | CX declines a warranty claim. | Customer receives decline email with reason. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-CX32: Category Filtering — Only Relevant Items Shown

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Look up an order that contains items from **multiple categories** (e.g., a mattress, furniture piece, and accessories). | All items displayed. |
| 2 | When in the return flow for accessories, verify that **mattress and furniture items are hidden** (FR-8). | Only accessories/bedding items shown for selection. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

## Team C — Operations Team

### TC-OP01: Caledonia Warehouse — Update Return Status

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Log in to ClaimLane with **Caledonia warehouse role** (limited access). | Only warehouse-relevant screens visible. No access to CX functions, refunds, or product onboarding. |
| 2 | Find a return that has been physically received at Caledonia. | Return record visible with item details. |
| 3 | Update status from **Delivered → Processing**. | Status updates. Timestamp logged. |
| 4 | Update status from **Processing → Inspection Completed**. | System prompts for **Inspection Grade**. |
| 5 | Select **Grade A (Resalable)**. Enter a mandatory reason/note. | Grade and reason saved. Status is now "Inspection Completed." |
| 6 | Repeat with **Grade B (Donatable)** and **Grade C (Damaged)** on separate items. | All grades accepted with mandatory reasons. |
| 7 | Verify this status update feeds into the **"Received" logic** for refunds. | Refund processing triggered after inspection completed. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP02: Caledonia — Inspection Grade Requires Reason

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

### TC-OP03: Returned Items Report — Caledonia

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

### TC-OP04: US Warehouse — Offline Status Update (LA/NJ)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Simulate: a return arrives at LA or NJ warehouse. Warehouse staff sends an **email to Internal Ops** with item status. | Email received by Internal Ops. |
| 2 | **Internal Ops** logs into ClaimLane and manually updates the return status: **Delivered → Processing → Inspection Completed** (with grade and reason). | Status updated in the portal. Audit trail logged. |
| 3 | Verify the update appears in the **Returned Items Report**. | Item shows with correct SKU, grade, dates, and quantity. |
| 4 | Verify Internal Ops has **no Caledonia-specific access** (US portal only). | Confirmed — access scoped to US warehouse operations. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP05: US Warehouse — SLA Compliance (24 Business Hours)

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Note the timestamp when a US warehouse email is received by Internal Ops. | Timestamp recorded. |
| 2 | Verify the portal update is completed within **24 business hours**. | Update completed within SLA. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP06: Caledonia Role — Access Restriction

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

### TC-OP07: Warehouse Routing — CA Returns to Caledonia

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Complete a CA return (any category). | Shipping label generated. |
| 2 | Verify the label destination is **Caledonia warehouse**. | Confirmed. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP08: Warehouse Routing — US Returns via Fulfil API

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Complete a US return for an item shipped from a **single warehouse**. | System calls Fulfil ERP API. |
| 2 | Verify the label destination is the **origin warehouse** (LA or NJ). | Correct warehouse on the label. |
| 3 | Complete a US return for an order shipped from **multiple warehouses** (split shipment). | System calls Fulfil ERP API + Google Maps geocoding. |
| 4 | Verify the label destination is the **closest warehouse** to the customer's shipping address. | Correct closest warehouse (LA – JDLLA or NJ – JDLNJ) on the label. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP09: Vendor Portal — Pickup Confirmation

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Log in as a **donation/pickup vendor**. | Vendor portal loads. Only assigned pickups visible. No access to other tickets or admin functions. |
| 2 | Find an assigned pickup. View details: address, access constraints, available dates. Confirm **no customer photos** are visible (for unboxed mattress pickups). | Details visible. Photos not shown. |
| 3 | Mark the item as **"Picked"**. | Status updates to "Picked." Change reflected in the CX admin portal. Triggers "Received" transition for refund logic. |

**Status:** `Not Built Yet`
**Ready Since:** _______________
**Result:** _______________
**Tested By:** _______________
**Notes:** _______________

---

### TC-OP10: Audit Trail Verification

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

## Quick Reference — Test Coverage Map

| Area | Test Cases | Primary Team | Status |
|------|-----------|--------------|--------|
| Product Onboarding & Excel Upload | TC-P01 to TC-P05 | Product | Not Built Yet |
| Product Listing, Search & Filter | TC-P06 | Product | Not Built Yet |
| Warranty-Only Products | TC-P07 | Product | Not Built Yet |
| CA Mattress Returns (Boxed, Unboxed, 30-Night Warning) | TC-CX01 to TC-CX04 | CX | Not Built Yet |
| Vendor Management (Assignment, Change, Self-Donate) | TC-CX05, TC-CX06 | CX | Not Built Yet |
| CA Furniture Returns (CX Pre-Approval) | TC-CX07 | CX | Not Built Yet |
| US Furniture Returns (Fulfil API Routing) | TC-CX08 | CX | Not Built Yet |
| CA Accessories / Bedding Returns | TC-CX09 | CX | Not Built Yet |
| US Accessories Returns (50% Keep, Unopened) | TC-CX10, TC-CX11 | CX | Not Built Yet |
| Defective Reason Blocking | TC-CX12 | CX | Not Built Yet |
| Warranty Claims (Full Flow, Courier, Disposal, Decline) | TC-CX13 to TC-CX16 | CX | Not Built Yet |
| Third-Party Returns (TSC, EQ3) | TC-CX17 | CX | Not Built Yet |
| Retail & Sleep Country Channel Routing | TC-CX18, TC-CX19 | CX | Not Built Yet |
| Duplicate / Double-Submit Prevention | TC-CX20, TC-CX21 | CX | Not Built Yet |
| Eligibility (Return Window, Final Sale) | TC-CX22, TC-CX23 | CX | Not Built Yet |
| Security & Input Validation | TC-CX24, TC-CX25 | CX | Not Built Yet |
| CX Overrides & Label Management | TC-CX26, TC-CX27, TC-CX28 | CX | Not Built Yet |
| Session, Help Page, Email Notifications | TC-CX29, TC-CX30, TC-CX31 | CX | Not Built Yet |
| Category Filtering | TC-CX32 | CX | Not Built Yet |
| Caledonia Warehouse | TC-OP01 to TC-OP03, TC-OP06 | Operations | Not Built Yet |
| US Warehouse (Offline) | TC-OP04, TC-OP05 | Operations | Not Built Yet |
| Warehouse Routing | TC-OP07, TC-OP08 | Operations | Not Built Yet |
| Vendor Portal | TC-OP09 | Operations | Not Built Yet |
| Audit Trail | TC-OP10 | Operations | Not Built Yet |

---

## Requirements Traceability

| Requirement | Covered By |
|-------------|-----------|
| FR-1 (Channel Selection) | TC-CX01, TC-CX18, TC-CX19 |
| FR-2 (Intent Selection) | TC-CX01, TC-CX13 |
| FR-3/4/5 (Order Lookup & Validation) | TC-CX24 |
| FR-6 (Display Items) | TC-CX01, TC-CX22 |
| FR-7 (Eligibility Calculation) | TC-CX03, TC-CX22, TC-CX23, TC-P07 |
| FR-8 (Category Filtering) | TC-CX32 |
| FR-10 (Item Selection) | TC-CX01 |
| FR-12/13/14 (Reasons & Mapping) | TC-CX01, TC-CX12, TC-CX13 |
| FR-15/16/17 (Documentation) | TC-CX25, TC-CX26 |
| FR-18 (Package Count) | TC-CX01 |
| FR-19 (Label Generation) | TC-CX01, TC-CX28 |
| FR-20 (Pickup & Freight) | TC-CX04, TC-CX07, TC-CX08 |
| FR-21 (Label Reprint) | TC-CX27 |
| FR-22 (Ticket Creation) | TC-CX01, TC-CX20 |
| FR-23 (Refund Processing) | TC-CX01, TC-CX02 |
| FR-24 (Replacement Order) | TC-CX13 |
| FR-26 (Session / Double Submit) | TC-CX29, TC-CX21 |
| FR-27 (Help Page) | TC-CX30 |
| FR-30 (Caledonia Portal) | TC-OP01, TC-OP02 |
| FR-31 (Reporting) | TC-OP03 |
| FR-32 (Email Triggers) | TC-CX31 |
| FR-33 (Defective Blocking) | TC-CX12 |
| FR-34 (US Accessory Handling) | TC-CX10, TC-CX11 |
| FR-35 (Warranty Pickup) | TC-CX14, TC-CX15 |
| FR-36/49 (Third-Party Logistics) | TC-CX17 |
| FR-37 (US Warehouse Offline) | TC-OP04 |
| FR-38 (Self-Donate) | TC-CX06 |
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
| BR-16 (Vendor Pickup → Received) | TC-CX04, TC-OP09 |
| BR-19 (Caledonia Role) | TC-OP01, TC-OP06 |
| BR-21 (Auto-Refund Threshold) | TC-CX01, TC-CX02 |
| BR-22 (Label Count Cap) | TC-CX28 |
| BR-27 (Warranty "(Defective)" Label) | TC-CX14 |
| BR-28 (US Warehouse Offline) | TC-OP04 |
| BR-29 (Self-Donate) | TC-CX06 |
| BR-30 (Furniture Destinations) | TC-CX07, TC-CX08 |
| NFR-6 (Audit Logging) | TC-OP10 |
| NFR-8 (US Offline 24h SLA) | TC-OP05 |
