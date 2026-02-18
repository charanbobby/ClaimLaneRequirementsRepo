# Business Rules

The portal must enforce the following rules (numbered BR-1 through BR-12 plus appendix rules).

- **BR-1 – Third-Party Orders:** Third-party vendor orders (TSC, EQ3, Costco) enter ClaimLane via a **vendor-specific generic link** shared by the vendor with the customer. The link is not unique to the customer; to mitigate security concerns, the link MUST open a **Terms & Conditions page** before any action is taken. The T&C clearly states: (1) no refund will be issued by Silk & Snow — the refund is the responsibility of the third-party vendor, and (2) the return is not authorized by the third-party partner. After the customer accepts T&C and provides pickup details, ClaimLane creates a ticket and follows standard pickup logistics. **Costco orders do not require pickup assistance** — ticket is created for tracking only.

- **BR-2 – Order Security:** No order details are displayed unless both the email and order number match the WooCommerce record exactly.

- **BR-3 – Item Selection Requirement:** At least one item must be selected to proceed with a return or claim.

- **BR-4 – Maximum Quantity:** **[MOVED to Phase 2 Backlog]** *The rule limiting returns to a maximum of two units per product type has been deferred.*

- **BR-5 – Complete Documentation:** A claim cannot be submitted until 100% of required documentation (photos, measurements, lot number, description and invoice where applicable) is provided and validated at submission, except when customer service manually overrides. *(Consolidates former A-1 and BR-10.)*

- **BR-6 – Freight & Oversize:** Freight or oversize rules apply for furniture, adjustable beds and oversized items; the system must enforce a **CX Pre-Approval** step before any labels are generated or pickups arranged.

- **BR-7 – Duplicate Ticket Prevention:** The system must prevent the creation of multiple tickets for the same items within a short window (specific timeframe configurable).

- **BR-8 – Eligibility Calculation:** Eligibility must be computed using delivered_date + return_period (see return windows). Past the window, items are not eligible.

- **BR-9 – Warranty Check:** Warranty claims remain available even after the return window has closed.

- **BR-11 – Return Reason Mapping:** Refunds must use the mapped WooCommerce reason for reporting and processing.

- **BR-12 – Duplicate Refunds:** No duplicate refund attempts are allowed; the system must detect prior refunds before initiating a new one.

- **BR-13 – Retail Store Backend Detection:** When a customer selects "Silk & Snow Retail Store," the portal must lookup the backend:
    - **Shopify POS:** Route to standard Shopify flow.
    - **STORIS:** Block online return; show "In-store return only" message. No tickets, labels, or refunds are generated in the portal.

- **BR-15 – Bundle / Free Item 50% Keep Rule:** When a bundle item is returned and the customer keeps the bundled/free item, the customer pays **50% of the full website price** for the kept item. The refund is adjusted (prorated) to reflect this charge and the decision is recorded on the ticket. **Note:** This requires custom code integration to bridge the WooCommerce data structure with the portal.

- **BR-16 – Vendor Pickup and Status Updates:** Vendors (6–10 donation/pickup partners) must update mattress status to "Picked" in the portal via their vendor portal access. This status update must transition the item to **"Received"** to trigger refund logic.

- **BR-17 – Furniture Return Process:** The system must calculate and present return shipping charges (via WooCommerce service) **before** ticket submission. The customer must agree to pay the charge (or have it deducted). **Note:** Disposal pickups use the same charge as the courier rate. Once the customer accepts and submits, the ticket enters **CX Review**. Only upon **CX Approval** (of photos + charge) does the system **automatically generate** labels and pickup instructions.

- **BR-18 – Accessory and Bedding Mail-In Flow:** These items follow a single-step logistics flow: Reason/Photos -> Label Generation -> Mail-in.

- **BR-19 – Caledonia Limited Access Role:** Caledonia team uses a limited role to update status: **Delivered -> Processing / Inspection Completed**.

- **BR-20 – Store Ops Returned Items Report:** Store Ops must be able to generate a report of items in "Inspection Completed" status for inventory updates.

- **BR-21 – Automatic Refund Threshold (< 600):**

    - Net Refund Value < 600: **Auto-Refund** initiated (if gateway supported).
    - Net Refund Value >= 600: **Manual Refund** (routed to CX).

- **BR-22 – Return Label Limitation:** The number of return labels generated cannot exceed the number of boxes/labels in the original order.

- **BR-23 – US Accessory Keep Offer:** For US opened accessories and bedding, the customer MUST be offered Option 1 (keep item for 50% refund, no proof required). This applies to opened items only. Unopened items follow the standard return label flow.

- **BR-24 – US Accessory Donate Offer (Offline):** Option 2 (donate for 100% refund) is no longer presented directly in the portal. When a customer **accepts** Option 1, the 50% refund is processed and the return is complete (customer keeps item). When a customer **rejects** Option 1, the system generates a **Customer Care ticket**. CX contacts the customer offline to encourage Option 2 (donate item for full refund with CX-verified proof).

- **BR-25 – ~~Shipping Cost Threshold~~ (Superseded):** This rule has been superseded. The shipping cost threshold (1/3 of item value) is no longer used. All US unopened accessories/bedding receive a return label via standard flow.

- **BR-26 – Auto-Refund Bundle Exclusion:** Automatic refunds are strictly prohibited for any order containing bundles or free items, regardless of refund value. All such orders MUST route to manual refund processing. This is a Phase 1 technical limitation due to the **custom implementation required** for bundle calculation (WF-070→073).

- **BR-27 – Warranty Label Wording:** Courier pickup labels generated for warranty claims MUST include the text "(Defective)" or "(Defective - this will help warehouse to avoid inspection of that piece)" to signal the warehouse team to bypass standard inspection procedures.

- **BR-28 – US Warehouse Offline Processing:** US warehouse (LA/NJ) status updates are processed via email to Internal Ops, not through direct portal access. The portal MUST support manual status entry by Internal Ops for US returns.

- **BR-29 – Self-Donate Selection:** When the Return Logistics Team cannot secure a vendor for unboxed mattress pickup, they MUST act to select the **"Self-Donation"** option in the vendor list. This provides the customer with self-donation instructions. The customer must then complete donation, provide photo proof, and contact CX for manual return processing.

- **BR-30 – Furniture Return Destinations:** When calling the shipping API for furniture returns, the system must use region-specific destinations:
    - **Canada (CA):** Returns always go to **Caledonia warehouse**.
    - **United States (US):** Returns go to the **origin warehouse** as determined by the **Fulfil ERP API**. The API returns the originating warehouse for each SKU in the order. When an order was shipped from **multiple warehouses**, the system must route the return to the **closest warehouse** to the customer's shipping address (calculated via Google Maps geocoding). US warehouses: **LA (JDLLA)** – 6509 Kimball Ave, Chino, CA 91708; **NJ (JDLNJ)** – 55 Wildcat Way, Linden, NJ 07036.

## Appendix Rules

- **B-1 – Reason Inheritance:** Each subcategory inherits the return reasons and mappings exactly as provided in the source tables.

---

## Discussion

> 💬 **Comments for this page are available in Giscus.**  
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>
