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

const tableSchemaTemplate = [
  {
    name: "purchase_order_item_id",
    label: "Purchase Order Item ID",
    editType: "display",
    addType: "display",
  },
  {
    name: "unit_cost",
    label: "Unit Cost",
    editType: "text",
    addType: "text",
    required: true,
    invalid: false,
  },
  {
    name: "quantity",
    label: "Quantity",
    editType: "text",
    addType: "text",
    required: true,
    invalid: false,
  },
  {
    name: "estimated_delivery_date",
    label: "Estimated Delivery",
    editType: "date",
    addType: "date",
    required: true,
    invalid: false,
  },
  {
    name: "delivery_type",
    label: "Delivery Type",
    editType: "dropdown",
    addType: "dropdown",
    options: [
      {display: "Ship"},
      {display: "Stock"},
    ]
  },
  {
    name: "purchase_order_id",
    label: "Purchase Order ID",
    editType: "dropdown",
    addType: "dropdown",
    fetchOptions: true, //options to be fetched from API
    required: true,
    invalid: false,
  },
  {
    name: "material_id",
    exclude: true,
  },
  {
    name: "material_name",
    label: "Material",
    editType: "dropdown",
    addType: "dropdown",
    fetchOptions: true,  //options to be fetched from API
    required: true,
    invalid: false,
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
    queryKey: ["mterialOptions"],
    queryFn: getMaterialOptions,
  });

  const { data: purchaseOrderOptions } = useQuery({
    queryKey: ["workOrderOpurchaseOrderOptionsptions"],
    queryFn: getPurchaseOrderOptions,
  });

  // Update the table data schemas
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