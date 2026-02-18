# Functional Requirements

The following requirements describe what the portal must do. Each requirement is assigned a reference number (FR-x) and grouped by functional area.

## Purchase Channel and Intent Selection

- **FR-1 – Channel Selection UI:** Provide a start screen where the customer selects:

    - Silk & Snow Online – CA / US (Shopify)
    - Silk & Snow Retail Store (in-person)
    - Third-Party Vendor

    When "Retail Store" is selected, the portal must perform a **store lookup**. If the store is **Shopify POS**, route to the standard Shopify order flow. If the store is **STORIS (non-Shopify)**, display a "returns must be handled in-person" message and block further steps. **Note:** Third-party vendor orders do not use this channel selection screen — they enter via vendor-specific links (see FR-46).

- **FR-2 – Intent Selection:** After channel selection, present options for "Return", "Warranty Claim", or other return type (configurable). The selection determines which subsequent screens and logic apply.

## Order Lookup and Security

- **FR-3 – Order Lookup Fields:** For online orders, display fields for email and order number. Both are required and must exactly match a WooCommerce order before showing any order details.

- **FR-4 – Input Validation:** Validate email format and trim leading/trailing spaces for both email and order number. Show clear error messages for missing or invalid fields.

- **FR-5 – Order Retrieval:** When email and order number match, retrieve and display the corresponding order details. If no match is found, inform the customer without revealing any order information.

## Item Display and Eligibility

- **FR-6 – Display Items:** Show all items on the order with their variant image, colour, size, category, quantity and status (e.g., "Eligible", "Trial Ended", "Final Sale", "Already Returned").

- **FR-7 – Eligibility Calculation:** Compute eligibility for each item using the delivered date plus return period (per category), final sale flags, trial windows, prior returns and channel restrictions. Items that are past the return window, final sale, already returned or from an incorrect channel must be marked "Not Eligible". Mattresses returned within 30 nights should trigger a soft warning but remain eligible; unboxed mattresses and furniture without packaging should be flagged as "Conditionally Eligible" requiring vendor approval or admin flags.

- **FR-8 – Category Filtering:** Hide items that do not belong to the selected return type (e.g., returning accessories should not show mattresses).

- **FR-9 – Bundles Handling:** Identify bundle items. When a main item is returned but the customer keeps a bundled/free item, the portal must offer the option to **keep the bundled/free item at 50% of the full website price** (not the bundle price) and adjust the refund amount accordingly. **[DEFERRED TO FUTURE PHASE]** **Technical Requirement:** This functionality requires custom implementation to parse WooCommerce bundle data and calculate proration via the API.

## Item Selection

- **FR-10 – Item Selection:** Allow the customer to select one or more eligible items and specify quantities (up to the purchased quantity). **[RESTRICTION DEFERRED TO FUTURE PHASE]** *The constraint preventing selection of more than two units has been moved to the backlog.*

- **FR-11 – Validate Selection:** Require at least one item to be selected before proceeding. If no item is selected, display a validation message.

## Reason Selection and Mapping

- **FR-12 – Return Reasons:** Present a dropdown of customer-facing return reasons based on the product category and language. Include "Other/Change of Mind" for returns where permitted and hide it for warranty claims. If "Other" is selected, provide a text field for additional details. When "Defective" is selected as a return reason, trigger the defective routing logic (see FR-33).

- **FR-13 – Claim Reasons:** Provide a category-specific list of warranty claim reasons with business-approved wording. Do not allow "Other" or change-of-mind reasons for claims. Provide an opt-out mechanism for customers who selected "Defective" but prefer a return instead of warranty replacement.

- **FR-14 – Reason Mapping:** Map each selected customer reason to the corresponding WooCommerce refund reason for reporting and refund processing.

## Documentation Capture

- **FR-15 – Documentation Requirements:** Based on the product category and claim reason, determine the required documentation (e.g., base photos, measurement photos, tag photos, lot number, invoice copy, description). Present upload fields accordingly.

- **FR-16 – Upload Validation:** Enforce required documentation before submission. Validate file types, sizes and image clarity; provide user feedback when uploads fail and allow retry.

- **FR-17 – General Documentation:** Collect lot number and detailed description for all claims and require an invoice when the purchase was made through a retail store or third-party vendor.

## Logistics and Label Generation

- **FR-18 – Box Count Input:** When generating return labels, prompt the customer to enter the number of boxes (1–20) and validate the value. If no boxes are entered, require at least one box. **The input must be a valid, non-zero number and cannot exceed the total box count of the original shipment.**

- **FR-19 – Label Generation:** Integrate with the selected shipping carrier API to generate one label per box using the customer's shipping address, item weight and dimensions. Use fallback weights when master data is missing. Store tracking numbers and prevent duplicate labels on reprints.

