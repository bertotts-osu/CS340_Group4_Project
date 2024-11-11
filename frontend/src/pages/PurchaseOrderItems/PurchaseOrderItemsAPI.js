import axios from "axios";

export async function getPurchaseOrderItems() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/purchase-order-items`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function createPurchaseOrderItem(formData) {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/purchase-order-items`,
    formData,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function updatePurchaseOrderItems(changes) {

  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/purchase-order-items`,
    changes,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
}

export async function deletePurchaseOrderItems(entries) {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/purchase-order-items`,
    {
      headers: { "Content-Type": "application/json" },
      data: entries,
    }
  );
  return response.data;
}