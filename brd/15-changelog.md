# Changelog

All notable changes to this project will be documented in this file.

## 2026-02-03 - Vendor Pickup Workflow Automation

### Changed
- **05-process-high-level.md**: Updated WF-064/063A "Vendor picks up" step to reflect automated status update via Courier API (replacing manual status update).
- **WorkFlowMermaid.mmd**: Updated RL5 node text to "Vendor picks up item; status auto-updated to 'Picked' via Courier API".

## 2026-02-03 - Batch 3: Deep Scope Refinement (Phase 2 Move)

### Added
- **15-phase-2-backlog.md** — New comprehensive Phase 2 backlog document containing all deferred features with complete context

### Moved to Phase 2 Backlog
- **Vendors (Donation / Pickup Partners):** Vendor portal access and pickup status update capabilities (vendor physical logistics remain in Phase 1 via manual workaround)
- **Third-Party Vendor Integration:** Complete TSC/EQ3/Costco workflow (WF-004→017) — architecture lacks necessary logic for support
- **Phase 2 Refund Logic:** Bundle impact calculations (WF-070→073) — WooCommerce limitations prevent automated bundle proration

### Changed
- **04-actors.md:** Updated Vendors actor description with Phase 1/Phase 2 split clarification
- **05-process-high-level.md:** Added Phase 2 deferral warning to Third-Party Vendor Flow section
- **06-functional-requirements.md:** (No placeholders added — requirements remain documented for future reference)
- **08-business-rules.md:** (No changes — BR-26 bundle exclusion kept as Phase 1 constraint)
- **13-epics-user-stories.md:** (No changes — user stories remain for future implementation)

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
- **03-scope.md**: Added 6 in-scope processes (defective routing, US accessory abuse prevention, self-donation fallback, offline US warehouse, region-specific furniture logistics, warranty/third-party pickup splits), added WooCommerce API to systems
- **13-epics-user-stories.md**: Added 5 new user stories (US-1.4 defective routing, US-6.5 furniture destinations, US-7.4 warranty logistics, US-8.4 third-party logistics, US-9.3 US warehouse), added Epic 11 for email notifications (US-11.1), updated 4 existing stories (US-6.2 WooCommerce API, US-6.3 US accessory logic, US-8.1 self-donate fallback, US-10.1 RecRouter & bundle exclusion)
- **07-non-functional-requirements.md**: Added NFR-8 for offline workflow reliability with 24-hour SLA for Internal Ops processing
- **02-overview-purpose.md**: Updated objectives to include region-specific logistics, offline operations, abuse prevention, and defective routing
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

> 💬 **Comments for this page are available in Giscus.**  
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>

