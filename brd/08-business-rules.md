# Business Rules

The portal must enforce the following rules (numbered BR-1 through BR-12 plus appendix rules).

- **BR-1 – Third-Party Orders:** Orders from third-party vendors never proceed through the Silk & Snow portal. The portal shows vendor instructions only.

- **BR-2 – Order Security:** No order details are displayed unless both the email and order number match the WooCommerce record exactly.

- **BR-3 – Item Selection Requirement:** At least one item must be selected to proceed with a return or claim.

- **BR-4 – Maximum Quantity:** A maximum of two units per product type may be returned in a single request; selecting more triggers a soft warning and admin flag.

- **BR-5 – Complete Documentation:** A claim cannot be submitted until all required documentation (photos, measurements, lot number, description and invoice where applicable) is provided, except when customer service manually overrides.

- **BR-6 – Freight & Oversize:** Freight or oversize rules apply for furniture, adjustable beds and oversized items; the system must handle these separately from standard label generation.

- **BR-7 – Duplicate Ticket Prevention:** The system must prevent the creation of multiple tickets for the same items within a short window (specific timeframe configurable).

- **BR-8 – Eligibility Calculation:** Eligibility must be computed using delivered_date + return_period (see return windows). Past the window, items are not eligible.

- **BR-9 – Warranty Check:** Warranty claims remain available even after the return window has closed.

- **BR-10 – Documentation Validation:** Uploaded documentation must be validated at submission to ensure that all required fields are present.

- **BR-11 – Return Reason Mapping:** Refunds must use the mapped WooCommerce reason for reporting and processing.

- **BR-12 – Duplicate Refunds:** No duplicate refund attempts are allowed; the system must detect prior refunds before initiating a new one.

## Appendix Rules

- **A-1 – 100% Documentation:** A claim cannot be submitted unless 100% of required documentation is provided (except for manual overrides).

- **B-1 – Reason Inheritance:** Each subcategory inherits the return reasons and mappings exactly as provided in the source tables.
