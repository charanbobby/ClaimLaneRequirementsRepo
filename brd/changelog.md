# Changelog

All notable changes to this project will be documented in this file.

## 2026-02-26 – Workflow & Channel Corrections (9 Action Items)

### Changed

- **scope.md:** Clarified US accessory return cost optimization — 50% keep offer is automated via ClaimLane; 100% donate offer (with proof) remains a manual CX process. *(AI-1)*
- **scope.md, process-high-level.md, functional-requirements.md (FR-1), business-rules.md (BR-13):** Added **Sleep Country Retail Store** as a distinct purchase channel. Removed STORIS backend store lookup entirely — channel selection now determines routing directly. Silk & Snow Retail routes to the WooCommerce online order flow; Sleep Country Retail directly displays the in-store return message directing customers to Sleep Country Customer Service. *(AI-5, AI-6)*
- **process-high-level.md (8A. Boxed Mattresses):** Documentation requirement for boxed mattress returns reduced to **photo of the box only** (law tag no longer collected). *(AI-2)*
- **process-high-level.md (10B, 10D), functional-requirements.md (FR-35):** Removed pickup assistance question from customer-facing warranty submission form. Pickup assistance is now a **CX-initiated add-on** — the default assumption is that the customer does not require assistance unless they call in to request it. *(AI-3)*
- **process-high-level.md (WF-092), functional-requirements.md (FR-30), business-rules.md (BR-19):** Added **Inspection Grade dropdown** at the Inspection Completed step (WF-092). Caledonia team must select Grade A (Resalable), Grade B (Donatable), or Grade C (Damaged). Reason code is mandatory for all grades. *(AI-4)*
- **process-high-level.md (Step 3), functional-requirements.md (FR-4):** Removed validation fallback options — the phone number retry alternative and the "contact support" escalation path are no longer offered. Customers may retry with corrected email and order number. *(AI-7)*
- **process-high-level.md (Step 4), functional-requirements.md (FR-6):** Removed **colour** and **category** from the order item display. Items now show variant image, size, quantity, and eligibility status only. *(AI-8)*
- **process-high-level.md (10C, WF-052B):** CX team can now **override part selection** when reviewing a warranty submission — applicable when the customer did not select a part or selected an incorrect part. *(AI-9)*

### Context

- AI-1: The scope description incorrectly implied both offer tiers were automated. Only the 50% keep offer runs through ClaimLane; the 100% donate path remains offline CX.
- AI-2: Law tag is not required for boxed mattress returns; a photo of the box is sufficient.
- AI-3: Proactively offering pickup assistance was expected to significantly increase uptake and warranty pickup costs. CX retains the ability to add it when a customer calls.
- AI-4: Inspection grading gives warehouse data visibility into condition of returned goods for inventory and resale decisions.
- AI-5/6: Sleep Country = STORIS. Exposing Sleep Country as a named channel eliminates the need for a backend store lookup that was not technically feasible. "Shopify Online" references corrected to "WooCommerce Online" throughout.
- AI-7: Phone number retry alternative and support escalation were not implementable as designed.
- AI-8: Colour and category were deemed unnecessary in the item display and removed to simplify the UI.
- AI-9: CX requires the ability to correct part selection on behalf of customers who submit without selecting or with an incorrect part.

---

## 2026-02-18 - US Accessories Scope Change (Opened Items Only)

### Changed
- **functional-requirements.md:** Rewrote FR-34 (US Accessory Return Handling) — removed multi-tier opened/unopened shipping cost logic. Unopened items now always receive a return label. Opened items receive Option 1 (keep for 50% refund); acceptance completes the return. Rejection generates a Customer Care ticket for offline Option 2 (donation).
- **business-rules.md:** Updated BR-23 (scoped to opened items only, removed high-cost unopened qualifier), rewrote BR-24 (Option 2 now offline via CX ticket), superseded BR-25 (shipping cost threshold no longer applicable).
- **process-high-level.md:** Rewrote Section 8C (US Accessories) — removed shipping cost decision for unopened items and direct Option 2 presentation; replaced with simplified flow.
- **epics-user-stories.md:** Updated US-6.3 acceptance criteria — removed shipping cost threshold for unopened items and multi-step Option 1 → Option 2 → decline flow for opened items.

### Context
- The shipping cost decision logic (1/3 of item value threshold) for US accessories was too difficult to determine in practice.
- Decision 1: Remove the 1/3 shipping cost threshold — unopened items always get a return label.
- Decision 2: Remove direct Option 2 (donation) presentation from the portal — when a customer rejects Option 1, a Customer Care ticket is generated. CX contacts the customer offline to encourage Option 2 (donate for full refund).
- If the customer accepts Option 1, they keep the item and receive a 50% refund (return complete).