- **FR-20 – Pickup & Freight Rules:**

    - **Mattress (Boxed):** Provide drop-off instructions/labels.
    - **Mattress (Unboxed):** Collect condition and donation eligibility. **Do not send photos to the vendor.** The **Return Logistics Manager** must manually select a donation or pickup vendor. Supporting **Vendor Change** functionality is required, which must trigger updated emails to the new vendor and customer. If no vendor is available, offer the customer a self-donation option (see FR-38).
    - **Furniture:** Implement a flow where:
        1. Customer uploads photos/details.
        2. System calls **WooCommerce API** for live carrier rates (Destination: **CA → Caledonia** (WF-137), **US → Closest return warehouse from Fulfil API** (WF-138); see FR-45).
        3. **Charge Logic:** If the pickup is for disposal, apply the courier rate charge (standardized business decision).
        4. Customer **accepts charges** and provides pickup details to submit the ticket.
        5. **CX Review & Approval:** CX reviews the submitted ticket (photos + agreed charge).
        6. **Approval Action:** If approved, the system **automatically generates shipping labels** and pickup instructions.
    - Collect **access constraints** and pickup dates, then generate label/instructions.

- **FR-21 – Label Display & Reprints:** Show generated labels and tracking information to the customer. Allow re-printing without creating new labels or incurring extra charges.

## Ticket Creation and Backend Integration

- **FR-22 – Ticket Creation:** Upon submission, create a Claimlane ticket capturing customer and order details, selected items, reasons, documentation, eligibility status, labels, tags (product category and issue type) and notes. Prevent duplicate tickets for the same items within a short timeframe.

- **FR-23 – Refund Processing:**

    - **Auto-Refund:** When items are marked "Received" and the **net refund value is less than 600** (store currency) **AND the order does NOT contain bundles or free items**, automatically initiate the refund in WooCommerce (if gateway supported). This is a Phase 1 constraint.
    - **Manual Refund:** When items are marked "Received" and the **net refund value is 600 or greater**, OR the **order contains bundles/free items**, route the ticket to CX for manual refund processing. This is required because bundle proration logic is a **custom implementation** not standard to the platform.
    - For partial refunds, adjust only the line item amount and leave inventory unchanged. If the gateway or currency does not support automated refunds, mark the ticket for manual refund.
    - **Future Phase:** Bundle impact calculations (WF-070→073) will enable adjusted auto-refunds for qualifying bundled orders. Until then, all orders with bundles require manual processing.

- **FR-24 – Replacement Order Creation:** For approved warranty claims, create a WooCommerce order for replacement items using the customer's billing/shipping details, set the order status to "Processing" and notify the customer via WooCommerce.

- **FR-25 – Exception Handling:** Support exception flows, including manual POS returns, vendor review required (e.g., unboxed mattresses, furniture without packaging), manual refunds due to gateway issues and customer service overrides. Maintain logs and alerts for any failures during API calls (ticket creation, label generation, refund processing) with clear guidance to the customer.

## User Experience and Messaging

- **FR-26 – UX Navigation:** Provide a clear "Start Over" button after order lookup to allow customers to cancel and restart the process. Preserve session state when navigating back or refreshing pages and handle double submits gracefully (only one ticket/refund is created).

- **FR-27 – Help & Support:** Include a "Help" page that only displays the Silk & Snow support email and a link to the Silk & Snow chatbot. Do not include telephone numbers or other channels unless explicitly approved.

- **FR-28 – Localization:** At launch the portal operates in English only; French copy is supported via translation tables but must be marketing-approved. Copy must be consistent across screens and reasons.

- **FR-29 – Accessibility & Responsiveness:** Ensure that all key actions are accessible via keyboard only and that pages display correctly on mobile browsers.

## New Functionality

- **FR-30 – Caledonia Portal:** Provide a limited access role/view for the **Caledonia Warehouse Team** to allow updating return status from **Delivered → Processing / Inspection Completed**. This status update must feed into the "Received" logic for refunds.

- **FR-31 – Reporting:** Provide **Store Operations** with the ability to generate a "Returned items" report listing items that have reached "Inspection Completed" status for inventory updates.

- **FR-32 – Email Triggers:** Configure specific email triggers for:

    - Unboxed Mattress Vendor Assignment.
    - Unboxed Mattress Vendor Change (notify new vendor and customer).
    - Furniture Return Approval/Decline by CX.
    - Third-Party Pickup Ticket Created (notify CX and vendor via FR-48).
    - Third-Party Pickup Completed (notify vendor that item has been collected).
    - Warranty Claim Declined by CX (WF-052D).

- **FR-33 – Defective Reason Routing:** When a customer selects items to return and chooses "Defective" as the reason, the system must check if the customer opted out of product replacement. If the customer did NOT opt out, redirect the flow to the Warranty claim process (WF-052) instead of standard return logistics. Provide a clear opt-out checkbox during reason selection.

