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

export async function createWorkOrderEmployee(rows) {
  const employees = await getEmployeeNameOptions();

  // Generate an employee name/id map
  const employeeMap = employees.reduce((acc, employee) => {
    acc[employee.display] = employee.value;
    return acc;
  }, {});

  // Process each row in the array and post individually
  for (const row of rows) {
    const updatedRow = {
      ...row,
      employee_id: employeeMap[row.employee_name], // add employee_id as an attribute
    };
    delete updatedRow.employee_name; //remove employee_name attribute

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/work-order-employees`,
      updatedRow,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  }
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

export async function getWorkOrderEmployeesWithNames() {
  const employees = await getEmployeeNameOptions();
  const workOrderEmployees = await getWorkOrderEmployees();

  // generate an employee id/name map
  const employeeMap = employees.reduce((acc, employee) => {
    acc[employee.value] = employee.display;
    return acc;
  }, {});

  // add the employee_name as an attribute to WorkOrderEmployee
  return workOrderEmployees.map((row) => {
    return {
      ...row,
      employee_name: employeeMap[row.employee_id] || "Unknown",
    };
  });
}