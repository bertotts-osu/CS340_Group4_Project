export const workOrderInsertSchema = {
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

export const employeeInsertSchema = {
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

export const purchaseOrderInsertSchema = {
  fields: [
    {
      label: "Employee",
      type: "dropdown",
      options: ["Option 1 - pull from db", "Option 2 - pull from db"],
    },
    {
      label: "Work Order ID",
      type: "dropdown",
      options: ["Option 1 - pull from db", "Option 2 - pull from db"],
    },
  ],
};

export const purchaseOrderItemsInsertSchema = {
  fields: [
    { label: "Unit Cost", type: "text" },
    { label: "Quantity", type: "text" },
    { label: "Estimated Delivery Date", type: "text" },
    {
      label: "Delivery Type",
      type: "dropdown",
      options: ["Stock", "Ship"],
    },
    {
      label: "Material",
      type: "dropdown",
      options: ["Option 1 - pull from db", "Option 2 - pull from db"],
    },
  ],
};

export const materialsInsertSchema = {
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