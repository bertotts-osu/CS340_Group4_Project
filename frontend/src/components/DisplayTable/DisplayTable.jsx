import PropTypes from "prop-types";
import styles from "./DisplayTable.module.css";

export default function DisplayTable({
  data,
  contentSchema,
  selectedRows,
  mode,
  onRowChange,
  onSelectRow,
  onSelectAllRows,
}) {
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

  const renderInput = (name, value, id) => {
    const field = contentSchema.find((field) => field.name === name);
    if (field) {
      // Reset invalid state if the field is valid
      const handleChange = (e) => {
        // update the row state
        onRowChange(id, { [field.name]: e.target.value });
      };

      // apply the schema to the values to change their function (display vs input)
      if (
        (mode === "edit" && selectedRows.includes(id)) ||
        (mode === "add" && id === data.length)
      ) {
        if (
          (mode === "edit" && field.editType === "display") ||
          (mode === "add" && field.addType === "display")
        ) {
          return <span>{value}</span>;
        } else if (
          (mode === "edit" && field.editType === "dropdown") ||
          (mode === "add" && field.addType === "dropdown")
        ) {
          return (
            <div className={styles.input_container}>
              <select
                id={field.name}
                name={field.name}
                value={value || ""}
                required={field.required}
                onChange={handleChange}
                className={`${styles.input}`}
              >
                <option value="" disabled={field.required}>
                  Select {field.label}
                </option>
                {field.options.map((option, index) => (
                  <option key={index} value={option.display}>
                    {option.display}
                  </option>
                ))}
              </select>
            </div>
          );
        } else if (
          (mode === "edit" && field.editType !== "display") ||
          (mode === "add" && field.addType !== "display")
        ) {
          return (
            <div className={styles.input_container}>
              <input
                type={mode === "add" ? field.addType : field.editType}
                name={field.name}
                value={value}
                required={field.required}
                onChange={handleChange}
                step={field.editType === "number" || field.addType === "number" ? field.step : undefined}
                min={field.editType === "number" || field.addType === "number" ? field.min : undefined}
                max={field.editType === "number" || field.addType === "number" ? field.max : undefined}
                maxLength={field.maxLength ? field.maxLength : undefined}
                pattern={field.pattern ? field.pattern : undefined}
                className={`${styles.input}`}
              />
            </div>
          );
        }
      } else {
        if (value) {
          if (field.name.endsWith("_at")) {
            value = formatDateTime(value);
          } else if (field.name.endsWith("_cost")) {
            value = Number(value).toFixed(2);
          }
        }

        return <span>{value}</span>;
      }
    }
  };

  // render the table content
  if (data && data.length > 0) {
    return (
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <input
                  key="select-all-checkbox"
                  type="checkbox"
                  onChange={onSelectAllRows}
                />
              </th>
              {contentSchema
                .filter(
                  (item) =>
                    item && (item.exclude === undefined || !item.exclude)
                )
                .map((item, index) => (
                  <th key={index}>{item?.label || ""}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className={
                  selectedRows.includes(row.id) ? styles["active-row"] : ""
                }
              >
                <td>
                  <input
                    type="checkbox"
                    onChange={() => onSelectRow(row.id)}
                    checked={selectedRows.includes(row.id)}
                  />
                </td>
                {contentSchema.map(
                  (field, index) =>
                    field &&
                    (field.exclude === undefined || !field.exclude) && (
                      <td key={index}>
                        {renderInput(field.name, row[field.name], row.id)}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div>No data available</div>;
  }
}

DisplayTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  contentSchema: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.number).isRequired,
  mode: PropTypes.string.isRequired,
  onRowChange: PropTypes.func.isRequired,
  onSelectRow: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
};
