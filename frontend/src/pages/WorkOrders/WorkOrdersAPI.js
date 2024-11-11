import axios from "axios";

export async function getWorkOrders() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/work-orders`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function createWorkOrder(formData) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/work-orders`,
    formData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function updateWorkOrders(changes) {

  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/work-orders`,
    changes,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function deleteWorkOrders(entries) {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/work-orders`,
    {
      headers: { "Content-Type": "application/json" },
      data: entries,
    }
  );
  return response.data;
}

export async function getStageOptions() {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/stages`);
  return response.data;
}