import { useEffect } from "react";
import { 
  getMaterials,
  createMaterial,
  updateMaterials,
  deleteMaterials,
} from "./MaterialsAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";
/**
 * This file provides the abstract Display Table Container component with all of the particulars specific 
 * to the Materials entity. It forwards the API functions, the table title, and a template to dicate the content
 * behavior and presentation.
 */

// Template is passed to the Display Table along with the raw data to dicate its format and particular
// cell behavior based on states/modes set by the table container in response to the end user's interaction
// (i.e display, edit, and add). It also enforces regex validations upon submission.
const tableSchemaTemplate = [
  {
    name: "material_id",
    label: "Material ID",
    editType: "display",
    addType: "display",
  },
  {
    name: "name",
    label: "Material Name",
    editType: "text",
    addType: "text",
    required: true,
    maxLength: 255,
    pattern: "(.|\\s)*\\S(.|\\s)*"
  },
  {
    name: "unit",
    label: "Unit",
    editType: "dropdown",
    addType: "dropdown",
    options: [
      {display: "EA"},
      {display: "FT"},
    ],
    required: true
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
    name: "quantity_available",
    label: "Quantity Available",
    editType: "number",
    addType: "number",
    min: "0",
    step: "1",
    required: true
  },
];

const MaterialsPage = () => {

  // Set tab name
  useEffect(() => {
    document.title = "LeavesFree Eaves - Materials";
  }, []);

  return (
    <DisplayTableContainer
      className={style.container}
      headerText={"Materials"}
      contentSchema={tableSchemaTemplate}
      fetchAPI={getMaterials}
      createAPI={createMaterial}
      updateAPI={updateMaterials}
      deleteAPI={deleteMaterials}
    />
  );
};
export default MaterialsPage;