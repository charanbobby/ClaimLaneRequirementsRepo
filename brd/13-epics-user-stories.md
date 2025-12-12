# Epics, Features and User Stories

The requirements are organized into epics and features. User stories are expressed in the format: As a [role], I want [goal] so that [benefit]. Each story includes acceptance criteria derived from the testing worksheet.

## Epic 1 – Start & Authentication Flow

### Feature 1.1 – Channel & Intent Selection

#### US-1.1.1 – Select Purchase Channel

_As a customer, I want to choose where I purchased my item (website, retail store, Shopify, POS or third-party vendor) so that the portal can route my request appropriately._

**Acceptance Criteria**

- The start screen lists only US and Canadian channels (SCR-01).
- Selecting a third-party vendor shows vendor instructions and ends the flow.
- Selecting a physical store or other vendor displays store-specific information (SCR-02).

#### US-1.1.2 – Select Return or Claim Type

_As a customer, I want to indicate whether I'm returning a product or submitting a warranty claim so that the system applies the correct rules._

**Acceptance Criteria**

- Return options include "Return" and "Warranty Claim" (CAT-01 through CAT-04).
- Changing the selection resets the workflow without retaining stale data (CAT-05).

### Feature 1.2 – Order Lookup

#### US-1.2.1 – Secure Order Lookup

_As a customer, I want to find my online order by entering my email and order number so that only my order information is displayed._

**Acceptance Criteria**

- Both email and order number are required; validation errors appear for empty or invalid fields (AUTH-03, AUTH-09).
- Leading/trailing spaces are trimmed (AUTH-04 to AUTH-06).
- If fields do not match a WooCommerce order, the system shows "order not found" without revealing details (AUTH-02, AUTH-07).
- Valid combinations retrieve the order and proceed to item selection (AUTH-01).

## Epic 2 – Item Display & Selection

### Feature 2.1 – Display Items & Eligibility

#### US-2.1.1 – View Purchased Items

_As a customer, I want to see all items in my order with images, colours and eligibility status so that I can select what to return._

**Acceptance Criteria**

- Items are accurately displayed with name, image, colour and quantity (ITEM-01, AC-2).
- Items marked as final sale (e.g., custom hybrid mattress) are clearly labelled and cannot be selected (ITEM-02).
- Items outside their return/trial window show an ineligible status (ITEM-06, AC-3).
- Soft warnings appear for mattresses returned within 30 nights and furniture returns without packaging (ITEM-03, ITEM-11, FUR-02, MAT-01).
- Category filtering hides non-relevant items when a specific return category is chosen (ITEM-05, AC-5, PERM-10/11).

### Feature 2.2 – Item Selection & Quantity

#### US-2.2.1 – Select Items and Quantities

_As a customer, I want to select one or more eligible items and specify quantities so that I can return exactly what I intend._

**Acceptance Criteria**

- The user can select multiple items or partial quantities (ITEM-07 to ITEM-10).
- Trying to proceed with no items selected produces a validation error (ITEM-15).
- Selecting more than two of the same product shows a soft warning (ITEM-11).
- Bundle rules apply when a bundle item is returned (ITEM-12 to ITEM-14, BND-01 to BND-08).

## Epic 3 – Reason Selection & Documentation

### Feature 3.1 – Reason Capture

#### US-3.1.1 – Select Return Reason

_As a customer returning an item, I want to choose a reason from a list so that the system can process my refund correctly._

**Acceptance Criteria**

- The reason list is category-specific and matches marketing-approved options.
- Selecting "Other" displays a required text field (RSN-02).
- Selecting a damage/defective reason requires photo uploads (RSN-03).
- Each item stores its own reason (RSN-04).
- Proceeding without selecting a reason is blocked (RSN-05).

#### US-3.1.2 – Select Claim Reason

_As a customer filing a warranty claim, I want to select a predefined claim reason appropriate to the product category so that my documentation requirements are clear._

**Acceptance Criteria**

- Only claim reasons approved by Silk & Snow are presented; "Other/Change of Mind" is not offered.
- Each claim reason triggers specific documentation fields per the claim documentation table (Appendix A).

### Feature 3.2 – Documentation Upload

#### US-3.2.1 – Provide Required Documentation

_As a customer with a claim or damage return, I want to upload photos, measurements, lot numbers and invoices as required so that my claim can be processed._

**Acceptance Criteria**

- The portal displays required fields based on the selected claim reason and product category.
- Mandatory fields must be completed before submission (RSN-03, RSN-05, AC-4).
- Unsupported file types or over-sized uploads are rejected with clear messages (RSN-07, RSN-08).
- Network errors during upload allow retry without losing form state (RSN-09).

## Epic 4 – Logistics & Label Management

### Feature 4.1 – Label Generation

#### US-4.1.1 – Specify Number of Boxes

_As a customer returning items, I want to indicate how many boxes I will ship so that I receive the correct number of return labels._

**Acceptance Criteria**

- The box count must be between 1 and 20 (LBL-01 to LBL-05, AC-6).
- Entering 0 or a number above 20 triggers validation errors.

#### US-4.1.2 – Generate Labels

