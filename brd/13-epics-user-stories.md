# Claimlane Returns, Refunds & Warranty Portal — Epics, Features & User Stories

This document outlines the high-level epics and user stories supporting the Claimlane returns and warranty experience. User stories express business intent and customer value. Detailed functional rules, workflows, validations, and technical considerations remain documented separately in the BRD and Functional Requirements.

---

## Epic 1 — Customer Entry, Channel & Intent Routing

### US-1.1 Select Purchase Channel

> *As a customer, I want to choose where I purchased so I am routed correctly.*

**Acceptance Criteria**

1. Customer can pick from:
    * Silk & Snow Online (CA / US)
    * Retail Store (in-person)
2. **Third-Party Vendor orders** do not use the channel selection screen — they enter via vendor-specific generic links (see US-1.5 and FR-46).
3. Online and Retail selections proceed to store / order validation steps.

---

### US-1.2 Store Selector for Retail Purchases (Shopify vs STORIS)

> *As a customer who bought in store, I want the system to know whether my store supports online returns.*

**Acceptance Criteria**

1. Retail selection shows a list of stores.
2. System looks up each store as **Shopify POS** or **STORIS (non-Shopify)**.
3. Shopify POS stores continue into the standard Shopify flow (order lookup etc.).
4. Sales from STORIS stores show a message: "Returns must be completed in-store." The portal flow ends (no ticket or label is generated).

---

### US-1.3 Select Return vs Warranty

> *As a customer, I want to indicate whether I am doing a return or warranty claim so the correct rules apply.*

**Acceptance Criteria**

1. Customer must choose “Return” or “Warranty Claim.”
2. The chosen intent determines:
    * Which items are eligible.
    * Which questions / documentation are requested.
    * Which policy tables (return period vs warranty period) are checked.

---

### US-1.4 Defective Reason Auto-Routing to Warranty

> *As a customer who selects "Defective" as my return reason, I want the system to route me to warranty replacement unless I opt out.*

**Acceptance Criteria**

1. When "Defective" is selected during reason selection, system displays opt-out checkbox: "I prefer a return instead of warranty replacement."
2. If opt-out is NOT checked, flow automatically redirects to Warranty claim process (Epic 7).
3. If opt-out IS checked, flow continues with standard return logistics.
4. Decision is logged in ticket for audit purposes.
5. Mapping to diagram: REASON_CHECK decision (WF-030) routes to WF-052 (Warranty).

---

### US-1.5 Third-Party Vendor Link Entry & Terms Acceptance

> *As a customer directed by a third-party vendor (TSC, EQ3, Costco), I want to access ClaimLane via a link provided by the vendor so I can arrange pickup of my return item.*

**Acceptance Criteria**

1. Each third-party vendor (TSC, EQ3, Costco) has a **dedicated generic link** to ClaimLane that identifies the vendor.
2. The link is **not unique to the customer** — the same link is shared with all customers of that vendor.
3. When the customer opens the link, the system displays a **Terms & Conditions page** before any other action (security gate for non-unique links).
4. T&C clearly states:
    * No refund will be issued by Silk & Snow — the refund is the sole responsibility of the third-party vendor.
    * The return is not authorized by the third-party partner — Silk & Snow facilitates pickup logistics only.
5. Customer must **explicitly accept** T&C (checkbox + confirm button) to proceed.
6. If customer declines T&C, flow ends with a message directing them back to the third-party vendor.
7. After T&C acceptance, customer provides pickup details: address, access constraints, preferred dates, photos, and contact information.
8. System creates a ClaimLane ticket tagged with the vendor name.
9. **TSC / EQ3 orders:** Proceed to standard pickup logistics (courier or disposal — see US-8.4).
10. **Costco orders:** Ticket created for tracking only — no pickup assistance required. Flow ends.

---

## Epic 2 — Order Lookup & Validation

### US-2.1 Capture Order Details

> *As a customer, I want to provide my order details so my order can be found.*

**Acceptance Criteria**

1. Email and order number fields are mandatory.
2. Basic format validation runs before lookup (e.g., non-empty, valid email pattern).

---

### US-2.2 Validate Order & Identity

> *As a system, I want to show order information only when the customer data matches.*

**Acceptance Criteria**

