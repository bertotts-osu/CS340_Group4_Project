-- PROJECT Group 4
-- Stephen Bertotti and David Kazarian
-- Note: Values pre-fixed with : indicate variables to be set at runtime by the backend programming language. 


-- Fetch all WorkOrders.
SELECT * FROM WorkOrders;

-- Create a new WorkOrder.
INSERT INTO WorkOrders (size, street, city, state, zip, stage, applied_at, estimated_at, scheduled_at, started_at, completed_at, on_hold_at, canceled_at) 
VALUES (:size, :street, :city, :state, :zip, :stage, :applied_at, :estimated_at, :scheduled_at, :started_at, :completed_at, :on_hold_at, :canceled_at);



-- Fetch all Employees.
SELECT * FROM Employees;

-- Create a new Employee.
INSERT INTO Employees (first_name, last_name, email, phone_number, status, skill_level) 
VALUES (:first_name, :last_name, :email, :phone_number, :status, :skill_level);



-- Fetch all WorkOrderEmployees.
SELECT * FROM WorkOrderEmployees;

-- Create a new WorkOrderEmployee association.
INSERT INTO WorkOrderEmployees (work_order_id, employee_id, assigned_at) 
VALUES (:work_order_id, :employee_id, :assigned_at);

-- Update a WorkOrderEmployee association.
UPDATE WorkOrderEmployees 
SET assigned_at = :assigned_at 
WHERE work_order_id = :work_order_id AND employee_id = :employee_id;

-- Delete a WorkOrderEmployee association.
DELETE FROM WorkOrderEmployees 
WHERE work_order_id = :work_order_id AND employee_id = :employee_id;



-- Fetch all PurchaseOrders.
SELECT * FROM PurchaseOrders;

-- Create a new PurchaseOrder.
INSERT INTO PurchaseOrders (created_at, employee_id, work_order_id) 
VALUES (:created_at, :employee_id, :work_order_id);

-- Update a PurchaseOrder.
UPDATE PurchaseOrders 
SET created_at = :created_at, employee_id = :employee_id, work_order_id = :work_order_id 
WHERE purchase_order_id = :purchase_order_id;

-- Delete a PurchaseOrder.
DELETE FROM PurchaseOrders 
WHERE purchase_order_id = :purchase_order_id;



-- Fetch all PurchaseOrderItems.
SELECT * FROM PurchaseOrderItems;

-- Create a new PurchaseOrderItem.
INSERT INTO PurchaseOrderItems (unit_cost, quantity, estimated_delivery_date, delivery_type, purchase_order_id, material_id) 
VALUES (:unit_cost, :quantity, :estimated_delivery_date, :delivery_type, :purchase_order_id, :material_id);



-- Fetch all Materials.
SELECT * FROM Materials;

-- Create a new Material.
INSERT INTO Materials (name, unit, unit_cost, quantity_available) 
VALUES (:name, :unit, :unit_cost, :quantity_available);
