export const WorkOrderColumns = {
  work_order_id: "Work Order ID",
  size: "Size",
  street: "Street",
  city: "City",
  state: "State",
  zip: "Zip",
  stage: "Stage",
  applied_at: "Applied At",
  estimated_at: "Estimated At",
  scheduled_at: "Scheduled At",
  started_at: "Started At",
  completed_at: "Completed At",
  on_hold_at: "On Hold At",
  canceled_at: "Canceled At",
};

export const EmployeeColumns = {
  employee_id: "Employee ID",
  first_name: "First Name",
  last_name: "Last Name",
  email: "Email",
  phone_number: "Phone Number",
  status: "Status",
  skill_level: "Skill Level",
};

export const WorkOrderEmployeeColumns = {
  work_order_id: "Work Order ID",
  employee_id: "Employee ID",
  assigned_at: "Assigned At",
};

export const PurchaseOrderColumns = {
  purchase_order_id: "Purchase Order ID",
  created_at: "Created At",
  employee_id: "Employee ID",
  work_order_id: "Work Order ID",
};

export const PurchaseOrderItemColumns = {
  purchase_order_item_id: "Purchase Order Item ID",
  unit_cost: "Unit Cost",
  quantity: "Quantity",
  estimated_delivery_date: "Estimated Delivery Date",
  delivery_type: "Delivery Type",
  purchase_order_id: "Purchase Order ID",
  material_id: "Material ID",
};

export const MaterialColumns = {
  material_id: "Material ID",
  name: "Name",
  unit: "Unit",
  unit_cost: "Unit Cost",
  quantity_available: "Quantity Available",
};