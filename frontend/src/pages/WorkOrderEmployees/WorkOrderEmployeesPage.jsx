import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getWorkOrderEmployees,
  getEmployeeNameOptions,
  getWorkOrderOptions,
  createWorkOrderEmployee,
  updateWorkOrderEmployees,
  deleteWorkOrderEmployees,
} from "./WorkOrderEmployeesAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";

// Input form schema
const createSchemaTemplate = {
  fields: [
    {
      name: "work_order_id",
      label: "Work Order",
      type: "dropdown",
      fetchOptions: true, //options to be fetched from API
    },
    {
      name: "employee_id",
      label: "Employee Name",
      type: "dropdown",
      fetchOptions: true, //options to be fetched from API
    },
    {
      name: "assigned_at",
      label: "Assigned At",
      type: "datetime-local"
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

const WorkOrderEmployeesPage = () => {
  const [createSchema, setCreateSchema] = useState(createSchemaTemplate);
  const [editSchema, setEditSchema] = useState(editSchemaTemplate);

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
    }
  }, [employeeNameOptions, workOrderOptions]);

  return (
    <DisplayTableContainer
      className={style.container}
      headerText={"Work Order Employees"}
      createSchema={createSchema}
      editSchema={editSchema}
      fetchAPI={getWorkOrderEmployees}
      createAPI={createWorkOrderEmployee}
      updateAPI={updateWorkOrderEmployees}
      deleteAPI={deleteWorkOrderEmployees}
    />
  );
};
export default WorkOrderEmployeesPage;