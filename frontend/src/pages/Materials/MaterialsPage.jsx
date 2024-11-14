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
    label: "Material",
    editType: "display",
    addType: "display",
  },
  {
    name: "name",
    label: "Material Name",
    editType: "text",
    addType: "text",
    required: true,
    invalid: false,
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
    required: true,
    invalid: false,
  },
  {
    name: "unit_cost",
    label: "Unit Cost",
    editType: "number",
    addType: "number",
    min: "1.00",
    step: "0.01",
    required: true,
    invalid: false,
  },
  {
    name: "quantity_available",
    label: "Quantity Available",
    editType: "number",
    addType: "number",
    min: "1",
    step: "1",
    required: true,
    invalid: false,
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