---

## 2026-02-18 - Third-Party Vendor Integration Restored to Phase 1

### Restored to Phase 1
- **Third-Party Vendor Integration (TSC, EQ3, Costco):** Moved from Phase 2 backlog back to Phase 1 with a fundamentally simplified flow. Instead of the original vendor-approval workflow (which required a core architecture rebuild), the new approach uses **vendor-initiated generic links** with a **Terms & Conditions gate**.

### Added
- **functional-requirements.md:** Added FR-46 (Third-Party Vendor Link Entry), FR-47 (Terms & Conditions Gate), FR-48 (Pickup Details Collection), FR-49 (Third-Party Pickup Logistics).
- **epics-user-stories.md:** Added US-1.5 (Third-Party Vendor Link Entry & Terms Acceptance).
- **scope.md:** Added third-party vendor link-based entry to in-scope processes.

### Changed
- **business-rules.md:** Rewrote BR-1 (Third-Party Orders) — from "block portal entry" to vendor-specific link entry with T&C gate and pickup logistics.
- **functional-requirements.md:** Updated FR-1 (Third-Party no longer uses channel selection), FR-32 (email triggers updated for new flow), FR-36 (superseded by FR-49), FR-39 (third-party refund context updated — no S&S refund).
- **process-high-level.md:** Rewrote entire Section C (Third-Party Vendor Flow) — removed Phase 2 deferral warning, replaced vendor-approval workflow with link-based entry flow.
- **epics-user-stories.md:** Updated US-1.1 (third-party removed from channel selection), US-3.3 (channel eligibility), US-8.4 (pickup logistics rewritten for new flow), US-10.1 (refund routing — no S&S refund for third-party), US-11.1 (email triggers updated).
- **phase-2-backlog.md:** Removed entire Third-Party Vendor Integration section. Updated executive summary, feature counts, quick reference, and extraction log. Renumbered remaining sections.

### Context
- The original Phase 2 deferral was based on the assumption that a full vendor-approval workflow was needed, requiring a core architecture rebuild.
- The new simplified approach: TSC/EQ3/Costco verify the customer's order externally, then share a generic ClaimLane link. The customer accepts T&C (no S&S refund, not authorized by vendor) and provides pickup details. ClaimLane handles pickup logistics only.
- **Costco** orders do not require pickup assistance — ticket created for tracking only.
- **TSC / EQ3** orders follow standard pickup logistics (courier or disposal).
- The generic link is not unique to the customer — the T&C page serves as the security gate.

---

## 2026-02-18 - US Warehouse Routing via Fulfil ERP API

### Added
- **functional-requirements.md:** Added FR-45 (Fulfil API Warehouse Lookup) — new integration with Fulfil ERP API to determine origin warehouse per SKU and closest return warehouse for US orders. Includes warehouse codes (JDLLA, JDLNJ) and addresses.

### Changed
- **business-rules.md:** Updated BR-30 (Furniture Return Destinations) — US returns now routed via Fulfil API with closest-warehouse logic for multi-warehouse orders (Google Maps geocoding).
- **functional-requirements.md:** Updated FR-20 (WF-138 destination) and FR-41 to reference Fulfil API instead of generic "order metadata."
- **process-high-level.md:** Updated WF-138 US Furniture section to reference Fulfil API and closest warehouse logic.
- **epics-user-stories.md:** Updated US-6.2 (furniture acceptance criteria), US-6.5 (region-specific destinations), and US-10.1 (warehouse routing) to reference Fulfil API.
- **scope.md:** Clarified Fulfil ERP API description with origin warehouse per SKU and Google Maps geocoding.

### Context
- Original BRD assumed US returns would go to "original shipping warehouse from order metadata." The Fulfil ERP API (currently under development by internal team) replaces this with a dedicated endpoint that returns the originating warehouse for each SKU.
- For orders shipped from multiple US warehouses, the API calculates the closest return warehouse to the customer's shipping address using Google Maps geocoding.
- US warehouse locations: LA (JDLLA) — 6509 Kimball Ave, Chino, CA 91708; NJ (JDLNJ) — 55 Wildcat Way, Linden, NJ 07036.
- Canada (CA) returns continue to route to Caledonia warehouse (unaffected by this change).

## 2026-02-18 - Vendors (Donation/Pickup Partners) Restored to Phase 1

### Restored to Phase 1
- **Vendors (Donation / Pickup Partners):** Vendor portal access and pickup status updates moved back to Phase 1. With only 6–10 vendors, the scope is manageable and does not require the originally anticipated multi-tenant complexity.

