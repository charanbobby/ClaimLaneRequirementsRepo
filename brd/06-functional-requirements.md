# Functional Requirements

The following requirements describe what the portal must do. Each requirement is assigned a reference number (FR-x) and grouped by functional area.

## Purchase Channel and Intent Selection

- **FR-1 – Channel Selection UI:** Provide a start screen where the customer selects:

    - Silk & Snow Online – CA / US (Shopify)
    - Silk & Snow Retail Store (in-person)
    - Third-Party Vendor

    When "Retail Store" is selected, the portal must perform a **store lookup**. If the store is **Shopify POS**, route to the standard Shopify order flow. If the store is **STORIS (non-Shopify)**, display a "returns must be handled in-person" message and block further steps. When "Third-Party Vendor" is selected, show vendor instructions and block steps.

- **FR-2 – Intent Selection:** After channel selection, present options for "Return", "Warranty Claim", or other return type (configurable). The selection determines which subsequent screens and logic apply.

## Order Lookup and Security

- **FR-3 – Order Lookup Fields:** For online orders, display fields for email and order number. Both are required and must exactly match a WooCommerce order before showing any order details.

- **FR-4 – Input Validation:** Validate email format and trim leading/trailing spaces for both email and order number. Show clear error messages for missing or invalid fields.

- **FR-5 – Order Retrieval:** When email and order number match, retrieve and display the corresponding order details. If no match is found, inform the customer without revealing any order information.

## Item Display and Eligibility

- **FR-6 – Display Items:** Show all items on the order with their variant image, colour, size, category, quantity and status (e.g., "Eligible", "Trial Ended", "Final Sale", "Already Returned").

- **FR-7 – Eligibility Calculation:** Compute eligibility for each item using the delivered date plus return period (per category), final sale flags, trial windows, prior returns and channel restrictions. Items that are past the return window, final sale, already returned or from an incorrect channel must be marked "Not Eligible". Mattresses returned within 30 nights should trigger a soft warning but remain eligible; unboxed mattresses and furniture without packaging should be flagged as "Conditionally Eligible" requiring vendor approval or admin flags.

- **FR-8 – Category Filtering:** Hide items that do not belong to the selected return type (e.g., returning accessories should not show mattresses).

- **FR-9 – Bundles Handling:** Identify bundle items. When a main item is returned but the customer keeps a bundled/free item, the portal must offer the option to **keep the bundled/free item at 50% of the full website price** (not the bundle price) and adjust the refund amount accordingly. This applies to mattress + free accessory bundles and other configured bundles.

## Item Selection

- **FR-10 – Item Selection:** Allow the customer to select one or more eligible items and specify quantities (up to the purchased quantity). Prevent selection of more than two units of the same product type with a soft warning and flag the ticket for "Quantity Limit Exceeded" if over the limit.

- **FR-11 – Validate Selection:** Require at least one item to be selected before proceeding. If no item is selected, display a validation message.

## Reason Selection and Mapping

- **FR-12 – Return Reasons:** Present a dropdown of customer-facing return reasons based on the product category and language. Include "Other/Change of Mind" for returns where permitted and hide it for warranty claims. If "Other" is selected, provide a text field for additional details.

- **FR-13 – Claim Reasons:** Provide a category-specific list of warranty claim reasons with business-approved wording. Do not allow "Other" or change-of-mind reasons for claims.

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
    - **Mattress (Unboxed):** Collect condition and donation eligibility. **Do not send photos to the vendor.** The **Return Logistics Manager** must manually select a donation or pickup vendor. Supporting **Vendor Change** functionality is required, which must trigger updated emails to the new vendor and customer.
    - **Furniture:** Implement a two-step flow. Step 1: Customer uploads photos/details. **CX must review and approve** via the portal. Step 2 (if approved): Collect **access constraints** and pickup dates, then generate label/instructions.

- **FR-21 – Label Display & Reprints:** Show generated labels and tracking information to the customer. Allow re-printing without creating new labels or incurring extra charges.

## Ticket Creation and Backend Integration

- **FR-22 – Ticket Creation:** Upon submission, create a Claimlane ticket capturing customer and order details, selected items, reasons, documentation, eligibility status, labels, tags (product category and issue type) and notes. Prevent duplicate tickets for the same items within a short timeframe.

- **FR-23 – Refund Processing:**

    - **Auto-Refund:** When items are marked "Received" and the **net refund value is less than 600** (store currency), automatically initiate the refund in WooCommerce (if gateway supported).
    - **Manual Refund:** When items are marked "Received" and the **net refund value is 600 or greater**, route the ticket to CX for manual refund processing.
    - For partial refunds, adjust only the line item amount and leave inventory unchanged. If the gateway or currency does not support automated refunds, mark the ticket for manual refund.

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

---

## Discussion

> 💬 **Comments for this page are available in Giscus.**  
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>
