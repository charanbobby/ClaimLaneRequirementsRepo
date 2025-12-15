# Appendices

## APPENDIX A — Claim Reasons & Documentation Requirements

This appendix defines exact documentation requirements for every claim reason, per product category, based directly on the tables you provided.

This is essential for QA (validation of required fields) and Business (alignment with warranty policy).

### A.1 Mattress Category

**Mattress – Claim Reasons & Required Documentation**

| Claim Reason | Required Documentation |
| :--- | :--- |
| Shipping / Damage Upon Receipt | 1. Photo of base<br>2. Photo of full mattress measurement (no sheets)<br>3. Photos of both sides of visible tags |
| Structural Damage (broken coils, cracked foam, etc.) | Same as above (base + full measurement + tags) |
| Loose Stitching, Seam Issues, Cosmetic Issues | Photos of issue<br>Photos of tags |
| Top or Side Panel Fit / Alignment Concerns | Photos of issue<br>Photos of tags |
| Size Discrepancy | 1. Photo of base<br>2. Measurement of length + width (entire measuring tool visible)<br>3. Photos of tags |
| Permanent Excessive Sagging / Indentations | 1. Photo of base<br>2. Photo of indentation measurement with ruler<br>3. Photos of tags |

**General Required for All Mattress Claims**

*   ✔ Lot number
*   ✔ Detailed description
*   ✔ If from retail/third-party → invoice copy

### A.2 Furniture Category

**Furniture Types:**

*   Adjustable Beds
*   Wooden Furniture
*   Upholstered Frames
*   Sofa

**Furniture – Claim Reasons & Required Documentation**

| Claim Reason | Required Documentation |
| :--- | :--- |
| Missing Parts | 1. Mark-up of assembly guide (parts missing)<br>2. Photos of issue from multiple angles<br>3. Tag photos (if applicable) |
| Broken Component / Shipping Damage | Photos from several angles<br>Tag photos |
| Structural Issues (warped frame, cracked joints, etc.) | Photos from several angles<br>Tag photos |
| Material Quality Issues | Photos of issue<br>Tag photos |
| Cosmetic Issues | Photos of issue<br>Tag photos |
| Functional Issues (drawer, mechanism failures) | Photos/video (if platform allows)<br>Tag photos |
| Upholstery Issues (stitching, pilling, premature wear) | Photos of issue<br>Tag photos |

**General Required for All Furniture Claims**

*   ✔ Lot number
*   ✔ Detailed description
*   ✔ Retail/third-party invoice (if applicable)

### A.3 Bedding Category

**Includes:**

*   Sheets (Percale, Linen, Egyptian Cotton, Muslin, Silk)
*   Duvets
*   Pillowcases
*   Pillows
*   Protectors
*   Throws
*   Weighted blankets

**Bedding – Claim Reasons & Required Documentation**

| Claim Reason | Required Documentation |
| :--- | :--- |
| Fabric Concerns (snags, tears, holes) | Clear photos of issue<br>Tag photos |
| Seam Concerns | Photos of issue<br>Tag photos |
| Material Concerns (pilling, fading, discoloration) | Photos<br>Tag photos |
| Sizing Concerns | Photo of issue<br>Tag photos<br>Length + width measurements |

**General Required for All Bedding Claims**

*   ✔ Lot number
*   ✔ Description
*   ✔ Invoice (retail/third-party only)

### A.4 Bath Category

**Includes:**

*   Terry towels
*   Turkish towels
*   Bath mats
*   Bath robes

**Bath – Claim Reasons & Required Documentation**

| Claim Reason | Required Documentation |
| :--- | :--- |
| Fabric Concerns | Clear photos<br>Tag photos |
| Material Concerns | Photos<br>Tag photos |
| Seam Concerns | Photos<br>Tag photos |
| Sizing Concerns | Measurements<br>Tag photos |

**General Required**

*   ✔ Lot number
*   ✔ Description
*   ✔ Invoice if not S&S order

### A.5 Global Documentation Rules for All Claims

| Requirement | Applies To |
| :--- | :--- |
| Lot number | All claims |
| Description of issue | All claims |
| Invoice | Retail store / third-party |
| Photos | Category-specific, mandatory |
| Measurements | Required when defect relates to size |
| Tags | Required in almost every category |

**Business Rule A-1:**
A claim cannot be submitted unless 100% of required documentation is provided (except when CS overrides manually).

---

## APPENDIX B — Return Reasons Mapping (Customer Reason → WooCommerce Reason)

This appendix defines all return reasons that the customer may select and how they map to WooCommerce refund reasons, per category.

This is essential for Testers verifying:
*   Correct reason list appears
*   Correct mapping sent to Woo during refund
*   Correct reporting categories

### B.1 Bath Category

**Bath Mat — Customer Return Reasons → Woo Reasons**

| Customer-facing Reason | Woo Refund Reason |
| :--- | :--- |
| Cancelled | Cancelled |
| Backorder Cancellation | Backorder Cancellation |
| Price-Match | Price-Match |
| Too Thin | Too Thin |
| Not Absorbent | Not Absorbent |
| Colour | Colour |
| Sizing | Sizing |
| Quality (Cosmetics) | Quality |
| Not as Expected/Advertised | Not as Expected |
| Other / Change of Mind | Change of Mind |
| Chargeback | Chargeback |
| Cancellation – Fraud | Fraud |

(This format is applied to all bath subcategories — Terry, Turkish, Robes — with identical mapping.)

### B.2 Bedding Category

**Example: Accessories**

