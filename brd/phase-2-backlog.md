# Deferred Features Backlog (Phase 2 & Future Phase)

## Executive Summary

During **Discussions with ClaimLane & Internal Stakeholders**, feature sets were systematically extracted from the Phase 1 BRD and moved to this Phase 2 backlog. This strategic deferral allows the team to focus Phase 1 delivery on core return and warranty flows while preserving complete context for future implementation.

### Deferred Features at a Glance

| Feature | Scope | Business Impact | Technical Complexity |
|---------|-------|-----------------|---------------------|
| **Bundle Refund Logic (Future Phase)** | Automated bundle impact calculations and 50% keep option | Medium - Manual processing workaround in Phase 1 | High - WooCommerce limitations, custom API integration needed |
| **Return Quantity Limits (Future Phase)** | Historical and per-request return limits | Low - No limits in Phase 1 | Low - Order history checks required |

### Why These Features Were Deferred

**1. Refund Logic with Bundle Impact Calculations**

- **Rationale:** WooCommerce core limitations prevent access to bundle data structures; custom logic required to parse bundle relationships and calculate 50% proration
- **Phase 1 Workaround:** All orders with bundles/free items route to manual CX refund processing (BR-26)
- **Future Phase Value:** Reduces CX workload, improves customer experience, enables automated refunds for bundle orders <$600

### Implementation Approach

**Phase 1 Foundation (Current):**
- Core return flows (mattresses, furniture, accessories)
- Warranty claim processing
- Vendor portal access for donation/pickup partners (6–10 vendors) with secure authentication
- Third-party vendor pickup logistics via vendor-specific links (TSC, EQ3, Costco)
- Manual bundle refund processing by CX

**Future Phase Enhancements (This Backlog):**
- WooCommerce bundle API integration
- Automated bundle proration engine

### Business Continuity

All deferred features have **Phase 1 manual workarounds** to ensure zero disruption to customer service:

- **Bundle Refunds:** CX team manually calculates proration and processes refunds

### Quick Reference

- **Total Features Deferred:** 2 (Future Phase: Bundles, Limits)
- **Functional Requirements:** 3 (FR-9, FR-10, FR-HIST-1)
- **User Stories:** 3 (from Epics 4)
- **Business Rules:** 2 (BR-15, BR-26)
- **Workflow Nodes:** 4+ (WF-070-073)

> [!IMPORTANT]
> **Last Updated:** 2026-02-18
> All items below were systematically extracted from active BRD documents to focus Phase 1 delivery.

---

## 1. Future Phase Refund Logic (Bundle Impact Calculations)

### Rationale for Deferral

Due to WooCommerce core limitations regarding bundle structures, implementing automated bundle impact calculations requires **custom logic** to correctly identify bundled items and apply proration. Standard Claimlane/WooCommerce plugins do not support this out-of-the-box. There are too many technical limitations to accommodate this in Phase 1.

### Functional Requirements

> Canonical text for FR-9 and FR-23 lives in `functional-requirements.md`. Below are Phase 2-specific notes only.

- **FR-9** — Bundles Handling: Custom implementation to parse WooCommerce bundle data and calculate 50% proration. **STATUS:** Deferred to Phase 2.
- **FR-23** — Refund Processing (Bundle Component): Bundle auto-refund capability requires WF-070-073 implementation. **STATUS:** Manual processing remains in Phase 1. Bundle auto-refund deferred to Phase 2.

### User Stories

> Canonical versions of these stories live in `epics-user-stories.md` (Epic 4 and Epic 10). Below are Phase 2-specific status notes only.

- **US-4.1** — Apply Bundle Eligibility Rules. **STATUS:** Deferred to Phase 2.
- **US-4.2** — Free / Bundled Item "Keep at Discount" Option. **STATUS:** Deferred to Phase 2.
- **US-10.1** — Auto vs Manual Refund Thresholds (Bundle component: WF-070-073 calculation logic). **STATUS:** Bundle calculation logic deferred to Phase 2.

### Business Rules

> Canonical rule text lives in `business-rules.md`. Below are Phase 2-specific status notes only.

- **BR-15** — Bundle / Free Item 50% Keep Rule. Requires custom WooCommerce integration. **STATUS:** Deferred to Phase 2.
- **BR-26** — Auto-Refund Bundle Exclusion. **STATUS:** Kept in Phase 1 as a constraint. Auto-refund capability for bundles deferred to Phase 2.

### Process Narratives

