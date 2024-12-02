import axios from "axios";
import { HEADERS } from "../config.js";
import { getMaterialOptions } from "../Materials/MaterialsAPI.js";

const path = "/purchase-order-items";

export async function getPurchaseOrderItems() {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}${path}`,
    { headers:  HEADERS}
  );
  return response.data;
}

export async function createPurchaseOrderItem(entry) {
  const materials = await getMaterialOptions();

  // generate material id/name map
  const materialMap = materials.reduce((acc, material) => {
    acc[material.display] = material.value;
    return acc;
  }, {});

    // add material_id as an attribute and remove material_name
    const updatedRow = {
      ...entry,
      material_id: materialMap[entry.material_name],
    };
    delete updatedRow.material_name;

  // send the http post request
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}${path}`,
    updatedRow,
    { headers: { HEADERS } }
  );
  return response.data;
}

export async function updatePurchaseOrderItems(changes) {
  const materials = await getMaterialOptions();

  // generate material name/id map
  const materialMap = materials.reduce((acc, material) => {
    acc[material.display] = material.value;
    return acc;
  }, {});

  const promises = changes.map((row) => {
    // set the material_id attribute based on the material name
    const updatedRow = {
      ...row,
      material_id: materialMap[row.material_name],
    };
    return axios.put(
      `${import.meta.env.VITE_API_URL}${path}`,
      updatedRow,
      { headers: HEADERS }
    );
  });

  const results = await Promise.allSettled(promises);
  const successes = results.filter(result => result.status === 'fulfilled').map(result => result.value.data); 
  const errors = results.filter(result => result.status === 'rejected').map(result => result.reason); 
  return { successes, errors };
}

export async function deletePurchaseOrderItems(entries) {
  const promises = entries.map((entry) => {
    const url = `${
      import.meta.env.VITE_API_URL
    }${path}?purchase_order_item_id=${entry.purchase_order_item_id}`;
    return axios.delete(url, {
      headers: { HEADERS },
    });
  });

  const results = await Promise.allSettled(promises);
  const successes = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value.data);
  const errors = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.value.data);
  return { successes, errors };
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