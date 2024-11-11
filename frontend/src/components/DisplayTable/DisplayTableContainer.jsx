import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import HeaderLabel from "../../components/HeaderLabel/HeaderLabel.jsx";
import DisplayTable from "../DisplayTable/DisplayTable.jsx";
import DisplayTableButtons from "./DisplayTableButtons.jsx";
import InputForm from "../InputForm/InputForm.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import style from "./DisplayTableContainer.module.css";

export default function DisplayTableContainer({
  headerText,
  createSchema,
  editSchema,
  fetchAPI,
  createAPI,
  updateAPI,
  deleteAPI,
}) {
  /*
Declare State Variables
*/
  // Table States
  const [initial_data, setInitialData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [changedRows, setChangedRows] = useState([]);

  // Form States
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [resultMessage, setResultMessage] = useState(false);

  /*
Manage API Requests
*/

  // Fetch Table Data
  const { data, refetch } = useQuery({
    queryKey: ["fetchData"],
    queryFn: fetchAPI,
  });

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  // Create New Object
  const { mutate: submitData } = useMutation(createAPI, {
    onSuccess: (submitData) => {
      console.log("Success:", submitData);
      setResultMessage("Successfully created!");
      refetch();
      setIsCreating(false);
    },
    onError: (error) => {
      if (error.response) {
        setResultMessage(`Error: ${error.response.data}`);
      } else
      setResultMessage("Error: An unexpected error occurred");
    },
  });

  // Update Objects
  const { mutate: updateData } = useMutation(updateAPI, {
    onSuccess: (updateData) => {
      console.log("Success:", updateData);
      setResultMessage("Successfully updated!");
      setChangedRows([]);
    },
    onError: (error) => {
      if (error.response) {
        setResultMessage(`Error: ${error.response.data}`);
      } else
      setResultMessage("Error: An unexpected error occurred");
    },
  });

  // Delete Objects
  const { mutate: deleteData } = useMutation(deleteAPI, {
    onSuccess: (deleteData) => {
      console.log("Success:", deleteData);
      setResultMessage(false);
      setSelectedRows([]);
      setChangedRows([]);
      refetch();
      setResultMessage("Successfully deleted!");
    },
    onError: (error) => {
      if (error.response) {
        setResultMessage(`Error: ${error.response.data}`);
      } else
      setResultMessage("Error: An unexpected error occurred");
    },
  });

  /*
Handle Table Events
*/
  // Selects/Deselects all rows based on the header checkbox
  const handleSelectAllRows = useCallback(() => {
    // useCallback using memoization to reduce rerenders
    if (!allSelected) {
      setAllSelected(true);
      setSelectedRows(tableData.map((item) => item.rowID));
    } else {
      setAllSelected(false);
      setSelectedRows([]);
    }
  }, [allSelected, tableData]); //will rerender when allSelected or tableData change

  // Select/Unselect a row when the row's checkbox is checked
  const handleSelectRow = (rowID) => {
    setSelectedRows((selectedRows) => {
      if (selectedRows.includes(rowID)) {
        return selectedRows.filter((id) => id !== rowID);
      } else {
        return [...selectedRows, rowID];
      }
    });
  };

  // Track edits to the form (this handles each input element's changes)
  const handleRowChange = (rowID, change) => {
    // determine whether there has been a true change from the starting data
    const initialRow = initial_data.find((row) => row.rowID === rowID);
    const hasChanged = !Object.keys(change).every(
      (key) => change[key] === initialRow[key]
    );

    if (hasChanged) {
      // update the table data with the new changes
      setTableData((tableData) =>
        tableData.map((row) =>
          row.rowID === rowID ? { ...row, ...change } : row
        )
      );

      // mark the row as changed
      setChangedRows((changedRows) => {
        // check if the row has already been changed
        const indexOfPreexistingRow = changedRows.findIndex(
          (row) => row.rowID === rowID
        );

        // update the existing changed row
        if (indexOfPreexistingRow !== -1) {
          const updatedChangedRows = [...changedRows];
          updatedChangedRows[indexOfPreexistingRow] = {
            ...changedRows[indexOfPreexistingRow],
            ...change,
          };
          return updatedChangedRows;
        } else {
          // add a new object row with the changes
          return [...changedRows, { ...initialRow, ...change }];
        }
      });
    }
  };

  /*
Modify the Table Data For Display
*/
  // Prepend table-specifc headers to the data headers
  useEffect(() => {
    if (data && data.length > 0) {
      setHeaders([
        "#",
        <input
          key="select-all-checkbox"
          type="checkbox"
          onChange={handleSelectAllRows}
          checked={allSelected}
        />,
        ...Object.keys(data[0]),
      ]);
    }
  }, [data, allSelected, handleSelectAllRows]);

  // Add row numbers to the table data
  useEffect(() => {
    if (data && data.length > 0) {
      let index = 0;
      const updatedData = data.map((item) => {
        index += 1;
        return { rowID: index, ...item };
      });
      setTableData(updatedData);
      setInitialData(updatedData);
    }
  }, [data, editSchema]);

  /*
Handle Form Events
*/

  const handleAddButtonPress = () => {
    setSelectedRows([]);
    setIsCreating(true);
    setResultMessage(false);
  };

  const handleEditButtonPress = () => {
    if (selectedRows.length > 0) {
      setIsEditing(true);
      setResultMessage(false);
    }
  };

  const handleDeleteButtonPress = () => {
    if (selectedRows.length > 0) {
      const objects2delete = selectedRows.map((row) => {
        const rowObject = tableData.find((item) => item.rowID === row);
        // filter out the rowID key/value pair from object data (it was added for display purposes)
        if (rowObject) {
          return Object.fromEntries(
            Object.entries(rowObject).filter(([key]) => key !== "rowID")
          );
        }
      });
      deleteData(objects2delete);
    }
  };

  const handleSaveButtonPress = () => {
    if (changedRows.length > 0) {
      const objects2update = changedRows
        .map((row) => {
          const rowObject = tableData.find((item) => item.rowID === row.rowID);
          // Filter out the rowID key/value pair from object data (it was added for display purposes)
            return Object.fromEntries(
              Object.entries(rowObject).filter(([key]) => key !== "rowID")
            );
          });
      updateData(objects2update);
      setSelectedRows([]);
      setIsEditing(false);
    }
  };

  const handleSubmitButtonPress = (formData) => {
    submitData(formData);
  };

  const handleCancelButtonPress = () => {
    setSelectedRows([]);
    setIsEditing(false);
    setIsCreating(false);
    setResultMessage(false);
  };

  /*
Render the JSX Content
*/
  if (isCreating) {
    return (
      <>
        <InputForm
          label={"Work Order Employees"}
          schema={createSchema}
          onCancel={handleCancelButtonPress}
          onSubmit={handleSubmitButtonPress}
          resultMessage={resultMessage}
        />
      </>
    );
  }
  return (
    <div className={style.container}>
      <HeaderLabel text={headerText} />
      <DisplayTable
        data={tableData}
        editSchema={editSchema}
        headers={headers}
        selectedRows={selectedRows}
        isEditing={isEditing}
        onRowChange={handleRowChange}
        onSelectRow={handleSelectRow}
      />
      {resultMessage && resultMessage.includes("Error:") ? (
        <div className={style.msgError}>{resultMessage}</div>
      ) : (
        <div className={style.msgSuccess}>{resultMessage}</div>
      )}
      <DisplayTableButtons
        onDelete={handleDeleteButtonPress}
        onEdit={handleEditButtonPress}
        onAdd={handleAddButtonPress}
        isEditing={isEditing}
        onSave={handleSaveButtonPress}
        onCancel={handleCancelButtonPress}
      />
    </div>
  );
}

DisplayTableContainer.propTypes = {
  headerText: PropTypes.string.isRequired,
  createSchema: PropTypes.object.isRequired,
  editSchema: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAPI: PropTypes.func.isRequired,
  createAPI: PropTypes.func.isRequired,
  updateAPI: PropTypes.func.isRequired,
  deleteAPI: PropTypes.func.isRequired,
};