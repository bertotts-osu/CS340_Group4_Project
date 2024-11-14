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

export async function getMaterialOptions() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/materials`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data.map((material) => {
    return {
      value: material.material_id,
      display: material.name,
    };
  });
}

export async function getPurchaseOrderOptions() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/purchase-orders`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data.map((purchaseOrder) => {
    return {
      value: purchaseOrder.purchase_order_id,
      display: purchaseOrder.purchase_order_id,
    };
  });
}

export async function getPurchaseOrderItemsWithMaterialNames() {
  const materials = await getMaterialOptions();
  const poItems = await getPurchaseOrderItems();

  // generate material id/name map
  const materialMap = materials.reduce((acc, material) => {
    acc[material.value] = material.display;
    return acc;
  }, {});

  // add the material name as an attribute to poItems
  return poItems.map((row) => {
    return {
      ...row,
      material_name: materialMap[row.material_id] || "Unknown",
    };
  });
}