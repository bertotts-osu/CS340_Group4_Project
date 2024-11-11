import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getPurchaseOrders,
  getEmployeeNameOptions,
  getWorkOrderOptions,
  createPurchaseOrder,
  updatePurchaseOrders,
  deletePurchaseOrders,
} from "./PurchaseOrdersAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";


// Input form schema
const createSchemaTemplate = {
  fields: [
    {
      label: "Employee",
      type: "dropdown",
      options: ["Option 1 - pull from db", "Option 2 - pull from db"],
    },
    {
      label: "Work Order ID",
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

const PurchaseOrdersPage = () => {
  const [createSchema, setCreateSchema] = useState(createSchemaTemplate);
  const [editSchema, setEditSchema] = useState(editSchemaTemplate);

  // Set tab name
  useEffect(() => {
    document.title = "LeavesFree Eaves - Purchase Orders";
  }, []);

// Fetch Dropdown options
const { data: employeeNameOptions } = useQuery({
  queryKey: ["employeeNameOptions"],
  queryFn: getEmployeeNameOptions,
});

const { data: workOrderOptions } = useQuery({
  queryKey: ["workOrderOptions"],
  queryFn: getWorkOrderOptions,
});

// Update the table data schemas
useEffect(() => {
  if (employeeNameOptions && workOrderOptions) {
    setCreateSchema({
      ...createSchemaTemplate,
      fields: createSchemaTemplate.fields.map((field) => {
        if (field.fetchOptions && field.label === "Employee Name") {
          return { ...field, options: employeeNameOptions };
        } else if (field.fetchOptions && field.label === "Work Order") {
          return { ...field, options: workOrderOptions };
        }
        return field;
      }),
    });
    setEditSchema(
      editSchemaTemplate.map((field) => {
        if (field.fetchOptions && field.label === "Employee Name") {
          return { ...field, options: employeeNameOptions };
        } else if (field.fetchOptions && field.label === "Work Order") {
          return { ...field, options: workOrderOptions };
        }
        return field;
      })
    );
    console;
  }
}, [employeeNameOptions, workOrderOptions]);

  return (
    <DisplayTableContainer
      className={style.container}
      headerText={"Purchase Orders"}
      createSchema={createSchema}
      editSchema={editSchema}
      fetchAPI={getPurchaseOrders}
      createAPI={createPurchaseOrder}
      updateAPI={updatePurchaseOrders}
      deleteAPI={deletePurchaseOrders}
    />
  );
};
export default PurchaseOrdersPage;