### Changed
- **phase-2-backlog.md:** Removed entire Vendor section (Section 1). Updated executive summary, feature counts, quick reference, and implementation approach. Renumbered remaining sections.
- **actors.md:** Updated Vendors actor description — removed Phase 2 deferral note, clarified vendors have portal access in Phase 1.
- **business-rules.md:** Updated BR-16 to reflect vendor portal access as Phase 1 capability.

### Context
- The original deferral was based on concerns about multi-tenant authentication and data partitioning complexity for a large vendor network.
- With only 6–10 vendors confirmed, the technical complexity is significantly reduced, making Phase 1 inclusion feasible.
- Vendor functional requirements (FR-VENDOR-1 through FR-VENDOR-5) are now covered by existing Phase 1 FRs: FR-20, FR-32, FR-38.
- User stories US-8.1, US-8.2, US-8.3 (Epic 8) already describe full vendor functionality and remain unchanged.
- BR-16 (Vendor Pickup and Status Updates) is now a full Phase 1 business rule.

## 2026-02-13 - Product Onboarding & Removal Feature

### Added
- **functional-requirements.md:** Added FR-42 (Product Onboarding via Excel Upload), FR-43 (Product Removal via soft-delete), FR-44 (Product Configuration Listing). Future state noted: direct sync with WooCommerce/external systems.
- **epics-user-stories.md:** Added Epic 12 — Product Onboarding & Removal with 4 user stories (US-12.1 Excel upload, US-12.2 product removal, US-12.3 product listing view, US-12.4 future direct sync).
- **scope.md:** Added product onboarding/removal to in-scope processes.

### Context
- MVP: Excel upload for new products (SKU, category, fallback weight/dimensions, final sale, replacement parts). Product removal via email request (soft-delete).
- Future State: Direct real-time sync with WooCommerce and external product catalogue systems.

## 2026-02-13 - BRD Duplicate Consolidation

### Changed
- **epics-user-stories.md:** Merged Batch 2 Updates into their original epics. US-6.3, US-8.1, US-10.1 updated in place. US-6.5, US-7.4, US-8.4, US-9.3 moved into their proper epics. Entire "Batch 2 Updates" section removed.
- **phase-2-backlog.md:** Replaced verbatim copies of user stories, business rules, FRs, and process narratives with one-line summaries and cross-references to canonical docs. Merged redundant Overview section into Executive Summary.
- **business-rules.md:** Merged BR-14 into BR-13 (STORIS detection). Merged A-1 and BR-10 into BR-5 (documentation completeness). Removed A-1 from appendix rules.
- **functional-requirements.md:** Removed FR-40 (region-specific furniture destinations) — already covered by FR-20 furniture bullet. Added WF-137/WF-138 references to FR-20.
- **appendices.md:** Updated A-1 reference to point to consolidated BR-5.

### Removed (consolidated, not deleted)
- **BR-14** → merged into BR-13
- **BR-10** → merged into BR-5
- **A-1** → merged into BR-5
- **FR-40** → merged into FR-20
- **Batch 2 Updates section** → stories merged into original epics

## 2026-02-04 - Return Quantity Logic Deferral

### Moved to Phase 2 Backlog
- **Return Quantity Limits:** The restriction preventing selection of more than 2 units (FR-10) and the historical limit rule (BR-4) have been moved to Phase 2 to allow broader returns in Phase 1.

### Changed
- **functional-requirements.md:** Updated FR-10 to remove the 2-unit limit restriction.
- **business-rules.md:** Marked BR-4 as deferred.
- **phase-2-backlog.md:** Added new section "4. Return Quantity Limits" with valid context.

## 2026-02-04 - Furniture Workflow Correction

### Changed
- **Workflow Order Update:** Corrected Furniture Return workflow.
    - **Previous Logic:** Upload -> CX Approve -> Quote -> Label.
    - **New Logic:** Upload -> Quote & Accept Charge -> Submit Ticket -> CX Approve -> Auto-Generate Label.
- **Affected Files:**
    - `process-high-level.md` (Node sequence updated)
    - `functional-requirements.md` (FR-20 updated)
    - `business-rules.md` (BR-17 updated)
    - `epics-user-stories.md` (US-6.2 & US-6.5 updated)
- **Clarification:** Disposal pickups continue to use the same charge as courier rates.

## 2026-02-03 - Vendor Pickup Workflow Automation

### Changed
- **process-high-level.md**: Updated WF-064/063A "Vendor picks up" step to reflect automated status update via Courier API (replacing manual status update).
- **WorkFlowMermaid.mmd**: Updated RL5 node text to "Vendor picks up item; status auto-updated to 'Picked' via Courier API".

## 2026-02-03 - Batch 3: Deep Scope Refinement (Phase 2 Move)

