import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getWorkOrders,
  getStageOptions,
  createWorkOrder,
  updateWorkOrders,
  deleteWorkOrders,
} from "./WorkOrdersAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";

// Input form schema
const createSchemaTemplate = {
  fields: [
    { 
      label: "Size",
      type: "dropdown",
      options: [
        "Small",
        "Medium",
        "Large"
      ],
    },
    { label: "Street", type: "text" },
    { label: "City", type: "text" },
    { label: "State", type: "text" },
    { label: "Zip", type: "text" },
    {
      label: "Stage",
      type: "dropdown",
      fetchOptions: true, //options to be fetched from API
    },
    { label: "Applied At", type: "datetime-local" },
    { label: "Estimated At", type: "datetime-local" },
    { label: "Scheduled At", type: "datetime-local" },
    { label: "Started At", type: "datetime-local" },
    { label: "Completed At", type: "datetime-local" },
    { label: "On Hold At", type: "datetime-local" },
    { label: "Cancelled At", type: "datetime-local" },
  ],
};

// Schema that maps which input fields should be used for particular columns when editing
const editSchemaTemplate = [
  {
    key: "Work Order",
    type: "uneditable",
  },
  {
    label: "Stage",
    type: "dropdown",
    fetchOptions: true, //options to be fetched from API
  },
];

const WorkOrdersPage = () => {
  const [createSchema, setCreateSchema] = useState(createSchemaTemplate);
  const [editSchema, setEditSchema] = useState(editSchemaTemplate);

  // Set tab name
  useEffect(() => {
    document.title = "LeavesFree Eaves - Work Orders";
  }, []);

  // Fetch Dropdown options
  const { data: stageOptions } = useQuery({
    queryKey: ["stageOptions"],
    queryFn: getStageOptions,
  });

  useEffect(() => {
    if (stageOptions) {
      setCreateSchema({
        ...createSchemaTemplate,
        fields: createSchemaTemplate.fields.map((field) => {
          if (field.fetchOptions && field.label === "Stage") {
            return { ...field, options: stageOptions };
          }
          return field;
        }),
      });
      setEditSchema(
        editSchemaTemplate.map((field) => {
          if (field.fetchOptions && field.label === "Stage") {
            return { ...field, options: stageOptions };
          }
          return field;
        })
      );
    }
  }, [stageOptions]);

  return (
    <DisplayTableContainer
      className={style.container}
      headerText={"Work Orders"}
      createSchema={createSchema}
      editSchema={editSchema}
      fetchAPI={getWorkOrders}
      createAPI={createWorkOrder}
      updateAPI={updateWorkOrders}
      deleteAPI={deleteWorkOrders}
    />
  );
};

export default WorkOrdersPage;