1. Order is returned only when **email and order number match** a valid record.
2. On success, order items and relevant channels (web, Shopify POS) become available.
3. On failure, a generic “We could not find your order” message is shown, with retry or contact-support options.
4. No detailed reason is disclosed that could leak security information.

---

## Epic 3 — Item Display, Eligibility & Reasons

### US-3.1 Display Items with Eligibility State

> *As a customer, I want to see all items from my order and whether they are eligible.*

**Acceptance Criteria**

1. All items in the order are displayed with: name, type, quantity, and category.
2. Each item shows an eligibility state derived from:
    * Product category and time since delivery.
    * Channel (web, retail, POS, third-party).
    * Condition flags (final sale, already returned).
3. Items that are not eligible are clearly marked and cannot be selected.

---

### US-3.2 Enforce Return Windows by Category

> *As a system, I want return eligibility to follow the correct period per category.*

**Acceptance Criteria**

1. Mattresses:
    * Eligible up to 365 nights from delivery date; show “early return” warning if under configured trial nights (e.g., <30).
    * Not eligible beyond 365 nights; portal blocks the return.
2. Furniture: eligible up to 30 days from delivery date; not eligible afterwards.
3. Bedding, Bath, Accessories, Toppers: eligible up to 100 nights from delivery date; not eligible afterwards.
4. Custom Hybrid Mattress: never eligible for return (warranty only).

---

### US-3.3 Enforce Eligibility by Channel

> *As a system, I want eligibility to respect how and where the item was purchased.*

**Acceptance Criteria**

1. Web orders: fully supported in the portal.
2. Retail orders fulfilled via Shopify: accepted in the portal if order ID matches.
3. POS-only purchases: portal may provide guidance, but must force returns to be completed in store.
4. Third-party vendors (TSC, EQ3, Costco): customers enter via vendor-specific link with T&C gate (see US-1.5). No refund from S&S — pickup logistics only.

---

### US-3.4 Map Customer Return Reasons to WooCommerce Reasons

> *As a system, I want all customer-facing return reasons mapped to the correct WooCommerce reason so reporting and refunds are consistent.*

**Acceptance Criteria**

1. For each category (Bath, Bedding, Furniture, Mattress), the customer sees the configured reason list for that category/subcategory.
2. When a reason is selected, the correct internal Woo reason code is attached (e.g., “Too Thin”, “Colour”, “Shipping Damage”, “Too Firm”, etc.).
3. The same mapping is reused across subcategories where the appendix specifies inheritance.
4. The Woo reason code is included in any refund API call or export.

---

### US-3.5 Select Items & Quantities

> *As a customer, I want to select one or more items and quantities for return or warranty.*

**Acceptance Criteria**

1. Customer can select multiple eligible items and quantities up to the purchased amount.
2. The portal blocks progression if no eligible items are selected.
3. Items already returned or refunded in full cannot be selected again.

---

## Epic 4 — Bundle, Gift & Condition Rules

### US-4.1 Apply Bundle Eligibility Rules

> *As a system, I want bundled items to follow bundle-specific refund rules.*

**Acceptance Criteria**

1. Full bundle returned → full bundle price can be refunded.
2. Single components (e.g., pillow or duvet from a bundle) → refund is prorated based on configured value.
3. Free gift / gift-with-purchase must either be returned or have its value deducted from the refund.

---

### US-4.2 Free / Bundled Item “Keep at Discount” Option

> *As a customer with a bundle or free item, I want the option to keep certain items at a discounted price when returning the main item. (Future Phase)*

**Acceptance Criteria**

1. When returning a mattress or applicable accessory bundle with free items, the portal:
    * Detects associated free/bundled items.
    * Prompts the customer with the keep-option (e.g., keep item at 50% of list price).
2. If customer chooses to keep the item, its discounted value is deducted from the refund and the decision is recorded on the ticket.
3. If customer chooses to return, normal bundle rules apply (no extra deduction).

---

### US-4.3 Enforce Condition-Based Eligibility

> *As a system, I want condition rules to be applied to eligibility and internal flags.*

**Acceptance Criteria**

1. Unboxed mattress returns are marked as “requires approval” and require photos.
2. Furniture missing packaging is marked “conditionally eligible” and sets an internal “Missing Packaging” flag.
3. Final-sale items are always blocked from return.

---

## Epic 5 — Documentation Capture (Per Appendix A)