### Added
- **phase-2-backlog.md** — New comprehensive Phase 2 backlog document containing all deferred features with complete context

### Moved to Phase 2 Backlog
- **Vendors (Donation / Pickup Partners):** Vendor portal access and pickup status update capabilities (vendor physical logistics remain in Phase 1 via manual workaround)
- **Third-Party Vendor Integration:** Complete TSC/EQ3/Costco workflow (WF-004→017) — architecture lacks necessary logic for support
- **Phase 2 Refund Logic:** Bundle impact calculations (WF-070→073) — WooCommerce limitations prevent automated bundle proration

### Changed
- **actors.md:** Updated Vendors actor description with Phase 1/Phase 2 split clarification
- **process-high-level.md:** Added Phase 2 deferral warning to Third-Party Vendor Flow section
- **functional-requirements.md:** (No placeholders added — requirements remain documented for future reference)
- **business-rules.md:** (No changes — BR-26 bundle exclusion kept as Phase 1 constraint)
- **epics-user-stories.md:** (No changes — user stories remain for future implementation)

### Extraction Method
- **Functional Items:** Complete requirements, user stories, and business rules copied to backlog with full context
- **Narrative & Actors:** Added inline deferral notes and warning boxes (content not deleted to preserve flow)
- **Supporting Artifacts:** No scope changes (manual workarounds remain in Phase 1)

### Coverage
- **Features Extracted:** 3 major features
- **User Stories Moved:** 7 user stories (Epic 8 components, Epic 4 components, Epic 11 components)
- **Business Rules Documented:** 4 business rules (BR-1, BR-15, BR-16, BR-26)
- **Functional Requirements:** 13 deferred requirements (FR-9, FR-VENDOR-1 through FR-VENDOR-5, FR-TP-1 through FR-TP-5)

## 2026-02-02 - Core Logic Update

### Added
- **9 New Functional Requirements** (FR-33 to FR-41): Defective routing, US accessory abuse prevention, warranty/third-party logistics splits, US warehouse offline process, self-donate fallback, flow routing, region-specific destinations
- **7 New Business Rules** (BR-23 to BR-29): US accessory offers, shipping threshold, bundle exclusion, warranty label wording, US warehouse offline, self-donate mandate
- **2 New Actors**: Internal Ops, US Warehouse Team (LA/NJ)

### Changed
- **FR-12/13**: Defective routing trigger and opt-out
- **FR-20**: Region split (CA→Caledonia, US→Origin), self-donate fallback, 7-flow table
- **FR-23**: Bundle exclusion for auto-refunds
- **FR-32**: Third-party and warranty emails
- **05-process**: Region-specific logistics table, defective routing, bundle constraints, US warehouse workflow
- **04-actors**: Added Internal Ops and US Warehouse Team

### Coverage
- Mapped 50+ workflow nodes (WF-001 to WF-138)
- 9 decision points documented
- 3 warehouse subgraphs covered

### Supporting Docs Update (5 Files)

#### Changed
- **scope.md**: Added 6 in-scope processes (defective routing, US accessory abuse prevention, self-donation fallback, offline US warehouse, region-specific furniture logistics, warranty/third-party pickup splits), added WooCommerce API to systems
- **epics-user-stories.md**: Added 5 new user stories (US-1.4 defective routing, US-6.5 furniture destinations, US-7.4 warranty logistics, US-8.4 third-party logistics, US-9.3 US warehouse), added Epic 11 for email notifications (US-11.1), updated 4 existing stories (US-6.2 WooCommerce API, US-6.3 US accessory logic, US-8.1 self-donate fallback, US-10.1 Refund Context Routing & bundle exclusion)
- **non-functional-requirements.md**: Added NFR-8 for offline workflow reliability with 24-hour SLA for Internal Ops processing
- **overview-purpose.md**: Updated objectives to include region-specific logistics, offline operations, abuse prevention, and defective routing
- **Batch 2 Updates section added**: Comprehensive user story updates documented in separate section for clarity

## [Unreleased]

### Added
- Retail Store Backend Detection (Shopify POS vs STORIS).
- Bundle / Free Item 50% Keep Rule.
- Unboxed Mattress vendor selection and No-Photo rule.
- Furniture return two-step process (CX Pre-approval).
- Caledonia Warehouse limited access role.
- Automatic Refund Threshold (< 600).
- New Actors: Retail Store, Caledonia Team, Store Ops, Return Logistics.

### Changed
- Updated Process Flow Diagram to align with new logic.
- Updated Actors list.
- Updated Business Rules and Functional Requirements to reflect new flows.

---

## Discussion

<div class="giscus-placeholder"></div>
