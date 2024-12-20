import { useState, useEffect, useCallback, memo } from "react";
import PropTypes from "prop-types";
import HeaderLabel from "../HeaderLabel/HeaderLabel.jsx";
import DisplayTable from "./DisplayTable.jsx";
import DisplayTableButtons from "./DisplayTableButtons.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import styles from "./DisplayTableContainer.module.css";
import headerStyle from "../HeaderLabel/HeaderLabel.module.css";

const DisplayTableContainer = memo(function DisplayTableContainer({
  headerText,
  contentSchema,
  fetchAPI,
  createAPI,
  updateAPI,
  deleteAPI,
}) {
  /*
Declare State Variables
*/
  // Table States
  const [initialData, setInitialData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [changedRows, setChangedRows] = useState([]);

  // Form States
  const [mode, setMode] = useState("display");
  const [resultMessage, setResultMessage] = useState(false);

  /*
Manage API Requests
*/
  // Fetch Table Data
  const {
    data: dbData,
    isLoading: isLoadingDBData,
    isError: isErrorDBData,
    refetch,
  } = useQuery({
    queryKey: [headerText],
    queryFn: fetchAPI,
    cacheTime: 0,
  });

  // Create New Object
  const { mutate: createObject } = useMutation(createAPI, {
    onSuccess: () => {
      setResultMessage("Successfully created!");
      setChangedRows([]);
      setMode("display");
      refetch();
    },
    onError: (error) => {
      if (error.response.status === 409) {
        setResultMessage("Error: Duplicate entry.");
      } else setResultMessage("Error: An unexpected error occurred");
      setChangedRows([]);
      setMode("add");
      refetch();
    },
  });

  // Update Objects
  const { mutate: editObject } = useMutation(updateAPI, {
    onSuccess: ({ errors }) => {
      if (errors.length > 0) {
        console.error("Errors:", errors);
        setResultMessage(`Error: ${errors.length} updates failed.`);
      } else {
        setResultMessage("Successfully updated!");
      }
      setChangedRows([]);
      setMode("display");
      refetch();
    },
    onError: (error) => {
      if (error.response) {
        setResultMessage(`Error: ${error.response.data}`);
      } else setResultMessage("Error: An unexpected error occurred");
      setChangedRows([]);
      setMode("display");
      refetch();
    },
  });

  // Delete Objects
  const { mutate: deleteObject } = useMutation(deleteAPI, {
    onSuccess: ({ errors }) => {
      if (errors.length > 0) {
        console.error("Errors:", errors);
        setResultMessage(`Error: ${errors.length} deletions failed.`);
      } else {
        setResultMessage("Successfully deleted!");
      }
      setTableData((tableData) =>
        tableData.filter((row) => !selectedRows.includes(row.id))
      );
      setInitialData((initialData) =>
        initialData.filter((row) => !selectedRows.includes(row.id))
      );
      setSelectedRows([]);
      setChangedRows([]);
    },
    onError: (error) => {
      if (error.response) {
        setResultMessage(`Error: ${error.response.data}`);
      } else setResultMessage("Error: An unexpected error occurred");
    },
  });

  /*
Handle Table Events
*/
  // Selects/Deselects all rows based on the header checkbox
  const handleSelectAllRows = () => {
    setResultMessage(false);
    if (mode !== "add") {
      if (!allSelected) {
        setAllSelected(true);
        setSelectedRows(tableData.map((row) => row.id));
      } else {
        setAllSelected(false);
        setSelectedRows([]);
      }
    }
  };

  // Select/Unselect a row when the row's checkbox is checked
  const handleSelectRow = (id) => {
    setResultMessage(false);
    if (mode !== "add") {
      setSelectedRows((selectedRows) => {
        if (selectedRows.includes(id)) {
          return selectedRows.filter((rowId) => rowId !== id);
        } else {
          return [...selectedRows, id];
        }
      });
    }
  };

  // Track edits to the form (this handles each input element's changes)
  const handleRowChange = (id, change) => {
    // determine whether there has been a true change from the starting data
    const initialRow = initialData.find((row) => row.id === id);
    const hasChanged = !Object.keys(change).every(
      (key) => change[key] === initialRow[key]
    );

    // update the table data with the new changes
    setTableData((tableData) =>
      tableData.map((row) => (row.id === id ? { ...row, ...change } : row))
    );

    // mark the row as changed
    setChangedRows((changedRows) => {
      // check if the row has already been changed
      const indexOfPreexistingRow = changedRows.findIndex(
        (row) => row.id === id
      );
      if (hasChanged) {
        // update the existing changed row
        if (indexOfPreexistingRow !== -1) {
          const updatedChangedRows = [...changedRows]; // create shallow copy
          updatedChangedRows[indexOfPreexistingRow] = {
            ...changedRows[indexOfPreexistingRow],
            ...change,
          };
          return updatedChangedRows;
        } else {
          // add a new object row with the changes
          return [...changedRows, { ...initialRow, ...change }];
        }
      } else {
        // remove the row if it was previously updated and has reverted to its initial value
        if (indexOfPreexistingRow !== -1) {
          const updatedChangedRows = [...changedRows]; // create shallow copy
          updatedChangedRows.splice(indexOfPreexistingRow, 1); //removes 1 array element in place
          return updatedChangedRows;
        }
        return changedRows;
      }
    });
  };

  /*
Modify the Table Data For Display
*/
  // Add row numbers to the table data
  useEffect(() => {
    console.log(`loading ${headerText} data: ${JSON.stringify(dbData)}`);
    if (dbData && dbData.length > 0) {
      let index = 0;
      const updatedData = dbData.map((row) => {
        index += 1;
        return { id: index, ...row };
      });
      setTableData(updatedData);
      setInitialData(updatedData);
    }
  }, [dbData, headerText]);

  /*
Handle Form Events
*/

  const handleAddButtonPress = useCallback(
    (e) => {
      e.preventDefault();
      setSelectedRows([]);
      const newRow = contentSchema.reduce(
        (acc, field) => {
          if (!field.exclude) {
            acc[field.name] = field.defaultValue || "";
          }
          return acc;
        },
        { id: tableData.length + 1 }
      );

      setTableData([...tableData, newRow]);
      setInitialData([...initialData, newRow]);
      setMode("add");
      setResultMessage(false);
    },
    [contentSchema, initialData, tableData]
  );

  const handleEditButtonPress = useCallback(
    (e) => {
      e.preventDefault();
      if (selectedRows.length > 0) {
        setMode("edit");
        setResultMessage(false);
      }
    },
    [selectedRows.length]
  );

  const handleDeleteButtonPress = (e) => {
    e.preventDefault();
    if (selectedRows.length > 0) {
      const objects2delete = selectedRows.map((row) => {
        const rowObject = tableData.find((item) => item.id === row);
        // filter out the id key/value pair from object data (it was added for display purposes)
        if (rowObject) {
          return Object.fromEntries(
            Object.entries(rowObject).filter(([key]) => key !== "id")
          );
        }
      });
      deleteObject(objects2delete);
    }
  };

  const handleSaveButtonPress = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    const invalidFields = form.querySelectorAll(":invalid");
    if (invalidFields.length > 0) {
      setResultMessage(
        "Error: Please fill out all required fields with valid data."
      );
    } else {
      setResultMessage(false);
      if (changedRows.length > 0) {
        const changes = changedRows.map((row) => {
          const rowObject = tableData.find((item) => item.id === row.id);
          // Filter out the id key/value pair from object data (it was added for display purposes)
          return Object.fromEntries(
            Object.entries(rowObject).filter(([key]) => key !== "id")
          );
        });
        mode === "add" ? createObject(changes[0]) : editObject(changes); //only 1 object can be created at a time
        setSelectedRows([]);
        setMode("display");
      } else {
        setResultMessage("No changes made.");
        setSelectedRows([]);
        setMode("display");
      }
    }
  };

  const handleCancelButtonPress = (e) => {
    e.preventDefault();
    if (mode === "add") {
      setTableData((tableData) =>
        tableData.filter((row) => row.id !== tableData.length)
      );
      setInitialData((initialData) =>
          initialData.filter((row) => row.id !== initialData.length)
      );
    } else if (mode === "edit") {
      setTableData(initialData);
    }
    setChangedRows([]);
    setSelectedRows([]);
    setMode("display");
    setResultMessage(false);
  };

  /*
Ensure the data is fetched before displaying the table
*/
  if (isLoadingDBData) {
    return <div className={headerStyle.header}>Getting data...</div>;
  } else if (isErrorDBData) {
    return (
      <div className={headerStyle.header}>
        Error getting data from the database.
      </div>
    );
  }

  /*
Render the JSX Content
*/

  if (tableData) {
    return (
      <form
        className={styles.form_container}
        onSubmit={handleSaveButtonPress}
        noValidate
      >
        <HeaderLabel text={headerText} className={headerStyle.header} />
        <DisplayTable
          data={tableData}
          contentSchema={contentSchema}
          selectedRows={selectedRows}
          mode={mode}
          onRowChange={handleRowChange}
          onSelectRow={handleSelectRow}
          onSelectAllRows={handleSelectAllRows}
        />
        {resultMessage && resultMessage.includes("Error:") ? (
          <div className={styles.msgError}>{resultMessage}</div>
        ) : (
          <div className={styles.msgSuccess}>{resultMessage}</div>
        )}
        <DisplayTableButtons
          mode={mode}
          onAdd={handleAddButtonPress}
          onEdit={handleEditButtonPress}
          onDelete={handleDeleteButtonPress}
          onSave={handleSaveButtonPress}
          onCancel={handleCancelButtonPress}
        />
      </form>
    );
  }
});

export default DisplayTableContainer;

DisplayTableContainer.propTypes = {
  headerText: PropTypes.string.isRequired,
  contentSchema: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAPI: PropTypes.func.isRequired,
  createAPI: PropTypes.func.isRequired,
  updateAPI: PropTypes.func.isRequired,
  deleteAPI: PropTypes.func.isRequired,
};