### US-5.1 Enforce Category-Specific Documentation Requirements

> *As a system, I want each claim reason and category to require the correct documentation before submission.*

**Acceptance Criteria**

1. For mattresses, furniture, bedding, bath, the portal enforces the documentation sets from Appendix A for each claim reason (e.g., base photo, measurements, tag photos, marked assembly guide).
2. Required documentation changes dynamically when the customer changes reason or item category.
3. The claim cannot be submitted if required documentation for that combination is missing, unless an internal CS override is applied.

---

### US-5.2 Capture Global Documentation Fields

> *As a system, I want global documentation requirements to be applied to all claims.*

**Acceptance Criteria**

1. Lot number, issue description and invoice (for retail/third-party purchases) are required according to the global rules.
2. Measurements are required whenever the issue relates to size or fit.
3. Tag photos are requested for all categories where specified as standard.

---

### US-5.3 Upload & Manage Files

> *As a customer, I want to upload and manage my documentation easily.*

**Acceptance Criteria**

1. Customers can upload photos and documents from mobile and desktop.
2. Each file shows a preview or filename.
3. Customers can remove and re-upload files before submission.
4. Errors are surfaced with clear retry guidance.

---

## Epic 6 — Item-Specific Return Flows

### US-6.1 Mattress: Boxed vs Unboxed Routing

> *As a customer returning a mattress, I want the system to guide me correctly based on whether it is boxed.*

**Acceptance Criteria**

1. After selecting a mattress, customer is asked whether it is still boxed.
2. Boxed → photo + tag + measurement flow, then label/pickup instructions.
3. Unboxed → additional questions about condition / donation and vendor-selection flow.

---

### US-6.2 Furniture: Two-Step CX Approval

> *As a customer returning furniture, I want CX to review my photos before I organize pickup.*

**Acceptance Criteria**

1. **Quote & Acceptance (Step 1):**
    - Customer uploads required photos and description.
    - System calls **WooCommerce API** for carrier rates with region-specific destinations:
        - **Canada:** Caledonia warehouse address (WF-137)
        - **United States:** Closest return warehouse from **Fulfil API** — LA (JDLLA) or NJ (JDLNJ) (WF-138; see FR-45)
    - Customer is notified of shipping charges.
        - *Note:* If the pickup is for "Disposal", the system charges the same amount as a courier pickup.
    - Customer **accepts charges** and provides access constraints/pickup dates.
    - Customer submits ticket.
2. **CX Review & Auto-Label (Step 2):**
    - Request is sent to CX queue (WF-070A).
    - CX can approve, decline, or request more info.
    - **Approved:**
        - System **automatically generates** carrier/pickup instructions and label.
    - **Declined:**
        - Customer sees clear messaging and available alternatives.

---

### US-6.3 Accessories, Bedding & Bath: Region-Specific Flow

> *As a customer returning smaller items, I want a simple label-based process that accounts for my region.*

**Acceptance Criteria**

1. **Canada (CA):** For all accessories/bedding within return window:
    - System collects reason and required photos/measurements.
    - Generates return label and mail-in instructions immediately (WF-041→076A→077A).

2. **United States (US) — Unopened Items:**
    - Generate return label and mail-in instructions (WF-111). Standard flow.

3. **United States (US) — Opened Items:**
    - Present Option 1: Keep item for 50% refund, no proof required (WF-117).
    - If accepted: Process 50% refund — customer keeps the item and the return is complete.
    - If rejected: Generate a **Customer Care ticket**. CX contacts customer offline to encourage Option 2 (donate for full refund).

4. All customer decisions are logged in ticket.

---

### US-6.4 Label Generation Limits

> *As a system, I want to limit return labels to the original box count to prevent shipping waste.*

**Acceptance Criteria**

1. The portal validates that the requested number of return labels does not exceed the number of labels/boxes in the original shipment.
2. If the user requests more labels than the original order had, the system blocks generation and shows an error message explaining the limit.

---

### US-6.5 Furniture: Region-Specific Return Destinations

> *As a customer returning furniture, I want the system to calculate shipping to the correct warehouse based on my region.*

**Acceptance Criteria**

