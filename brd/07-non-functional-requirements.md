# Non Functional Requirements

- **NFR-1 – Security:** Enforce strict order lookup security so that a customer cannot access order details unless both email and order number match exactly. Sanitize all user inputs and store documentation securely.

- **NFR-2 – Availability & Reliability:** Maintain high availability of the portal and integrate retry logic for external API calls (labels, refunds, ticket creation). Gracefully handle carrier or gateway downtime with user messages and fallback instructions.

- **NFR-3 – Performance:** Order lookup, item display and label generation should respond within acceptable user experience thresholds (e.g., < 2 seconds for lookups, < 5 seconds for labels) under normal load.

- **NFR-4 – Compliance & Data Privacy:** Adhere to privacy regulations (e.g., PIPEDA, GDPR) by limiting data collection to necessary information and providing clear privacy notices. Retain documentation only for the duration needed to process claims.

- **NFR-5 – Maintainability & Configurability:** Business rules (return windows, warranty periods, reasons mapping, documentation requirements) should be configurable without code changes. The system should support updates to product categories and policies.

- **NFR-6 – Audit & Logging:** Record all key actions (order lookup, item selection, documentation uploads, label generation, refunds) with timestamps for auditability. Capture error messages and API responses for troubleshooting.

- **NFR-7 – Scalability:** Design the portal and integrations to handle peak return volumes (e.g., seasonal spikes) without degradation of service.

---

## Discussion

> 💬 **Comments for this page are available in Giscus.**  
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>