> Full narrative for Refund Processing lives in `process-high-level.md`, Section 13.

**Phase 2 addition — Bundle Impact Calculations (WF-070-073):**
- System calculates bundle impacts and adjusted refundable amounts
- Accounts for 50% proration of bundled/free items customer keeps
- If post-bundle value < $600: Auto-refund (WF-071-072)
- If post-bundle value >= $600: Manual CX processing (WF-071-073)

### Scope Impact

#### Technical Constraints Added to Phase 1

- Orders with bundles or free items MUST route to manual refund processing
- Auto-refund threshold (<$600) applies ONLY to non-bundle orders
- Bundle detection logic required but proration calculation deferred

---

### Dependencies & Risks

#### Dependencies
- WooCommerce bundle data structure analysis and mapping
- Custom API integration to parse bundle relationships
- Proration calculation engine development
- Testing across all bundle types (mattress+pillow, duvet+pillow, gift-with-purchase)
- Business approval of proration rules and edge cases

#### Risks
- **WooCommerce Limitations:** Platform may not expose sufficient bundle metadata via API
- **Edge Cases:** Complex bundle scenarios (multi-tier bundles, partial returns) may be unhandled
- **Testing Complexity:** Combinatorial explosion of bundle configurations
- **Performance Impact:** Bundle calculation may slow down refund processing
- **Data Integrity:** Incorrect proration could result in over-refunds or under-refunds

---

## 2. Return Quantity Limits (Historical & Per-Request)

### Rationale for Deferral

The original requirement included a limit on the number of returns a customer could make for the same product type — both within a single request (max 2 units) and historically (lifetime limit). To reduce Phase 1 complexity and allow for broader return policies initially, this restriction has been moved to Future Phase. The system will currently allow customers to select items up to the purchased quantity without these specific blocks.

### Functional Requirements

#### FR-10 (Restriction Component) – Quantity Limit Exceeded
- **ID:** *(Extracted from FR-10)*
- **Description:** Prevent selection of more than two units of the same product type with a soft warning and flag the ticket for "Quantity Limit Exceeded" if over the limit.
- **Priority:** Phase 2
- **Dependencies:** Order history checks, logic to sum quantity across current and past returns

#### FR-HIST-1 – Historical Return Limit
- **ID:** *(New Requirement derived from business rule discussions)*
- **Description:** "Do not allow more than 1 return of the same product type throughout the client's history."
- **Priority:** Phase 2
- **Dependencies:** Customer profile history, global return aggregation

### Business Rules

- **BR-4** — Maximum Quantity: A maximum of two units per product type may be returned in a single request; selecting more triggers a soft warning and admin flag. **STATUS:** Deferred to Phase 2.

---

## Appendices — Deferred Content

### Appendix D.4 — Bundles Eligibility Rules

> Also documented in `appendices.md`, Section D.4.

| Scenario | Eligibility | Notes |
| :--- | :--- | :--- |
| Full bundle return | Eligible | Refund full bundle price |
| Returning single pillow (from bundle) | Eligible | Prorated refund |
| Returning duvet only | Eligible | Prorated refund |
| Free sleep bundle gift | Must return gift | Or deduct gift value |

**STATUS:** Deferred to Future Phase

---

## Changelog Impact

### Extraction Log — 2026-02-03

**Batch 3: Deep Scope Refinement (Phase 2 Move)**

Performed comprehensive "Deep Extraction" of Phase 2 features from active BRD documents:

#### Features Moved to Phase 2 Backlog:
1. ~~**Vendors (Donation / Pickup Partners)**~~ — *Restored to Phase 1 on 2026-02-18 (only 6–10 vendors; manageable scope)*
2. ~~**Third-Party Vendor Integration**~~ — *Restored to Phase 1 on 2026-02-18 (simplified link-based flow with T&C gate; no vendor approval workflow needed)*
3. **Phase 2 Refund Logic** — Bundle impact calculations (WF-070-073)

#### Review Notes:
- Self-donate fallback (WF-130) kept in Phase 1
- Vendor portal access restored to Phase 1 (2026-02-18) — limited vendor count (6–10) makes scope manageable
- Bundle exclusion constraint (BR-26) kept in Phase 1 to force manual refunds
- Third-party vendor integration restored to Phase 1 (2026-02-18) — simplified to vendor-initiated link-based flow with T&C gate, no vendor approval workflow needed

---

## Discussion

> Comments for this page are available in Giscus.
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>