1. After customer uploads items (Step 1), system determines customer region from order metadata.
2. System calls **Fulfil ERP API** with the WooCommerce order ID to determine the return warehouse destination (see FR-45):
    - The API returns the originating warehouse for each SKU and the **closest return warehouse** for US orders.
    - For orders shipped from **multiple warehouses**, the API calculates which US warehouse (LA – JDLLA or NJ – JDLNJ) is closest to the customer's shipping address via Google Maps geocoding.
3. System calls WooCommerce API for live carrier rates:
    - **Canada (CA):** API destination is always Caledonia warehouse address (WF-137).
    - **United States (US):** API destination is the closest return warehouse from the Fulfil API response (WF-138).
4. Customer is notified of shipping charges.
    - *Note:* For disposal pickups, the charge is set to match the courier pickup rate.
5. Customer **accepts charges** and provides pickup details.
6. Customer submits ticket for **CX Review**.
7. Upon CX Approval, label/instructions are **automatically generated**.
8. This ensures US returns go to the correct US warehouse (origin or closest), not to Canadian warehouse.

---

## Epic 7 — Warranty Claims

### US-7.1 Enforce Warranty Periods by Category

> *As a system, I want warranty eligibility to follow the correct duration for each category.*

**Acceptance Criteria**

1. Warranty eligibility is checked against warranty periods starting from the delivery date (e.g., mattresses 15 years, adjustable beds 10, furniture/sofa 5, pillows/toppers 3, bedding/bath/accessories 1).
2. Claims beyond the warranty period are blocked with a clear message.

---

### US-7.2 Warranty Questionnaire & Documentation

> *As a customer, I want to provide the information needed for my warranty claim.*

**Acceptance Criteria**

1. The portal presents a questionnaire tailored to product category and claim reason, using Appendix A documentation rules.
2. Required fields (photos, measurements, tags, lot number, invoice where relevant) must be provided before submission.
3. Claim is not sent for review until all required inputs are complete.

---

### US-7.3 Warranty Review & Outcome

> *As CX or vendor, I want to review warranty claims and decide the outcome.*

**Acceptance Criteria**

1. Reviewer can set the decision: approve, decline, or request more info.
2. Approved → triggers replacement / refund / repair workflow according to product category and internal rules.
3. Declined → portal sends clear explanation to customer.

---

### US-7.4 Warranty Pickup Logistics Split

> *As a customer with an approved warranty claim, I want to choose the appropriate pickup method.*

**Acceptance Criteria**

1. After CX approves warranty claim (WF-052C), system asks: "Do you need pickup assistance?" (WF-052F).
2. If NO: Standard customer-initiated return flow proceeds.
3. If YES: System presents two pickup options (WF-052H):
    - **Courier Pickup:** CX provides coordination and guidance. System generates return label with text **(Defective)** or **(Defective - this will help warehouse to avoid inspection of that piece)** to signal warehouse to skip inspection (WF-052G).
    - **Disposal Pickup:** Case is logged for Return Logistics Team to assign disposal vendor (WF-052I connects to shared logistics WF-059/065A).
4. Pickup type selection is recorded in ticket.

---

## Epic 8 — Vendor & Logistics Management

### US-8.1 Vendor Selection for Unboxed / Donation Flows

> *As an internal logistics user, I want to select the vendor who will pick up or receive the item.*

**Acceptance Criteria**

1. System shows allowed vendors for the item type and location.
2. Internal user (Return Logistics Team) can select a vendor.
3. Selection triggers emails to vendor and customer with instructions.
4. Vendor receives portal access to mark items as "Picked."
5. **Self-Donate Option (WF-130):**
    - If no vendor is available, the Return Logistics Team manually selects **"Self-Donation"** as the vendor/outcome.
    - Customer receives instructions to donate item, take photo of donation, and contact CX (call/email).
    - CX processes return manually in ClaimLane portal (WF-132).
    - Case closes after CX confirms donation proof.
6. The selection (Vendor vs. Self-Donate) is logged in ticket history.

---

### US-8.2 Vendor Change Handling

> *As an internal user, I want to change vendors when needed without losing context.*

**Acceptance Criteria**

1. User can change from one vendor to another before pickup is completed.
2. New vendor receives updated notification; previous vendor is informed the job was reassigned.
3. Customer receives updated email with new vendor details.

---

### US-8.3 Vendor Pickup Confirmation

> *As a vendor, I want to confirm pickup in the portal so downstream processing can continue.*

**Acceptance Criteria**

