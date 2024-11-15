import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getWorkOrderEmployeesWithNames,
  createWorkOrderEmployee,
  updateWorkOrderEmployees,
  deleteWorkOrderEmployees,
} from "./WorkOrderEmployeesAPI.js";
import { getEmployeeNameOptions } from "../Employees/EmployeesAPI.js";
import { getWorkOrderOptions } from "../WorkOrders/WorkOrdersAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";

const tableSchemaTemplate = [
  {
    name: "work_order_id",
    label: "Work Order",
    editType: "display",
    addType: "dropdown",
    fetchOptions: true, //options to be fetched from API
    required: true,
    invalid: false,
  },
  {
    name: "employee_id",
    exclude: true,
  },
  {
    name: "employee_name",
    label: "Employee Name",
    editType: "display",
    addType: "dropdown",
    fetchOptions: true, //options to be fetched from API
    required: true,
    invalid: false,
  },
  {
    name: "assigned_at",
    label: "Assigned",
    editType: "datetime-local",
    addType: "datetime-local",
    required: true,
    invalid: false,
  },
];


const WorkOrderEmployeesPage = () => {
  const [contentSchema, setContentSchema] = useState(tableSchemaTemplate);

  // Set tab name
  useEffect(() => {
    document.title = "LeavesFree Eaves - Work Order Employees";
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
            if (field.label === "Employee Name") {
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
      headerText={"Work Order Employees"}
      contentSchema={contentSchema}
      fetchAPI={getWorkOrderEmployeesWithNames}
      createAPI={createWorkOrderEmployee}
      updateAPI={updateWorkOrderEmployees}
      deleteAPI={deleteWorkOrderEmployees}
    />
  );
};
export default WorkOrderEmployeesPage;