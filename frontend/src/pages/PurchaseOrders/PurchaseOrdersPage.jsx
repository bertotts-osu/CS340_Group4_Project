import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getPurchaseOrdersWithEmployeeNames,
  createPurchaseOrder,
  updatePurchaseOrders,
  deletePurchaseOrders,
} from "./PurchaseOrdersAPI.js";
import { getEmployeeNameOptions } from "../Employees/EmployeesAPI.js";
import { getWorkOrderOptions } from "../WorkOrders/WorkOrdersAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";

const tableSchemaTemplate = [
  {
    name: "purchase_order_id",
    label: "Purchase Order ID",
    editType: "display",
    addType: "display",
  },
  {
    name: "created_at",
    label: "Created At",
    editType: "datetime-local",
    addType: "datetime-local",
    required: true
  },
  {
    name: "employee_id",
    exclude: true,
  },
  {
    name: "employee_name",
    label: "Employee",
    editType: "dropdown",
    addType: "dropdown",
    fetchOptions: true, //options to be fetched from API
    defaultValue: "",
    required: true
  },
  {
    name: "work_order_id",
    label: "Work Order",
    editType: "dropdown",
    addType: "dropdown",
    fetchOptions: true, //options to be fetched from API
    required: false
  },
];

const PurchaseOrdersPage = () => {
  const [contentSchema, setContentSchema] = useState(tableSchemaTemplate);

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
      setContentSchema( contentSchema =>
        contentSchema.map((field) => {
          if (field.fetchOptions) {
            if (field.label === "Employee") {
              return { ...field, options: employeeNameOptions };
            } else if (field.label === "Work Order") {
              return { ...field, options: workOrderOptions };
            }
          }
          return field;
        })
      );
    }
  }, [employeeNameOptions, workOrderOptions]);

  return (
    <DisplayTableContainer
      className={style.container}
      headerText={"Purchase Orders"}
      contentSchema={contentSchema}
      fetchAPI={getPurchaseOrdersWithEmployeeNames}
      createAPI={createPurchaseOrder}
      updateAPI={updatePurchaseOrders}
      deleteAPI={deletePurchaseOrders}
    />
  );
};
export default PurchaseOrdersPage;