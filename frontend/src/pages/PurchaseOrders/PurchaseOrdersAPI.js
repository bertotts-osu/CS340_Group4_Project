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

export async function getEmployeeNameOptions() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/employee-names`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function getWorkOrderOptions() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/work-order-list`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}