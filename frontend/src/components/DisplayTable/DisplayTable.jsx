import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./DisplayTable.module.css";

export default function DisplayTable({
  data,
  onCheckboxChange,
  editableRows,
  setEditValues,
  editValues,
  selectedRows,
}) {
  const [headers, setHeaders] = useState(["Select"]);
  const [idKeys, setIdKeys] = useState([]);

  useEffect(() => {
    if (
      data &&
      data.length > 0 &&
      headers.length === 1 &&
      headers[0] === "Select"
    ) {
      const newHeaders = ["Select", ...Object.keys(data[0])].map((header) => {
        if (header.toLowerCase().includes("id")) {
          setIdKeys((prevIdKeys) => [...prevIdKeys, header]);
        }
        return header
          .split("_")
          .map((word) => {
            return word === "id"
              ? word.charAt(0).toUpperCase() + word.charAt(1).toUpperCase()
              : word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
      });
      setHeaders(newHeaders);
    }
  }, [data, headers, idKeys]);

  const getRowIdentifier = (item) => {
    if (idKeys.length === 2) {
      return [item[idKeys[0]], item[idKeys[1]], true];
    } else if (idKeys.length === 1) {
      return [item[idKeys[0]], null, false];
    }
    return [undefined, undefined, false];
  };

  const handleInputChange = (e, key, rowId) => {
    setEditValues({
      ...editValues,
      [rowId]: {
        ...editValues[rowId],
        [key]: e.target.value,
      },
    });
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((val, index) => (
              <th key={index}>{val}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => {
              const [id1, id2, isComposite] = getRowIdentifier(item);
              const id = isComposite ? `${id1}-${id2}` : id1;
              const isSelected = selectedRows.includes(id);
              return (
                <tr key={id || index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        if (id1 !== undefined) {
                          onCheckboxChange([id1, id2, isComposite]);
                        }
                      }}
                    />
                  </td>
                  {Object.keys(item).map((key, i) => (
                    <td key={i}>
                      {editableRows.includes(id) && !key.toLowerCase().includes("id") ? (
                        <input
                          type="text"
                          value={editValues[id]?.[key] || item[key]}
                          onChange={(e) => handleInputChange(e, key, id)}
                        />
                      ) : (
                        item[key]
                      )}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={headers.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

DisplayTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  editableRows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  setEditValues: PropTypes.func.isRequired,
  editValues: PropTypes.object.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.string).isRequired,
};