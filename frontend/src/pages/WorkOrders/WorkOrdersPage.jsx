import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeaderLabel from "../../components/HeaderLabel.jsx";
import DisplayTable from "../../components/DisplayTable/DisplayTable.jsx";
import { getWorkOrderData, getStageOptions } from "./WorkOrdersAPI.js";
import TableButtons from "../../components/TableButtons/TableButtons.jsx";
import InputForm from "../../components/InputForm/InputForm.jsx";
import { workOrderInsertSchema } from "../../components/InputForm/InputFormSchemas.js";

const WorkOrdersPage = () => {
  const [tblData, setTblData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editableRows, setEditableRows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [schema, setSchema] = useState(workOrderInsertSchema);

  // Set tab name
  useEffect(() => {
    document.title = "LeavesFree Eaves - Work Orders";
  }, []);

  // Fetch work order data
  const {
    data: dataWO,
    isLoading: isdataWOLoading,
    isError: isdataWOError,
    error: dataWOError,
  } = useQuery({
    queryKey: ["workOrders"],
    queryFn: getWorkOrderData,
  });

  useEffect(() => {
    if (dataWO) {
      console.log("Fetched work order data from backend:", dataWO);
      if (typeof dataWO === 'string') {
        console.error("Received HTML instead of JSON:", dataWO);
      } else {
        setTblData(Array.isArray(dataWO) ? dataWO : []);
      }
    } else {
      console.log("No data fetched for work orders.");
    }
  }, [dataWO]);

  // Fetch stage options
  const {
    data: stageOptions,
    isLoading: isStageOptionsLoading,
    isError: isStageOptionsError,
    error: stageOptionsError,
  } = useQuery({
    queryKey: ["stageOptions"],
    queryFn: getStageOptions,
  });

  useEffect(() => {
    if (stageOptions) {
      console.log("Fetched stage options from backend:", stageOptions);
      setSchema({
        ...workOrderInsertSchema,
        fields: workOrderInsertSchema.fields.map((field) => {
          if (field.fetchOptions && field.label === "Stage") {
            return { ...field, options: stageOptions };
          }
          return field;
        }),
      });
    } else {
      console.log("No data fetched for stage options.");
    }
  }, [stageOptions]);

  const handleCheckboxChange = ([id1, id2, isComposite]) => {
    const id = isComposite ? `${id1}-${id2}` : id1;
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleDelete = () => {
    console.log("Selected rows before deletion:", selectedRows);
    console.log("Table data before deletion:", tblData);

    setTblData((prevTblData) =>
      prevTblData.filter((row) => {
        const id = row.work_order_id;
        return !selectedRows.includes(id);
      })
    );

    console.log("Table data after deletion:", tblData);
    setSelectedRows([]);
  };

  const handleUpdate = (updatedValues) => {
    console.log("Updated values:", updatedValues);
    setTblData((prevTblData) =>
      prevTblData.map((row) =>
        editableRows.includes(row.work_order_id)
          ? { ...row, ...updatedValues[row.work_order_id] }
          : row
      )
    );
    setEditableRows([]);
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (selectedRows.length > 0) {
      setEditableRows(selectedRows);
      setIsEditing(true);
      const rowsToEdit = tblData.filter((row) =>
        selectedRows.includes(row.work_order_id)
      );
      const newEditValues = rowsToEdit.reduce((acc, row) => {
        acc[row.work_order_id] = row;
        return acc;
      }, {});
      setEditValues(newEditValues);
      console.log("Rows to edit:", rowsToEdit);
      console.log("New edit values:", newEditValues);
    } else {
      console.log("Please select at least one row to edit.");
    }
  };

  const handleSave = () => {
    if (editableRows.length > 0) {
      handleUpdate(editValues);
      setEditValues({});
      setSelectedRows([]);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditableRows([]);
    setEditValues({});
    setSelectedRows([]);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleAdd = () => {
    setIsCreating(true);
  };

  if (isdataWOLoading || isStageOptionsLoading) return <div>Loading...</div>;
  if (isdataWOError) return <div>Error fetching work order data: {dataWOError.message}</div>;
  if (isStageOptionsError) return <div>Error fetching stage options: {stageOptionsError.message}</div>;

  return (
    <>
      <HeaderLabel text={"Work Orders"} />
      {!isCreating ? (
        <>
          <DisplayTable
            data={tblData}
            onCheckboxChange={handleCheckboxChange}
            editableRows={editableRows}
            onUpdate={handleUpdate}
            setEditValues={setEditValues}
            editValues={editValues}
            selectedRows={selectedRows}
          />
          <TableButtons
            onDelete={handleDelete}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            onAdd={handleAdd}
            isEditing={isEditing}
          />
        </>
      ) : (
        <InputForm schema={schema} onCancel={handleCancel} />
      )}
    </>
  );
};

export default WorkOrdersPage;