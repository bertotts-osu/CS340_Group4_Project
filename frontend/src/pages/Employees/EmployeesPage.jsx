import { useEffect } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployees,
  deleteEmployees,
} from "./EmployeesAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";
/**
 * This file provides the abstract Display Table Container component with all of the particulars specific 
 * to the Employees entity. It forwards the API functions, the table title, and a template to dicate the content
 * behavior and presentation.
 */


// Template is passed to the Display Table along with the raw data to dicate its format and particular
// cell behavior based on states/modes set by the table container in response to the end user's interaction
// (i.e display, edit, and add). It also enforces regex validations upon submission.
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
    maxLength: 255,
    pattern: "(.|\\s)*\\S(.|\\s)*"
  },
  {
    name: "last_name",
    label: "Last Name",
    editType: "text",
    addType: "text",
    required: true,
    maxLength: 255,
    pattern: "(.|\\s)*\\S(.|\\s)*"
  },
  {
    name: "email",
    label: "Email",
    editType: "email",
    addType: "email",
    required: false,
    maxLength: 255
  },
  {
    name: "phone_number",
    label: "Phone Number",
    editType: "tel",
    addType: "tel",
    pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
    required: false
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
    required: true
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
    required: true
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