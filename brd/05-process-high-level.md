# High Level Process Flow

## Narrative Steps

1. **Purchase Channel Selection** – Customer selects:

    *   Silk & Snow Online – CA / US (Shopify)
    *   Silk & Snow Retail Store (in-person)
    *   Third-Party Vendor

    For Retail Store selections, the portal uses a **store lookup** to determine whether the store backend is **Shopify POS** or **STORIS (non-Shopify)**.

    **Retail Store Backend Handling**
    *   If the selected store is a **Shopify POS store**, the portal routes the customer into the **same Shopify order flow** used for online orders (orders in Shopify Online + Shopify POS).
    *   If the selected store is a **STORIS (non-Shopify) store**, the portal displays a message that **returns for this store must be handled in person** and the flow ends (no online processing, no label generation, no ticket).

2. **Customer Intent Selection** – The customer chooses to start a return, warranty claim or another return type (if configured). The flow branches accordingly.

3. **Order Lookup** – For online orders the customer must enter their email and order number. Both fields must match exactly with the WooCommerce record; otherwise no order details are displayed.

4. **Display Order Items & Eligibility** – All items on the order are shown with variant image, colour, category and eligibility status. Eligibility is computed using product category, return window, trial length, final sale rules, channel and delivered date.

5. **Item Selection** – The customer selects one or more eligible items. A minimum of one item is required.

    *   **Bundle / Free Item Promotion:** If the item is part of a bundle or free item promotion, the customer can keep bundled/free items at **50% of full website price**; the refund is adjusted accordingly.

6. **Reason Selection** – The customer chooses a reason for each selected item. Return reasons map to WooCommerce refund reasons.

7. **Documentation Upload** – For claims and damage returns, customers must provide required documentation (photos, measurements, etc.).

8. **Logistics & Labels** – The flow splits based on product type:

    *   **Mattress (Boxed):** Collect photos/law tag. Provide return label/pickup instructions. Vendor picks up and updates status to 'Picked'.
    *   **Mattress (Unboxed):** Collect condition and donation eligibility. **No photos sent to vendor.** Return Logistics Manager selects donation/pickup vendor. Vendor change triggers update emails. Vendor picks up and updates status to 'Picked'.
    *   **Furniture:** Two-step process:
        1.  **Pre-approval:** Customer uploads photos/issue details. **CX reviews and approves/declines.**
        2.  **Logistics:** On approval, collect **access constraints** and pickup dates. Generate label/instructions.
    *   **Accessory/Bedding:** Single step. Collect reason/photos -> Generate label & mail-in instructions.

9. **Ticket Creation** – The Claimlane ticket stores all details. Duplicate tickets are prevented.

10. **Backend Actions** – Upon submission:

    *   **Automatic Refund for Low-Value Returns:** When "Received" and net refund value < **600**, auto-initiate refund (if gateway supported).
    *   **Manual Refund for High-Value Returns:** When "Received" and net refund value >= **600**, route to CX for manual processing.
    *   **Caledonia Workflow:** For Caledonia returns, the team updates status **Delivered → Processing / Inspection Completed**. Store Ops runs report for inventory.

---

## Visual Process Flow

![Process Flow](assets/customer-return-v2.png)

---

## Discussion

> 💬 **Comments for this page are available in Giscus.**  
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>