1. Vendor can update status to "Picked" for assigned items.
2. Status change triggers transition to "Received" once warehouse confirms arrival, or to "In Transit" as configured.

---

### US-8.4 Third-Party Pickup Logistics (TSC / EQ3)

> *As a customer who entered via a third-party vendor link and accepted T&C, I want pickup to be arranged for my return item.*

**Acceptance Criteria**

1. After customer submits pickup details via vendor link (US-1.5), system creates a ClaimLane ticket and routes **TSC / EQ3 orders** to pickup logistics (WF-011A):
    - **Courier Pickup:** CX provides coordination and guidance. System generates return label (WF-012).
    - **Disposal Pickup:** Case is logged for Return Logistics Team (WF-011B, connects to shared logistics flow WF-059/065A).
2. Pickup type is recorded in ticket.
3. For courier: Pickup confirmation triggers item collected status (WF-014→015). Vendor is notified.
4. For disposal: Follows same vendor selection flow as unboxed mattresses (WF-059/065A).
5. **Costco orders** do not enter this flow — ticket is created for tracking only (no pickup assistance).
6. **No refund is issued by Silk & Snow** — the refund is handled by the third-party vendor directly.

---

## Epic 9 — Caledonia Warehouse & Inventory

### US-9.1 Caledonia Status Updates

> *As Caledonia staff, I want to update the status of returned items in the portal.*

**Acceptance Criteria**

1. Caledonia users have limited-access roles restricting them to:
    * Mark “Delivered,” “Processing,” “Inspection Completed.”
2. Status changes are timestamped and visible in the case history.

---

### US-9.2 Inventory Update Reporting

> *As Store Ops, I want a report of all items ready for inventory updates.*

**Acceptance Criteria**

1. Report includes items marked “Inspection Completed,” with SKU, condition, and disposition (resale / donate / scrap).
2. Report can be exported for ERP or inventory tools.
3. Running the report does not change any status by itself.

---

### US-9.3 US Warehouse Offline Status Updates

> *As Internal Ops, I want to manually update return statuses for US warehouse returns since they operate offline.*

**Acceptance Criteria**

1. US warehouses (LA/NJ) do NOT have direct portal access.
2. When return is delivered to US warehouse (WF-133):
    - US warehouse emails status update to Internal Ops team (WF-134).
    - Email communication is offline (not integrated with portal).
3. Internal Ops team manually updates portal status: Delivered → Processing / Inspection Completed (WF-135).
4. Internal Ops runs "Returned items" report for US inventory reconciliation (WF-136).
5. Status transitions are timestamped and visible in case history.
6. This process mirrors Caledonia workflow but operates via email instead of direct portal access.

---

## Epic 10 — Refund & Case Finalization

### US-10.1 Auto vs Manual Refund Thresholds & Flow Routing

> *As a system, I want refunds to be automated when safe and routed for manual review when required.*

**Acceptance Criteria**

1. Once an item is marked "Received," system uses **Refund Context Routing** decision point to determine flow context (line 233 in diagram):
    - **Return:** Apply auto/manual refund logic below (WF-067→068/069).
    - **Warranty:** Trigger replacement order creation (WCX flow).
    - **Third-Party:** Notify vendor that item has been collected — no S&S refund issued (see BR-1).

2. For **Return flow**, system calculates **net return value** after:
    - Bundle proration.
    - Gift-with-purchase deductions.
    - Any fees or shipping deductions.

3. **Auto-refund criteria (Phase 1):**
    - Net value < 600 (store currency) AND
    - Order does NOT contain bundles or free items (WF-067).

4. If auto-refund criteria are met AND gateway supports automated refunds: trigger automatic refund (WF-068).

5. **Manual refund criteria:**
    - Net value >= 600, OR
    - Order contains bundles/free items, OR
    - Flagged as exception (WF-069).

6. Manual cases route to CX refund queue.

7. Customer is notified whether refund is automatic or under review.

8. **Future Phase Note:** Bundle impact calculations (WF-070→073) will enable adjusted auto-refunds for qualifying bundled orders.

9. **Warehouse Routing (Dest_Check):** After refund processing, system routes to appropriate warehouse using destination check (WF-239):
    - **CA Destinations:** Route to Caledonia workflow (R1→R2→R4→R5).
    - **US Destinations:** Route to US warehouse offline workflow (R_US→R2_US→R4_US→R5_US). Specific US warehouse (LA or NJ) determined by **Fulfil API** (see FR-45).

