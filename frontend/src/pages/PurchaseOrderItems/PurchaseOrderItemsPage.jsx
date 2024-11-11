import { useEffect } from "react";
import { 
  getPurchaseOrderItems,
  createPurchaseOrderItem,
  updatePurchaseOrderItems,
  deletePurchaseOrderItems,
} from "./PurchaseOrderItemsAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";

// Input form schema
const createSchemaTemplate = {
  fields: [
    { label: "Unit Cost", type: "text" },
    { label: "Quantity", type: "text" },
    { label: "Estimated Delivery Date", type: "text" },
    {
      label: "Delivery Type",
      type: "dropdown",
      options: ["Stock", "Ship"],
    },
    {
      label: "Material",
      type: "dropdown",
      options: ["Option 1 - pull from db", "Option 2 - pull from db"],
    },
  ],
};

// Schema that maps which input fields should be used for particular columns when editing
const editSchemaTemplate = [
  {
    key: "Work Order",
    type: "uneditable",
  },
  {
    key: "Employee Name",
    type: "uneditable",
  },
];

const PurchaseOrderItemsPage = () => {


  // Set tab name
  useEffect(() => {
    document.title = "LeavesFree Eaves - Purchase Order Items";
  }, []);

  return (
    <DisplayTableContainer
      className={style.container}
      headerText={"Purchase Order Items"}
      createSchema={createSchemaTemplate}
      editSchema={editSchemaTemplate}
      fetchAPI={getPurchaseOrderItems}
      createAPI={createPurchaseOrderItem}
      updateAPI={updatePurchaseOrderItems}
      deleteAPI={deletePurchaseOrderItems}
    />
  );
};
export default PurchaseOrderItemsPage;