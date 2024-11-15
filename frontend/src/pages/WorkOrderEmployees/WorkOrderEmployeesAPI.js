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

export async function createWorkOrderEmployee(entries) {
  const employees = await getEmployeeNameOptions();

  // Generate an employee name/id map
  const employeeMap = employees.reduce((acc, employee) => {
    acc[employee.display] = employee.value;
    return acc;
  }, {});

  const promises = entries.map((entry) => {
    const updatedRow = {
      ...entry,
      employee_id: employeeMap[entry.employee_name], // add employee_id as an attribute
    };
    delete updatedRow.employee_name; //remove employee_name attribute
    return axios.post(
      `${import.meta.env.VITE_API_URL}/work-order-employees`,
      updatedRow,
      { headers: { "Content-Type": "application/json" } }
    );
  });
  try {
    const responses = await Promise.all(promises);
    return responses.map((response) => response.data);
  } catch (error) {
    console.error("Error creating work order employee:", error);
    throw error;
  }
}

export async function updateWorkOrderEmployees(changes) {
  const promises = changes.map((row) => {
    return axios.put(
      `${import.meta.env.VITE_API_URL}/work-order-employees`,
      row,
      { headers: { "Content-Type": "application/json" } }
    );
  });

  const results = await Promise.allSettled(promises);
  const successes = results.filter(result => result.status === 'fulfilled').map(result => result.value.data); 
  const errors = results.filter(result => result.status === 'rejected').map(result => result.reason); 
  return { successes, errors };
}

export async function deleteWorkOrderEmployees(entries) {
  const promises = entries.map((entry) => {
    const url = `${import.meta.env.VITE_API_URL}/work-order-employees?work_order_id=${entry.work_order_id}&employee_id=${entry.employee_id}`;
    return axios.delete(url, {
      headers: { "Content-Type": "application/json" },
    });
  });

const results = await Promise.allSettled(promises);
const successes = results.filter(result => result.status === 'fulfilled').map(result => result.value.data); 
const errors = results.filter(result => result.status === 'rejected').map(result => result.reason); 
return { successes, errors };
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
