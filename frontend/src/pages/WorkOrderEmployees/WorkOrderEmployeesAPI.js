import axios from "axios";

export async function getWorkOrderEmployees() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/work-order-employees`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function createWorkOrderEmployee(formData) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/work-order-employees`,
    formData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function updateWorkOrderEmployees(changes) {

  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/work-order-employees`,
    changes,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function deleteWorkOrderEmployees(entries) {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/work-order-employees`,
    {
      headers: { "Content-Type": "application/json" },
      data: entries,
    }
  );
  return response.data;
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
      display: employee.first_name + ' ' + employee.last_name
    }
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
      display: workOrder.work_order_id
    }
  });
}