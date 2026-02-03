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

    *   **Defective Routing:** If the customer selects "Defective" as the reason AND does not opt out of product replacement, the flow automatically redirects to the Warranty claim process instead of standard return logistics.

7. **Documentation Upload** – For claims and damage returns, customers must provide required documentation (photos, measurements, etc.).

8. **Logistics & Labels** – The flow splits based on product type and region:

| Item Type | Region | Workflow | Logic |
|-----------|--------|----------|-------|
| **Mattress (Boxed)** | Both | Collect photos/law tag → Generate label | Customer receives return label and drop-off instructions. Vendor picks up and marks status as 'Picked'. |
| **Mattress (Unboxed)** | Both | Collect photos/law tag/condition → RL Manager selects vendor → Vendor pickup OR Self-Donate | **No photos sent to vendor.** Return Logistics Manager manually selects donation/pickup vendor. If no vendor available, offer customer self-donation option (customer donates, takes photo, contacts CX for manual processing). |
| **Furniture** | CA | Photos → CX Review/Approval → API call (Dest: Caledonia) → Notify charges → Pickup | Two-step: (1) CX reviews photos and approves/declines. (2) On approval, call WooCommerce API with **Caledonia warehouse** as destination, notify customer of charges, collect access constraints and dates, generate label. |
| **Furniture** | US | Photos → CX Review/Approval → API call (Dest: LA/NJ origin) → Notify charges → Pickup | Same as CA, but WooCommerce API uses **original order shipping warehouse (LA or NJ)** as destination. |
| **Accessory/Bedding (Unopened)** | CA | Collect reason/photos → Generate label | Single-step mail-in flow with return label. |
| **Accessory/Bedding (Unopened)** | US | Check shipping cost → If < 1/3 value: Label, else Option 1 | Calculate shipping cost. If cost > 1/3 item value, skip label and present keep/donate offers. |
| **Accessory/Bedding (Opened)** | US | Option 1 (Keep 50%) → Option 2 (Donate 100%) → Decline | Present Option 1 (keep for 50% refund, no proof). If rejected, present Option 2 (donate for 100% refund with CX-verified proof). If both rejected, decline return. |

    *   **Warranty Logistics:** For approved warranty claims, if customer needs pickup assistance, offer Courier pickup (label with "Defective" wording) or Disposal pickup (logged to Return Logistics Team).
    *   **Third-Party Logistics:** For approved third-party claims needing pickup, offer Courier pickup (CX provides label) or Disposal pickup (logged to Return Logistics Team).

9. **Ticket Creation** – The Claimlane ticket stores all details. Duplicate tickets are prevented.

10. **Backend Actions** – Upon submission:

    *   **Automatic Refund for Low-Value Returns:** When "Received" and net refund value < **600** AND order contains **NO bundles or free items**, auto-initiate refund (if gateway supported). This is a Phase 1 constraint.
    *   **Manual Refund for High-Value or Bundle Returns:** When "Received" and net refund value >= **600**, OR order contains bundles/free items, route to CX for manual processing.
    *   **Caledonia Workflow (CA Returns):** Caledonia team updates status **Delivered → Processing / Inspection Completed** directly in portal. Store Ops runs report for inventory.
    *   **US Warehouse Workflow (US Returns):** US warehouse (LA/NJ) emails status to Internal Ops team (offline). Internal Ops manually updates portal status **Delivered → Processing / Inspection Completed**. Internal Ops runs report for inventory.

---

## Visual Process Flow

![Process Flow](assets/WorkFlow.png)

---

## Discussion

> 💬 **Comments for this page are available in Giscus.**  
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>
