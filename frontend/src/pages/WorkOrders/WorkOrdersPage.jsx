import { useEffect } from "react";
import {
  getWorkOrders,
  createWorkOrder,
  updateWorkOrders,
  deleteWorkOrders,
} from "./WorkOrdersAPI.js";
import DisplayTableContainer from "../../components/DisplayTable/DisplayTableContainer.jsx";
import style from "../../components/DisplayTable/DisplayTableContainer.module.css";

const tableSchemaTemplate = [
    {
      name: "work_order_id",
      label: "Work Order ID",
      editType: "display",
      addType: "display",
      invalid: false,
      exclude: false,
    },
    {
      name: "stage",
      label: "Stage",
      editType: "dropdown",
      addType: "dropdown",
      options: [
        { display: "Applied"},
        { display: "Estimated"},
        { display: "Paid"},
        { display: "Scheduled"},
        { display: "In Progress"},
        { display: "Completed"},
        { display: "On Hold"},
        { display: "Cancelled"}
      ],
      required: true,
      invalid: false,
    },
    { 
      name: "size",
      label: "Size",
      editType: "dropdown",
      addType: "dropdown",
      options: [
        { display: "Small"},
        { display: "Medium"},
        { display: "Large"}
      ],
      required: true,
      invalid: false,
    },
    { 
      name: "street",
      label: "Street",
      editType: "text",
      addType: "text",
      required: true,
      invalid: false,
      pattern: "[\\w\\s.,'-]+",
    },
    { 
      name: "city",
      label: "City",
      editType: "text",
      addType: "text",
      required: true,
      invalid: false,
      pattern: "[A-Z]{1}[a-z]+",
    },
    { 
      name: "state",
      label: "State",
      editType: "text",
      addType: "text",
      required: true,
      invalid: false,
      pattern: "[A-Z]{2}",
    },
    { 
      name: "zip",
      label: "Zip",
      editType: "text",
      addType: "text",
      required: true,
      invalid: false,
      pattern: "\\d{5}",
    },
    {
      name: "applied_at",
      label: "Applied At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: true,
      invalid: false,
    },
    {
      name: "estimated_at",
      label: "Estimated At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: false,
      invalid: false,
    },
    {
      name: "scheduled_at",
      label: "Scheduled At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: false,
      invalid: false,
    },
    {
      name: "started_at",
      label: "Started At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: false,
      invalid: false,
    },
    {
      name: "completed_at",
      label: "Completed At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: false,
      invalid: false,
    },
    {
      name: "on_hold_at",
      label: "On Hold At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: false,
      invalid: false,
    },
    {
      name: "cancelled_at",
      label: "Cancelled At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: false,
      invalid: false,
    },
];

const WorkOrdersPage = () => {


  // Set tab name
  useEffect(() => {
    document.title = "LeavesFree Eaves - Work Orders";
  }, []);

  return (
    <DisplayTableContainer
      className={style.container}
      headerText={"Work Orders"}
      contentSchema={tableSchemaTemplate}
      fetchAPI={getWorkOrders}
      createAPI={createWorkOrder}
      updateAPI={updateWorkOrders}
      deleteAPI={deleteWorkOrders}
    />
  );
};

export default WorkOrdersPage;