---

### US-10.2 Apply Category-Specific Refund Notes

> *As a system, I want category rules about refunds to be reflected correctly (e.g., furniture shipping deductions).*

**Acceptance Criteria**

1. Furniture returns show messaging that return shipping costs may be deducted unless escalated, and the deduction is shown in the refund breakdown.
2. Other categories follow standard full-refund rules unless configured otherwise in the policy tables.

---

### US-10.3 Close Case & Maintain Audit Trail

> *As an internal user, I want each case to have a complete history and close cleanly.*

**Acceptance Criteria**

1. When refund or replacement is completed, the case moves to “Closed.”
2. The case history shows key events: eligibility checks, documentation submissions, vendor selections, status changes, and refund decisions.
3. Audit log is accessible to authorised internal users only.

---

## Epic 11 — Notifications & Communications

### US-11.1 Automated Email Triggers

> *As a system, I want to send automated emails at key workflow decision points to keep customers and vendors informed.*

**Acceptance Criteria**

1. Email sent when third-party pickup ticket is created via vendor link (FR-48).
2. Email sent to vendor when third-party item has been collected (pickup completed).
3. Email sent to customer when warranty claim is declined by CX (WF-052D).
4. Email sent when unboxed mattress vendor is assigned (existing feature).
5. Email sent when unboxed mattress vendor is changed, notifying new vendor and customer (existing feature).
6. Email sent when furniture return is approved/declined by CX (existing feature).
7. All emails are logged in ticket history with timestamps.
8. Email templates are configurable without code changes.
9. Failed email delivery triggers retry logic and alerts internal team.

---

## Epic 12 — Product Onboarding & Removal

### US-12.1 Onboard New Products via Excel Upload

> *As an admin, I want to upload an Excel file to onboard new products so they are available for returns and warranty claims without code changes.*

**Acceptance Criteria**

1. Admin uploads an Excel file with one row per product/variant containing: SKU, product name, category, subcategory (optional), final sale flag, fallback weight/dimensions (optional), warranty-only flag, and region.
2. An optional second sheet defines replacement parts with parent SKU, part SKU, and part name.
3. System validates all rows before committing: rejects unknown categories, duplicate SKUs, and missing required fields.
4. Admin sees a preview screen with parsed rows and row-level errors highlighted in red.
5. No data is saved until admin confirms the import.
6. Upload event is logged with: admin identity, timestamp, file name, and row count.
7. Newly onboarded products appear in eligibility checks for subsequent customer orders.

---

### US-12.2 Remove a Product

> *As an admin, I want to remove a product from the portal so it no longer appears in customer flows.*

**Acceptance Criteria**

1. Admin requests product removal (MVP: via email to system administrator).
2. Before deactivation, the system displays a warning showing the count of active/open tickets referencing the product.
3. Removal is a soft-delete — the product is marked inactive, not permanently deleted.
4. Deactivated products no longer appear as eligible in customer-facing item displays.
5. Historical ticket data and reports continue to reference the deactivated product.
6. Removal event is logged with admin identity and timestamp.

---

### US-12.3 View Onboarded Products

> *As an admin, I want to see all onboarded products and their configuration so I can verify the current state.*

**Acceptance Criteria**

1. Admin can access a read-only listing of all products showing: SKU, name, category, region, final sale flag, warranty-only flag, and status (active/inactive).
2. Listing supports search by SKU or product name.
3. Listing supports filtering by category, region, or status.
4. Inactive products are visually distinguished (e.g., greyed out or labelled).

---

### US-12.4 Future State — Direct System Sync

> *As a system, I want product data to sync directly from WooCommerce and external catalogues so manual Excel uploads are no longer needed.*

**Acceptance Criteria**

1. System connects to WooCommerce product API to pull SKUs, names, categories, weights, and dimensions automatically.
2. New products in WooCommerce appear in ClaimLane without manual intervention.
3. Removed or discontinued products in WooCommerce are flagged for admin review (not auto-deactivated).
4. **Deferred to future phase** — MVP uses Excel upload (US-12.1) and email-based removal (US-12.2).

---

## Discussion

<div class="giscus-placeholder"></div>
