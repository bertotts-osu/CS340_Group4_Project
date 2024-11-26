import { useEffect } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployees,
  deleteEmployees,
} from "./EmployeesAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";

const tableSchemaTemplate = [
  {
    name: "employee_id",
    label: "Employee ID",
    editType: "display",
    addType: "display",
  },
  {
    name: "first_name",
    label: "First Name",
    editType: "text",
    addType: "text",
    required: true,
    invalid: false,
    maxLength: 255,
  },
  {
    name: "last_name",
    label: "Last Name",
    editType: "text",
    addType: "text",
    required: true,
    invalid: false,
    maxLength: 255,
  },
  {
    name: "email",
    label: "Email",
    editType: "email",
    addType: "email",
    required: true,
    invalid: false,
    maxLength: 255,
  },
  {
    name: "phone_number",
    label: "Phone Number",
    editType: "tel",
    addType: "tel",
    pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
    required: true,
    invalid: false,
  },
  {
    name: "status",
    label: "Status",
    editType: "dropdown",
    addType: "dropdown",
    options: [
      {display: "Active"},
      {display: "Inactive"}
    ],
    required: true,
    invalid: false,
  },
  {
    name: "skill_level",
    label: "Skill Level",
    editType: "dropdown",
    addType: "dropdown",
    options: [
      {display: "Apprentice"},
      {display: "Associate"},
      {display: "Principal"}
    ],
    required: true,
    invalid: false,
  }
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
      contentSchema={tableSchemaTemplate}
      fetchAPI={getEmployees}
      createAPI={createEmployee}
      updateAPI={updateEmployees}
      deleteAPI={deleteEmployees}
    />
  );
};
export default EmployeesPage;