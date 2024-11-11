import { useEffect } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployees,
  deleteEmployees,
} from "./EmployeesAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";

// Input form schema
const createSchemaTemplate = {
  fields: [
    { label: "Fist Name", type: "text" },
    { label: "Last Name", type: "text" },
    { label: "Email", type: "text" },
    { label: "Phone Number", type: "text" },
    {
      label: "Status",
      type: "dropdown",
      options: ["Active", "Inactive"],
    },
    {
      label: "Skill Level",
      type: "dropdown",
      options: ["Apprentice", "Associate", "Principal"],
    },
  ],
};

// Schema that maps which input fields should be used for particular columns when editing
const editSchemaTemplate = [
  {
    key: "Employee ID",
    type: "uneditable",
  },
  {
    label: "Status",
    type: "dropdown",
    options: ["Active", "Inactive"],
  },
  {
    label: "Skill Level",
    type: "dropdown",
    options: ["Apprentice", "Associate", "Principal"],
  },
];

const EmployeesPage = () => {

  // Set tab name
  useEffect(() => {
    document.title = "LeavesFree Eaves - Employees";
  }, []);

  return (
    <DisplayTableContainer
      className={style.container}
      headerText={"Employees"}
      createSchema={createSchemaTemplate}
      editSchema={editSchemaTemplate}
      fetchAPI={getEmployees}
      createAPI={createEmployee}
      updateAPI={updateEmployees}
      deleteAPI={deleteEmployees}
    />
  );
};
export default EmployeesPage;