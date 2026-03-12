# Non Functional Requirements

- **NFR-1 – Security:** Enforce strict order lookup security so that a customer cannot access order details unless both email and order number match exactly. Leading/trailing spaces are trimmed from the email field only; the order number field is not sanitized. Store documentation securely.

- **NFR-2 – Availability & Reliability:** Maintain high availability of the portal. External API calls (label generation, refund processing) do **not** include automatic retry logic — errors are surfaced to the user with clear error messages. Ticket creation is not dependent on external API availability. Gracefully handle carrier or gateway downtime with user-facing error messages.

- **NFR-3 – Performance:** Order lookup, item display and label generation should respond within acceptable user experience thresholds (target: < 2 seconds for lookups, < 5 seconds for labels) under normal load. **Note:** Actual performance is dependent on WooCommerce API response times, which may be a bottleneck. Performance will be monitored post-launch and WooCommerce optimizations applied if needed.

- **NFR-4 – Compliance & Data Privacy:** Adhere to privacy regulations (e.g., PIPEDA, GDPR) by limiting data collection to necessary information and providing clear privacy notices. Retain documentation only for the duration needed to process claims.

- **NFR-5 – Maintainability & Configurability:** Business rules (return windows, warranty periods, reasons mapping, documentation requirements) should be configurable without code changes. The system should support updates to product categories and policies.

- **NFR-6 – Audit & Logging:** Record all key actions (order lookup, item selection, documentation uploads, label generation, refunds) with timestamps for auditability. Capture error messages and API responses for troubleshooting.

- **NFR-7 – Scalability:** Design the portal and integrations to handle peak return volumes (e.g., seasonal spikes) without degradation of service.

- **NFR-8 – Offline Workflow Reliability:** For US warehouse operations (LA/NJ) that rely on email-based status updates, Internal Ops must process warehouse email notifications within 24 business hours to prevent customer inquiry escalation.

---

## Discussion

<div class="giscus-placeholder"></div>
