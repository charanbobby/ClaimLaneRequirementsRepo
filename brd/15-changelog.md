# Changelog

All notable changes to this project will be documented in this file.

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

