# Identified Gaps and Potential Conflicts

| ID | Gap or Conflict                | Resolution Required |
|----|--------------------------------|----------------------|
| 1  | Portal Reset/Cancellation      | A dedicated "Start Over" button is needed for user experience, overriding the current requirement to refresh the browser (SCR-03, Issue 3). This must be elevated to a mandatory UX feature (FR-26). |
| 2  | Messaging Specificity          | Error and eligibility messages must be refined by Marketing to include dynamic, specific product and status information (e.g., returns vs. claims, per product category) to address tester feedback (Issue 9). |
| 3  | French Localization            | Clarification is needed on the launch availability of French localization and the process for managing outstanding translation tasks (e.g., privacy notice, product names, reason lists). |
| 4  | Documentation Validation       | QA must define clear criteria for validating uploaded documentation required by Business Rule BR-10, including acceptable photo resolution, file size, clarity and measurement correctness. |
| 5  | Duplicate Ticket Window        | Business must specify the duration of the "short window" defined in BR-7 to prevent duplicate tickets and avoid customer confusion during multiple request submissions. |
| 6  | Gift & Bundle Logic            | Clear pricing rules are required to define how deductions are calculated for free gifts that are not returned, and how prorated bundle pricing applies, for accurate implementation and testing. |
| 7  | Vendor Approval Process        | The workflow for vendor review, approval notification and escalation for unboxed mattresses or unpackaged furniture must be fully detailed, including a process diagram and Service Level Agreement (SLA). |
| 8  | Shipping Provider Decision     | The choice of carrier API must be finalized immediately, as it impacts several requirements related to box limits, label format and pickup options. |
| 9  | POS Integration Scope          | Clarity is needed on the extent of Point-of-Sale (POS) integration at launch. The current scope excludes full automation but mentions POS-dependent features like order lookup and label generation. |
| 10 | Donation Path Automation       | The process for offering and processing the mattress donation path must be defined, including requirements for donation partners, geographic availability and confirmation steps. |
