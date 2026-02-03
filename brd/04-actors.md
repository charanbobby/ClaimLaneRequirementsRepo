# Actors


## Customers and Retail

| Actor                     | Description                                                                                                       |
|---------------------------|-------------------------------------------------------------------------------------------------------------------|
| Customer                  | End user initiating a return, refund, or warranty claim through the portal.                                      |
| Retail Store (Shopify POS)| Physical stores whose transactions are recorded in Shopify; customers may initiate returns in the portal, with refunds handled per store rules. |
| Retail Store (STORIS)    | Non-Shopify retail locations; customers must reach out to Sleep Country Customer Care team for returns. |

## Systems

| Actor              | Description                                                                                                              |
|--------------------|--------------------------------------------------------------------------------------------------------------------------|
| Claimlane Portal   | Web-based interface guiding the customer through each step, applying eligibility rules, documentation requirements, and triggering backend actions. |
| WooCommerce System | Backend e-commerce system for orders, item details, inventory adjustments, refunds, and replacement order creation.      |
| Shipping Carrier API | External shipping providers (e.g., FedEx, WooCommerce, freight services) used to generate return labels or arrange pickups. |

## Customer Service and Operations

| Actor                    | Description                                                                                                       |
|--------------------------|-------------------------------------------------------------------------------------------------------------------|
| Customer Service (CS) Agents | Review claims, validate documentation, perform manual refunds, manage exceptions, and override rules where permitted. |
| Internal Ops             | Processes US warehouse email notifications and manually updates return statuses in the portal for US returns (LA/NJ warehouses). Runs "Returned items" reports for US inventory reconciliation. |
| Caledonia Warehouse Team | Canadian warehouse team receiving physical returns and updating item condition/status using a limited-access role in the portal. |
| US Warehouse Team (LA / NJ) | US warehouse teams (Los Angeles and New Jersey) that receive physical returns and email status updates to Internal Ops. These teams do not have direct portal access; all status updates are processed offline via email. |
| Store Operations (Store Ops) | Team that runs “Returned items” reports from the portal to update inventory and reconcile returned goods.      |
| Return Logistics Team    | Internal team selecting donation/pickup vendors for unboxed mattresses or oversized items, managing vendor changes, triggering updated notifications, and offering self-donation options when no vendor is available. |

## External Partners

| Actor                           | Description                                                                                                  |
|---------------------------------|--------------------------------------------------------------------------------------------------------------|
| Vendors (Donation / Pickup Partners) | External partners that collect unboxed mattresses, oversized items, or donations and update pickup status within the portal where applicable. |

## Governance and Quality

| Actor               | Description                                                                                          |
|---------------------|------------------------------------------------------------------------------------------------------|
| UX Team      | Provides business-approved messaging and copy for reasons, instructions, and customer-facing content.|
| Quality Assurance (QA) Testers | Validate portal functionality, eligibility logic, documentation rules, and end-to-end flows against the defined requirements and acceptance criteria. |

---

## Discussion

> 💬 **Comments for this page are available in Giscus.**  
> Once Giscus is configured, the discussion thread for this page will appear here.

<div class="giscus-placeholder"></div>


 

  
 
 
 
 
