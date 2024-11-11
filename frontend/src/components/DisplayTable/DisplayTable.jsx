import PropTypes from "prop-types";
import styles from "./DisplayTable.module.css";

export default function DisplayTable({ data, editSchema, headers, selectedRows, isEditing, onRowChange, onSelectRow }) {
  const renderInput = (key, value, rowID) => {
    const field = editSchema.find((field) => field.key === key);
    if (field && field.type === "uneditable") {
      return <span>{value}</span>;
    } else if (field && field.type === "dropdown") {
      return (
        <select
          id={field.key}
          name={field.key}
          value={value || ""}
          onChange={(e) => onRowChange(rowID, { [field.key]: e.target.value })}
          className={styles.input}
        >
          <option value="" disabled>
            Select {field.key}
          </option>
          {field.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else if (key.includes("At")) {
      return (
        <input
          type="datetime-local"
          value={value}
          onChange={(e) => onRowChange(rowID, { [key]: e.target.value })}
          className={styles.input}
        />
      );
    }
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onRowChange(rowID, { [key]: e.target.value })}
        className={styles.input}
      />
    );
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  if (data && data.length > 0) {
    return (
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.rowID}
                className={
                  selectedRows.includes(item.rowID) ? styles["active-row"] : ""
                }
              >
                <td>{item.rowID}</td>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => onSelectRow(item.rowID)}
                    checked={selectedRows.includes(item.rowID)}
                  />
                </td>
                {Object.keys(item).map(
                  (key, index) =>
                    key !== "rowID" && (
                      <td key={index}>
                        {isEditing && selectedRows.includes(item.rowID)
                          ? renderInput(key, item[key], item.rowID)
                          : key.includes("At")
                          ? formatDateTime(item[key])
                          : item[key]}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <div>No data available</div>;
}

DisplayTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  editSchema: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.node).isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.number).isRequired,
  isEditing: PropTypes.bool.isRequired,
  onRowChange: PropTypes.func.isRequired,
  onSelectRow: PropTypes.func.isRequired,
};