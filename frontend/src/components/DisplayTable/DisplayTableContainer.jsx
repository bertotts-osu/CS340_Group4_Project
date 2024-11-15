import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import HeaderLabel from "../../components/HeaderLabel/HeaderLabel.jsx";
import DisplayTable from "../DisplayTable/DisplayTable.jsx";
import DisplayTableButtons from "./DisplayTableButtons.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import styles from "./DisplayTableContainer.module.css";
import headerStyle from "../HeaderLabel/HeaderLabel.module.css";

export default function DisplayTableContainer({
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
  const { mutate: createObject } = useMutation(createAPI, {
    onSuccess: (createObject) => {
      console.log("Success:", createObject);
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
    onSuccess: ({ successes, errors }) => {
      console.log("Success:", { successes, errors });
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
    onSuccess: ({ successes, errors }) => {
      console.log("Success:", { successes, errors });
      if (errors.length > 0) {
        console.error("Errors:", errors);
        setResultMessage(`Error: ${errors.length} deletions failed.`);
      } else {
        setResultMessage("Successfully deleted!");
      }
      setSelectedRows([]);
      setChangedRows([]);
      refetch();
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

    if (hasChanged) {
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
  // Add row numbers to the table data
  useEffect(() => {
    if (data && data.length > 0) {
      let index = 0;
      const updatedData = data.map((row) => {
        index += 1;
        return { id: index, ...row };
      });
      setTableData(updatedData);
      setInitialData(updatedData);
    }
  }, [data]);

  /*
Handle Form Events
*/

  const handleAddButtonPress = (e) => {
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
  };

  const handleEditButtonPress = (e) => {
    e.preventDefault();
    if (selectedRows.length > 0) {
      setMode("edit");
      setResultMessage(false);
    }
  };

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
      invalidFields.forEach((field) => {
        field.classList.add("invalid");
        const fieldSchema = contentSchema.find((f) => f.name === field.name);
        if (fieldSchema) {
          fieldSchema.invalid = true;
        }
      });
      setResultMessage("Error: Please fill out all required fields.");
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
      }
    }
  };

  const handleCancelButtonPress = (e) => {
    e.preventDefault();
    if (mode === "add") {
      setTableData((tableData) =>
        tableData.filter((row) => row.id !== tableData.length)
      );
    }
    setSelectedRows([]);
    setMode("display");
    setResultMessage(false);
  };

  /*
Render the JSX Content
*/
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

DisplayTableContainer.propTypes = {
  headerText: PropTypes.string.isRequired,
  contentSchema: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAPI: PropTypes.func.isRequired,
  createAPI: PropTypes.func.isRequired,
  updateAPI: PropTypes.func.isRequired,
  deleteAPI: PropTypes.func.isRequired,
};