- **FR-34 – US Accessory Return Handling:** For US Accessories and Bedding returns:
    
    - **Unopened Items:** Generate return label and proceed with standard mail-in flow (WF-111).
    - **Opened Items:** Present Option 1 (Keep Offer: keep item for 50% refund, no proof required). If customer **accepts** Option 1: process 50% refund — customer keeps the item and the return is complete. If customer **rejects** Option 1: generate a **Customer Care ticket**. CX contacts the customer offline to encourage Option 2 (donate item for 100% refund with proof).
    - All decisions and customer responses must be logged in the ticket.

- **FR-35 – Warranty Pickup Logistics:** After CX approves a warranty claim (WF-052C), check if the customer needs pickup assistance (WF-052F). If yes, determine pickup type:
    
    - **Courier Pickup:** CX provides coordination and guidance. Generate a return label that includes the text **(Defective - this will help warehouse to avoid inspection of that piece)** to signal the warehouse team to bypass inspection (WF-052G).
    - **Disposal Pickup:** Log the case for the Return Logistics Team to assign a disposal vendor (WF-052I connects to shared return logistics WF-059/065A).

- **FR-36 – Third-Party Logistics Split:** *(Superseded by FR-49.)* After a third-party customer submits pickup details via the vendor link (FR-48), the system routes TSC and EQ3 orders to standard pickup logistics:

    - **Courier Pickup:** CX provides pickup coordination and generates a return label (WF-012).
    - **Disposal Pickup:** Log the case for the Return Logistics Team (WF-011B connects to shared return logistics WF-059/065A).
    - **Costco:** No pickup assistance — ticket created for tracking only.

- **FR-37 – US Warehouse Offline Process:** For returns shipped to US warehouses (LA or NJ), implement an offline status update workflow:
    
    - US Warehouse team receives the return (WF-133).
    - US Warehouse team emails return status to Internal Ops team (WF-134) - this communication is offline to ClaimLane.
    - Internal Ops team manually updates the return status in ClaimLane portal: Delivered → Processing / Inspection Completed (WF-135).
    - Internal Ops team runs the "Returned items" report for inventory reconciliation (WF-136).

- **FR-38 – Unboxed Mattress Self-Donate Fallback:** When the Return Logistics Team cannot find an available vendor for unboxed mattress pickup (WF-059/065A "No Vendor Available" path), offer the customer a self-donation option:
    
    - Customer agrees to donate the item themselves, takes a photo of the donation, and contacts CX via call or email (WF-130).
    - CX team processes the return manually in the ClaimLane portal (WF-132).
    - Close the case after CX confirms donation proof.

- **FR-39 – Flow Context Routing:** Implement two critical routing decision points:
    
    - **Intent-Based Routing (after validation):** After customer login and order validation (WF-027/100/043), route to either Return flow (WF-029/102) or Warranty flow (WF-052) based on the customer's intent selection.
    - **Refund Context Routing (after item received):** After an item is marked "Received" (WF-089), route the refund logic based on the flow context: Return (apply auto/manual refund rules), Warranty (place replacement order), or Third-Party (notify vendor that item has been collected — no S&S refund issued; see BR-1).

- **FR-41 – Destination-Based Warehouse Routing:** After refund processing is complete, route the item to the appropriate warehouse workflow based on destination:

    - **CA Destinations:** Route to Caledonia warehouse workflow (WF-090→091→092→093).
    - **US Destinations:** Route to US warehouse offline workflow (WF-133→134→135→136). The specific US warehouse (LA or NJ) is determined by the **Fulfil API** (see FR-45).

## Product Onboarding & Removal

- **FR-42 – Product Onboarding via Excel Upload:** Provide an admin-accessible interface for onboarding new products into the ClaimLane portal via Excel file upload. The Excel file must contain one row per product (or product variant) with the following fields:

    | Field | Required | Description |
    | :--- | :--- | :--- |
    | SKU | Yes | Unique product identifier (must match WooCommerce SKU) |
    | Product Name | Yes | Display name |
    | Category | Yes | Must match an existing product category (Mattress, Furniture, Bedding, Bath, Accessories) |
    | Subcategory | No | e.g., Adjustable Bed, Upholstered Frame, Percale Bedding |
    | Final Sale | Yes | Yes/No — blocks returns when Yes |
    | Fallback Weight (kg) | No | Used for label generation when WooCommerce master data is missing (FR-19) |
    | Fallback Dimensions (LxWxH cm) | No | Used for label generation when WooCommerce master data is missing |
    | Warranty Only | No | Yes/No — if Yes, product is not eligible for returns (e.g., Custom Hybrid Mattress) |
    | Region | Yes | CA / US / BOTH |

    **Replacement Parts Sheet (optional):** For products with warranty replacement parts (e.g., furniture sub-components), a second sheet may define parent-child relationships:

    | Field | Required | Description |
    | :--- | :--- | :--- |
    | Parent SKU | Yes | The main product SKU |
    | Part SKU | Yes | The replacement part SKU |
    | Part Name | Yes | Display name (e.g., "Drawer – Top Left") |

    The system must:

    - Validate all rows before committing: reject unknown categories, duplicate SKUs, missing required fields.
    - Display a preview of parsed rows with row-level errors highlighted.
    - Require admin confirmation before saving to the product configuration store.
    - Log the upload event (who, when, file name, row count) for audit.

