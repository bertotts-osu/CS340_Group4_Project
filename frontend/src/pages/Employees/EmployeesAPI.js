import axios from "axios";

export async function getEmployees() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/employees`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function createEmployee(formData) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/employees`,
    formData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function updateEmployees(changes) {

  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/employees`,
    changes,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function deleteEmployees(entries) {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/employees`,
    {
      headers: { "Content-Type": "application/json" },
      data: entries,
    }
  );
  return response.data;
}

export async function getEmployeeNameOptions() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/employee-names`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}