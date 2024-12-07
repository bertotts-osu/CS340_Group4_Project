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
      exclude: false
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
      required: true
    },
    { 
      name: "street",
      label: "Street",
      editType: "text",
      addType: "text",
      required: true,
      maxLength: 255,
      pattern: "(.|\\s)*\\S(.|\\s)*"
    },
    { 
      name: "city",
      label: "City",
      editType: "text",
      addType: "text",
      required: true,
      maxLength: 255,
      pattern: "(.|\\s)*\\S(.|\\s)*"
    },
    { 
      name: "state",
      label: "State",
      editType: "dropdown",
      addType: "dropdown",
      options: [
        { display: "AL"},
        { display: "AK"},
        { display: "AZ"},
        { display: "AR"},
        { display: "CA"},
        { display: "CO"},
        { display: "CT"},
        { display: "DE"},
        { display: "DC"},
        { display: "FL"},
        { display: "GA"},
        { display: "HI"},
        { display: "ID"},
        { display: "IL"},
        { display: "IN"},
        { display: "IA"},
        { display: "KS"},
        { display: "KY"},
        { display: "LA"},
        { display: "ME"},
        { display: "MT"},
        { display: "NE"},
        { display: "NV"},
        { display: "NH"},
        { display: "NJ"},
        { display: "NM"},
        { display: "NY"},
        { display: "NC"},
        { display: "ND"},
        { display: "OH"},
        { display: "OK"},
        { display: "OR"},
        { display: "MD"},
        { display: "MA"},
        { display: "MI"},
        { display: "MN"},
        { display: "MS"},
        { display: "MO"},
        { display: "PA"},
        { display: "RI"},
        { display: "SC"},
        { display: "SD"},
        { display: "TN"},
        { display: "TX"},
        { display: "UT"},
        { display: "VT"},
        { display: "VA"},
        { display: "WA"},
        { display: "WV"},
        { display: "WI"},
        { display: "WY"}
      ],
      required: true
    },
    { 
      name: "zip",
      label: "Zip",
      editType: "text",
      addType: "text",
      required: true,
      pattern: "\\d{5}"
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
        { display: "Canceled"}
      ],
      required: true
    },
    {
      name: "applied_at",
      label: "Applied At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: true
    },
    {
      name: "estimated_at",
      label: "Estimated At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: false
    },
    {
      name: "scheduled_at",
      label: "Scheduled At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: false
    },
    {
      name: "started_at",
      label: "Started At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: false
    },
    {
      name: "completed_at",
      label: "Completed At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: false
    },
    {
      name: "on_hold_at",
      label: "On Hold At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: false
    },
    {
      name: "canceled_at",
      label: "Canceled At",
      editType: "datetime-local",
      addType: "datetime-local",
      required: false
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