- **FR-43 – Product Removal:** Allow an admin to remove (deactivate) a product from the portal. In the MVP, removal may be initiated via email request to the system administrator. The administrator performs a soft-delete (marks the product inactive). Deactivated products must:

    - No longer appear as eligible in customer-facing item displays.
    - Remain visible in historical ticket data and reports.
    - Trigger a warning showing the count of active/open tickets referencing the product before deactivation is confirmed.

- **FR-44 – Product Configuration Listing:** Provide a read-only admin view listing all onboarded products with: SKU, name, category, region, final sale flag, warranty-only flag, and status (active/inactive). Support search by SKU or product name and filtering by category, region, or status.

    **Future State:** Replace Excel upload and email-based removal with a direct real-time sync to WooCommerce and external product catalogue systems, eliminating manual file handling entirely.

## Warehouse Origin Lookup

- **FR-45 – Fulfil API Warehouse Lookup:** Integrate with the **Fulfil ERP API** to determine the origin warehouse for each SKU in a return order. The system must call the API endpoint with the WooCommerce order ID and receive:

    - The **originating warehouse** for each SKU in the order.
    - The **closest return warehouse** for US orders (calculated by the API using Google Maps geocoding of the customer's shipping address against US warehouse locations).

    **US Warehouse Locations:**

    | Warehouse Code | Address |
    | :--- | :--- |
    | JDLLA | 6509 Kimball Ave, Chino, CA 91708 |
    | JDLNJ | 55 Wildcat Way, Linden, NJ 07036 |

    **Routing Logic:**

    - **Single-warehouse orders:** Return to the originating warehouse.
    - **Multi-warehouse orders:** Return to the warehouse closest to the customer's shipping address.
    - **Canada (CA) orders:** Always route to Caledonia warehouse (Fulfil API not used for CA destination).

## Third-Party Vendor Entry

- **FR-46 – Third-Party Vendor Link Entry:** Each third-party vendor (TSC, EQ3, Costco) must have a **dedicated generic link** to the ClaimLane portal. The link is not unique to individual customers — it identifies only the vendor. The vendor shares this link with the customer after verifying the order externally. When the customer opens the link, the system must:

    1. Identify the vendor from the link parameters.
    2. Present a **Terms & Conditions page** (see FR-47) before any other action.
    3. After T&C acceptance, route to the pickup details collection flow (see FR-48).

- **FR-47 – Third-Party Terms & Conditions Gate:** When a customer accesses the portal via a third-party vendor link, the system MUST display a Terms & Conditions page before proceeding. The T&C must clearly state:

    1. **No refund will be issued by Silk & Snow** — the refund is the sole responsibility of the third-party vendor.
    2. **The return is not authorized by the third-party partner** — Silk & Snow is facilitating pickup logistics only.

    The customer must explicitly accept the T&C (checkbox + confirm button) before proceeding. If the customer declines, the flow ends with a message directing them back to the third-party vendor.

- **FR-48 – Third-Party Pickup Details Collection:** After T&C acceptance, collect the following from the customer:

    - Pickup address / location.
    - Access constraints (elevator, stairs, gate codes, etc.).
    - Preferred pickup dates.
    - Photos of the item (condition documentation).
    - Contact information for pickup coordination.

    Upon submission, create a ClaimLane ticket tagged with the third-party vendor name and route to standard pickup logistics (courier or disposal). **Costco exception:** Costco orders do not require pickup assistance — create a ticket for tracking purposes only and close the pickup flow.

- **FR-49 – Third-Party Pickup Logistics:** For TSC and EQ3 orders requiring pickup assistance, the system follows standard pickup logistics after ticket creation:

    - **Courier Pickup:** CX provides pickup coordination and guidance. Generate a return label (WF-012).
    - **Disposal Pickup:** Log the case for the Return Logistics Team to assign a disposal vendor (WF-011B, connects to shared return logistics WF-059/065A).

    For Costco orders, no pickup logistics are initiated — the ticket is created for tracking and the vendor handles returns independently.

---

## Discussion

<div class="giscus-placeholder"></div>
