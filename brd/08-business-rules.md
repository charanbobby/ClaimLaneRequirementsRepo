# Business Rules

The portal must enforce the following rules (numbered BR-1 through BR-12 plus appendix rules).

- **BR-1 – Third-Party Orders:** Orders from third-party vendors never proceed through the Silk & Snow portal. The portal shows vendor instructions only.

- **BR-2 – Order Security:** No order details are displayed unless both the email and order number match the WooCommerce record exactly.

- **BR-3 – Item Selection Requirement:** At least one item must be selected to proceed with a return or claim.

- **BR-4 – Maximum Quantity:** A maximum of two units per product type may be returned in a single request; selecting more triggers a soft warning and admin flag.

- **BR-5 – Complete Documentation:** A claim cannot be submitted until all required documentation (photos, measurements, lot number, description and invoice where applicable) is provided, except when customer service manually overrides.

- **BR-6 – Freight & Oversize:** Freight or oversize rules apply for furniture, adjustable beds and oversized items; the system must enforce a **CX Pre-Approval** step before any labels are generated or pickups arranged.

- **BR-7 – Duplicate Ticket Prevention:** The system must prevent the creation of multiple tickets for the same items within a short window (specific timeframe configurable).

- **BR-8 – Eligibility Calculation:** Eligibility must be computed using delivered_date + return_period (see return windows). Past the window, items are not eligible.

- **BR-9 – Warranty Check:** Warranty claims remain available even after the return window has closed.

- **BR-10 – Documentation Validation:** Uploaded documentation must be validated at submission to ensure that all required fields are present.

- **BR-11 – Return Reason Mapping:** Refunds must use the mapped WooCommerce reason for reporting and processing.

- **BR-12 – Duplicate Refunds:** No duplicate refund attempts are allowed; the system must detect prior refunds before initiating a new one.

- **BR-13 – Retail Store Backend Detection:** When a customer selects "Silk & Snow Retail Store," the portal must lookup the backend:
    - **Shopify POS:** Route to standard Shopify flow.
    - **STORIS:** Block online return; show "In-store return only" message.

- **BR-14 – STORIS Store Returns:** For STORIS stores, the portal displays an "In-store return only" message and does not allow online returns. No tickets, labels, or refunds are generated in the portal.

- **BR-15 – Bundle / Free Item 50% Keep Rule:** When a bundle item is returned and the customer keeps the bundled/free item, the customer pays **50% of the full website price** for the kept item. The refund is adjusted (prorated) to reflect this charge and the decision is recorded on the ticket.

- **BR-16 – Vendor Pickup and Status Updates:** Vendors (or Logistics team) must update mattress status to "Picked" in the portal. This status update must transition the item to **"Received"** to trigger refund logic.

- **BR-17 – Furniture Return Pre-Approval:** All furniture returns require **CX Approval** (based on photos) before logistics can be arranged. On approval, the system calls the **WooCommerce service** (same as original purchase) to calculate return rates. The client must pay for the return (or have it deducted). Once settled, the portal generates labels/pickup instructions.

- **BR-18 – Accessory and Bedding Mail-In Flow:** These items follow a single-step logistics flow: Reason/Photos -> Label Generation -> Mail-in.

- **BR-19 – Caledonia Limited Access Role:** Caledonia team uses a limited role to update status: **Delivered -> Processing / Inspection Completed**.

- **BR-20 – Store Ops Returned Items Report:** Store Ops must be able to generate a report of items in "Inspection Completed" status for inventory updates.

- **BR-21 – Automatic Refund Threshold (< 600):**
    - Net Refund Value < 600: **Auto-Refund** initiated (if gateway supported).
    - Net Refund Value >= 600: **Manual Refund** (routed to CX).

- **BR-22 – Return Label Limitation:** The number of return labels generated cannot exceed the number of boxes/labels in the original order.

- **BR-23 – US Accessory Keep Offer:** For US opened accessories, the customer MUST be offered Option 1 (keep item for 50% refund, no proof required) before declining the return. This offer applies to both opened items and high-cost unopened items (shipping > 1/3 value).

- **BR-24 – US Accessory Donate Offer:** If the customer rejects Option 1 (50% keep), the system MUST present Option 2 (donate item for 100% refund with CX-verified proof via call/email). The return can only be declined if BOTH offers are rejected.

- **BR-25 – Shipping Cost Threshold:** For US unopened accessories/bedding, if the calculated shipping cost exceeds 1/3 of the item value, the system MUST skip label generation and present the keep/donate offers instead.

- **BR-26 – Auto-Refund Bundle Exclusion:** Automatic refunds are strictly prohibited for any order containing bundles or free items, regardless of refund value. All such orders MUST route to manual refund processing. This is a Phase 1 technical limitation pending bundle calculation implementation (WF-070→073).

- **BR-27 – Warranty Label Wording:** Courier pickup labels generated for warranty claims MUST include the text "(Defective)" or "(Defective - this will help warehouse to avoid inspection of that piece)" to signal the warehouse team to bypass standard inspection procedures.

- **BR-28 – US Warehouse Offline Processing:** US warehouse (LA/NJ) status updates are processed via email to Internal Ops, not through direct portal access. The portal MUST support manual status entry by Internal Ops for US returns.

- **BR-29 – Self-Donate Fallback Requirement:** When the Return Logistics Team cannot secure a vendor for unboxed mattress pickup, the system MUST offer the customer a self-donation option. The customer must complete donation, provide photo proof, and contact CX for manual return processing.

## Appendix Rules

- **A-1 – 100% Documentation:** A claim cannot be submitted unless 100% of required documentation is provided (except for manual overrides).

- **B-1 – Reason Inheritance:** Each subcategory inherits the return reasons and mappings exactly as provided in the source tables.

---

## Discussion

> 💬 **Comments for this page are available in Giscus.**  
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>

