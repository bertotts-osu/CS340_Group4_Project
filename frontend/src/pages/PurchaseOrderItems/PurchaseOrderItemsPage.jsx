import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  getPurchaseOrderItemsWithMaterialNames,
  createPurchaseOrderItem,
  updatePurchaseOrderItems,
  deletePurchaseOrderItems,
} from "./PurchaseOrderItemsAPI.js";
import { getPurchaseOrderOptions } from "../PurchaseOrders/PurchaseOrdersAPI.js";
import { getMaterialOptions } from "../Materials/MaterialsAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";
/**
 * This file provides the abstract Display Table Container component with all of the particulars specific 
 * to the PurchaseOrderItems entity. It forwards the API functions, the table title, and a template to dicate the content
 * behavior and presentation.
 */

// Template is passed to the Display Table along with the raw data to dicate its format and particular
// cell behavior based on states/modes set by the table container in response to the end user's interaction
// (i.e display, edit, and add). It also enforces regex validations upon submission.
const tableSchemaTemplate = [
  {
    name: "purchase_order_item_id",
    label: "Purchase Order Item",
    editType: "display",
    addType: "display",
  },
  {
    name: "unit_cost",
    label: "Unit Cost",
    editType: "number",
    addType: "number",
    min: "0.00",
    max: "9999999999.99",
    step: "0.01",
    required: true
  },
  {
    name: "quantity",
    label: "Quantity",
    editType: "number",
    addType: "number",
    min: "1",
    step: "1",
    required: true
  },
  {
    name: "estimated_delivery_date",
    label: "Estimated Delivery",
    editType: "date",
    addType: "date",
    required: false
  },
  {
    name: "delivery_type",
    label: "Delivery Type",
    editType: "dropdown",
    addType: "dropdown",
    options: [
      {display: "Ship"},
      {display: "Stock"},
    ],
    required: true
  },
  {
    name: "purchase_order_id",
    label: "Purchase Order",
    editType: "dropdown",
    addType: "dropdown",
    fetchOptions: true, //options to be fetched from API
    required: true,
  },
  {
    name: "material_id",
    exclude: true
  },
  {
    name: "material_name",
    label: "Material",
    editType: "dropdown",
    addType: "dropdown",
    fetchOptions: true,  //options to be fetched from API
    required: true
  },
];

const PurchaseOrderItemsPage = () => {
  const [contentSchema, setContentSchema] = useState(tableSchemaTemplate);

  // Set tab name
  useEffect(() => {
    document.title = "LeavesFree Eaves - Purchase Order Items";
  }, []);
  
  // Fetch Dropdown options
  const { data: materialOptions } = useQuery({
    queryKey: ["materialOptions"],
    queryFn: getMaterialOptions,
  });

  const { data: purchaseOrderOptions } = useQuery({
    queryKey: ["purchaseOrderOptions"],
    queryFn: getPurchaseOrderOptions,
  });

  // Update the template with the dropdown options
  useEffect(() => {
    if (materialOptions && purchaseOrderOptions) {
      setContentSchema( contentSchema =>
        contentSchema.map((field) => {
          if (field.fetchOptions) {
            if (field.label === "Material") {
              return { ...field, options: materialOptions };
            } else if (field.label === "Purchase Order") {
              return { ...field, options: purchaseOrderOptions };
            }
          }
          return field;
        })
      );
    }
  }, [materialOptions, purchaseOrderOptions]);

  return (
    <DisplayTableContainer
      className={style.container}
      headerText={"Purchase Order Items"}
      contentSchema={contentSchema}
      fetchAPI={getPurchaseOrderItemsWithMaterialNames}
      createAPI={createPurchaseOrderItem}
      updateAPI={updatePurchaseOrderItems}
      deleteAPI={deletePurchaseOrderItems}
    />
  );
};
export default PurchaseOrderItemsPage;