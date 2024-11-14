import axios from "axios";

export async function getPurchaseOrders() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/purchase-orders`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function createPurchaseOrder(formData) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/purchase-orders`,
    formData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function updatePurchaseOrders(changes) {
  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/purchase-orders`,
    changes,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function deletePurchaseOrders(entries) {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/purchase-orders`,
    {
      headers: { "Content-Type": "application/json" },
      data: entries,
    }
  );
  return response.data;
}

export async function getPurchaseOrdersWithEmployeeNames() {
  const employees = await getEmployeeNameOptions();
  const purchaseOrders = await getPurchaseOrders();

  // generate an employee id/name map
  const employeeMap = employees.reduce((acc, employee) => {
    acc[employee.value] = employee.display;
    return acc;
  }, {});

  // add the employee_name as an attribute to WorkOrderEmployee
  return purchaseOrders.map((row) => {
    return {
      ...row,
      employee_name: employeeMap[row.employee_id] || "Unknown",
    };
  });
}

export async function getEmployeeNameOptions() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/employees`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data.map((employee) => {
    return {
      value: employee.employee_id,
      display: employee.first_name + " " + employee.last_name,
    };
  });
}

export async function getWorkOrderOptions() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/work-orders`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data.map((workOrder) => {
    return {
      value: workOrder.work_order_id,
      display: workOrder.work_order_id,
    };
  });
}