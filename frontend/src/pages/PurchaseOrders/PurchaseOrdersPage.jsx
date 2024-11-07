import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeaderLabel from "../../components/HeaderLabel.jsx";
import DisplayTable from "../../components/DisplayTable/DisplayTable.jsx";
import { getPurchaseOrderData } from "./PurchaseOrdersAPI.js";
import TableButtons from "../../components/TableButtons/TableButtons.jsx";
import InputForm from "../../components/InputForm/InputForm.jsx";

const PurchaseOrdersPage = () => {
  useEffect(() => {
    document.title = "LeavesFree Eaves - Purchase Orders";
  }, []);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["PurchaseOrders"],
    queryFn: getPurchaseOrderData,
  });

  const [tblData, setTblData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editableRows, setEditableRows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (data) {
      setTblData(data);
    }
  }, [data]);

  let labelText;

  if (isPending) {
    labelText = "Getting table data...";
  } else if (isError) {
    labelText = `An error occurred: ${
      error.info?.message || "Unable to connect to db."
    }`;
    console.log(error);
  } else if (data) {
    labelText = "Purchase Orders";
  }

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
        const id = row.purchase_order_id;
        return !selectedRows.includes(id);
      })
    );

    console.log("Table data after deletion:", tblData);
    setSelectedRows([]);
  };

  const handleUpdate = (updatedValues) => {
    setTblData((prevTblData) =>
      prevTblData.map((row) =>
        editableRows.includes(row.purchase_order_id)
          ? { ...row, ...updatedValues[row.purchase_order_id] }
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
        selectedRows.includes(row.purchase_order_id)
      );
      const newEditValues = rowsToEdit.reduce((acc, row) => {
        acc[row.purchase_order_id] = row;
        return acc;
      }, {});
      setEditValues(newEditValues);
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
  }

  return (
    <>
      <HeaderLabel text={labelText} />
      {!isCreating ?
      (
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
        <InputForm 
        table={labelText}
        onCancel={handleCancel}
        />
      )}
    </>
  );
};
export default PurchaseOrdersPage;