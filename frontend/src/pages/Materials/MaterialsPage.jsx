import { useEffect } from "react";
import { 
  getMaterials,
  createMaterial,
  updateMaterials,
  deleteMaterials,
} from "./MaterialsAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";

// Input form schema
const createSchemaTemplate = {
  fields: [
    { label: "Name", type: "text" },
    {
      label: "Unit",
      type: "dropdown",
      options: ["FT", "EA"],
    },
    { label: "Quantity Available", type: "text" },
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

const MaterialsPage = () => {

  // Set tab name
  useEffect(() => {
    document.title = "LeavesFree Eaves - Materials";
  }, []);

  return (
    <DisplayTableContainer
      className={style.container}
      headerText={"Materials"}
      createSchema={createSchemaTemplate}
      editSchema={editSchemaTemplate}
      fetchAPI={getMaterials}
      createAPI={createMaterial}
      updateAPI={updateMaterials}
      deleteAPI={deleteMaterials}
    />
  );
};
export default MaterialsPage;