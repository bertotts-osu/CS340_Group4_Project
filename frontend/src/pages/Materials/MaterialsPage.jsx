import { useEffect } from "react";
import { 
  getMaterials,
  createMaterial,
  updateMaterials,
  deleteMaterials,
} from "./MaterialsAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";

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