_As a customer, I want the portal to generate shipping labels with accurate weights and dimensions so that I can return my items easily._

**Acceptance Criteria**

- Each box generates a unique label and tracking number (LBL-02 to LBL-03, LOG-05).
- Weight and dimension logic splits, sums or uses dimensional weight as appropriate (LOG-01 to LOG-04).
- Missing weight triggers fallback values (LOG-07).
- The customer's shipping address appears correctly on all labels (LBL-09).

#### US-4.1.3 – Handle Carrier Responses

_As a customer, I want errors from the carrier service to be handled gracefully so that I know how to proceed._

**Acceptance Criteria**

- Temporary carrier errors allow retry without duplicating labels (LBL-06 to LBL-08).
- Extended outages display fallback instructions to contact support.
- Re-printing a label retrieves the same label string (LOG-06).

## Epic 5 – Ticketing & Back-End Processing

### Feature 5.1 – Ticket Creation & Storage

#### US-5.1.1 – Create Ticket

_As a customer, I want a ticket created with all my return/claim information so that customer service can track and act upon it._

**Acceptance Criteria**

- Ticket includes contact details, selected items, quantities, documentation, labels and reasons (TK-01 to TK-04).
- A ticket is created immediately after submission; failures display a friendly message and notify support (TK-05, ERR-05).
- Duplicate tickets are prevented (TK-06).

#### US-5.1.2 – Ticket for Physical Store Returns

_As a customer returning an item purchased in a retail store, I want a ticket created for analytics even if the refund is processed manually so that Silk & Snow can track return volumes._

**Acceptance Criteria**

- Ticket indicates external vendor and does not trigger automatic refund logic (TK-07).
- Staff can view and act on the ticket in Claimlane.

### Feature 5.2 – Refund Processing

#### US-5.2.1 – Automatic Refund

_As a customer returning an item, I want my refund processed automatically where supported so that I receive my money back quickly._

**Acceptance Criteria**

- For supported gateways (Visa, Mastercard, PayPal, integrated BNPL), the system initiates a WooCommerce refund and updates inventory appropriately (WC-01, WC-05, WC-11).
- Partial refunds adjust only the line item amount and not inventory (WC-06).
- POS orders and unsupported gateways trigger manual refund instructions (WC-02 to WC-04, WC-10 to WC-13).
- Duplicate or currency mismatch refunds are prevented (WC-07, WC-08).
- Refund status and transaction IDs are stored in the ticket.

### Feature 5.3 – Replacement Orders

#### US-5.3.1 – Create Replacement Order

_As a customer with an approved warranty claim, I want the system to create a replacement order using my existing shipping details so that I receive my replacement without extra steps._

**Acceptance Criteria**

- Replacement orders are created in WooCommerce with status "Processing" (WC-04).
- The customer receives an email notification from WooCommerce (AC-8).
- Replacement order logic follows warranty rules by product (MAT-02, MAT-03, FUR-03, BED-02).

## Epic 6 – Exception & Edge Cases

#### US-6.1 – Vendor Approval

_As a customer returning an unboxed mattress or large furniture item, I want the system to request vendor approval before generating a label so that oversized or unpackaged returns are handled properly._

**Acceptance Criteria**

- Unboxed mattresses prompt the customer for additional photos and the ticket is flagged for vendor review (MAT-05).
- Furniture without packaging triggers a warning to the customer and an admin flag (FUR-02).
- Approval decisions are recorded in the ticket and update the flow.

#### US-6.2 – Donation Path

_As a customer with an open-box mattress return, I want to donate my mattress through an approved partner so that I can complete my return via donation._

**Acceptance Criteria**

- The portal displays donation partner details where available (MAT-05).
- If the customer's address is outside the service area, instructions to contact support are provided (MAT-06).

#### US-6.3 – Timeouts & Re-Entries

_As a customer, I want to resume my return if my session times out or I need to re-enter the portal so that I do not lose progress._

**Acceptance Criteria**

- Session timeouts after label generation but before final confirmation still preserve tickets and labels (PERM-26, PERM-27).
- If the user restarts the process, only items not yet returned are shown (UX-06, UX-07).
- Refreshing or double-submitting does not create duplicate tickets or refunds (UX-03, PERM-28).

## Epic 7 – User Experience & Accessibility

#### US-7.1 – UX Messages

_As a customer, I want clear and contextual messages during each step of the return or claim process so that I understand what is happening._

**Acceptance Criteria**

- Eligibility messages specify the product and rule (e.g., "Furniture must be returned within 30 days; this item is past the return window").
- Error messages cover invalid input, missing documentation, API failures, carrier errors and gateway errors (ERR-01 to ERR-05, AC-10).
- Marketing-approved copy is used across all screens and for all languages.

#### US-7.2 – Accessibility & Responsiveness

_As any user, I want to navigate the portal using only a keyboard and have the pages render correctly on mobile devices so that the portal is accessible._

**Acceptance Criteria**

- All interactive elements are reachable via keyboard and labelled appropriately (UX-08).
- Screens adapt to smaller screen sizes while maintaining functionality (UX-09).

---

## Discussion

> 💬 **Comments for this page are available in Giscus.**  
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>