| Reason | Woo Mapping |
| :--- | :--- |
| Too Thin | Too Thin |
| Too Hot | Too Hot |
| Price-Match | Price-Match |
| Softness Issue | Softness Issue |
| Quality (Cosmetics) | Quality |
| Sizing | Sizing |
| Colour | Colour |
| Defective | Defective |
| Too Heavy | Too Heavy |
| Other / Change of Mind | Change of Mind |
| Not as Expected | Not as Expected |
| Coupon | Coupon |
| Cancelled | Cancelled |
| Backorder | Backorder Cancellation |
| Chargeback | Chargeback |
| Cancellation – Fraud | Fraud |

**Additional Bedding Subcategories**

*   Egyptian Cotton Bedding
*   Linen Bedding
*   Muslin Bedding
*   Percale Bedding
*   Toppers
*   Weighted Blankets
*   Waffle Bedding
*   Throws

**Rule B-1:**
Each subcategory inherits the list and mapping exactly as provided in the source table.

### B.3 Furniture Category

**Example mappings (Upholstered Bed Frames):**

| Reason | Woo Mapping |
| :--- | :--- |
| Price-Match | Price-Match |
| Colour | Colour |
| Shipping Damage | Shipping Damage |
| Quality (Cosmetics) | Quality |
| Defective | Defective |
| Not as Expected | Not as Expected |
| Other / Change of Mind | Change of Mind |
| Cancelled | Cancelled |
| Backorder Cancellation | Backorder |
| Chargeback | Chargeback |
| Cancellation – Fraud | Fraud |

(Identical structure for Wooden Furniture, Sofa, Adjustable Beds.)

### B.4 Mattress Category

**Mattress – CA & US**

| Reason | Woo Mapping |
| :--- | :--- |
| Too Firm | Too Firm |
| Too Soft | Too Soft |
| Too Warm | Too Warm |
| Not Supportive | Not Supportive |
| Quality (Cosmetics) | Quality |
| Defective | Defective |
| Pain | Pain |
| Shipping Damage | Shipping Damage |
| Not as Expected | Not as Expected |
| Cancelled | Cancelled |
| Backorder Cancellation | Backorder |
| Other / Change of Mind | Change of Mind |
| Chargeback | Chargeback |
| Cancellation – Fraud | Fraud |

---

## APPENDIX C — Warranty & Return Policy Table

This is the definitive single source for testers and business users validating eligibility.

### C.1 Return Periods

| Product Category | Return Period | Conditions |
| :--- | :--- | :--- |
| Mattresses | 365 nights | Full refund; boxed preferred; unboxed requires approval |
| Furniture | 30 days | Return shipping deducted unless escalated |
| Toppers | 100 nights | Soft goods rules |
| Bedding | 100 nights | Must confirm donatable condition |
| Bath | 100 nights | N/A |
| Accessories | 100 nights | N/A |
| Custom Hybrid Mattress | Not returnable | Warranty only |

### C.2 Warranty Periods

| Product Category | Warranty |
| :--- | :--- |
| Mattresses | 15 years |
| Adjustable Bed | 10 years |
| Furniture | 5 years |
| Sofa | 5 years |
| Pillows | 3 years |
| Mattress Toppers | 3 years |
| Bedding | 1 year |
| Bath | 1 year |
| Accessories | 1 year |

---

## APPENDIX D — Full Return Eligibility Matrix

This matrix defines the exact logic used to determine whether an item is Eligible, Not Eligible, or Conditionally Eligible.

This table is essential for QA test case coverage.

### D.1 Eligibility by Product Category & Time

| Category | < Return Window | > Return Window | Final Sale | Already Returned | Trial-Specific Rules |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Mattress | Eligible; <30 nights soft warning | Not Eligible (>365) | Blocked | Blocked | <30 nights = warning; >365 = blocked |
| Furniture | Eligible | Not Eligible (>30 days) | Blocked | Blocked | Must show shipping cost deduction notes |
| Bedding | Eligible | Not Eligible (>100 nights) | Blocked | Blocked | Must confirm donatable condition |
| Bath | Eligible | Not Eligible (>100 nights) | Blocked | Blocked | Standard |
| Accessories | Eligible | Not Eligible (>100 nights) | Blocked | Blocked | Standard |
| Toppers | Eligible | Not Eligible (>100 nights) | Blocked | Blocked | Early-return soft warning (if configured) |
| Custom Hybrid Mattress | Not Eligible – Always | Not Eligible – Always | Final Sale | N/A | N/A |

### D.2 Eligibility by Channel

| Channel | Web Order | Retail Store | POS Purchase | Third-Party Vendor |
| :--- | :--- | :--- | :--- | :--- |
| Web Purchase | Full portal flow | Not allowed | Not allowed | Not applicable |
| Retail Shopify Order | Allowed (if ID matches) | Allowed in store | Allowed | Not applicable |
| POS Purchase | Guidance only | Must return in-store | Allowed | Not applicable |
| Amazon/3rd Party | Not allowed | Not allowed | Not allowed | Redirect to vendor |

### D.3 Eligibility by Condition

| Condition Scenario | Eligibility State | Business Rule |
| :--- | :--- | :--- |
| Item missing packaging (furniture) | Conditionally Eligible | Warning to customer; admin flag “Missing Packaging” |
| Mattress unboxed | Requires approval | Photos required; support review |
| Gift-with-purchase | Must return gift OR deduct value | BR: If main item returned → free gift must be returned |
| Bundles | Bundle refund follows bundle rules | BR: Returning single item → prorated refund |

### D.4 Bundles Eligibility Rules

| Scenario | Eligibility | Notes |
| :--- | :--- | :--- |
| Full bundle return | Eligible | Refund full bundle price |
| Returning single pillow (from bundle) | Eligible | Prorated refund |
| Returning duvet only | Eligible | Prorated refund |
| Free sleep bundle gift | Must return gift | Or deduct gift value |

---

## Discussion

> 💬 **Comments for this page are available in Giscus.**  
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>
