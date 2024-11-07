import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./InputForm.module.css";

const tableSchemas = {
  "Work Orders": {
    fields: [
      { label: "Size", type: "text" },
      { label: "Street", type: "text" },
      { label: "City", type: "text" },
      { label: "Zip", type: "text" },
      {
        label: "Stage",
        type: "dropdown",
        options: [
          "Applied",
          "Estimated",
          "Paid",
          "Scheduled",
          "In Progress",
          "Completed",
          "On Hold",
          "Canceled",
        ],
      },
      { label: "Applied At", type: "text" },
      { label: "Estimated At", type: "text" },
      { label: "Scheduled At", type: "text" },
      { label: "Started At", type: "text" },
      { label: "Completed At", type: "text" },
      { label: "On Hold At", type: "text" },
      { label: "Cancelled At", type: "text" },
    ],
  },
  "Employees": {
    fields: [
      { label: "Fist Name", type: "text" },
      { label: "Last Name", type: "text" },
      { label: "Email", type: "text" },
      { label: "Phone Number", type: "text" },
      {
        label: "Status",
        type: "dropdown",
        options: [
          "Active",
          "Inactive",
        ],
      },
      {
        label: "Skill Level",
        type: "dropdown",
        options: [
          "Apprentice",
          "Associate",
          "Principal",
        ],
      },
    ],
  },
  "Purchase Orders": {
    fields: [
      {
        label: "Employee",
        type: "dropdown",
        options: [
          "Option 1 - pull from db",
          "Option 2 - pull from db",
        ],
      },
      {
        label: "Work Order ID",
        type: "dropdown",
        options: [
          "Option 1 - pull from db",
          "Option 2 - pull from db",
        ],
      },
    ],
  },
  "Purchase Order Items": {
    fields: [
      { label: "Unit Cost", type: "text" },
      { label: "Quantity", type: "text"},
      { label: "Estimated Delivery Date", type: "text"},
      {
        label: "Delivery Type",
        type: "dropdown",
        options: [
          "Stock",
          "Ship",
        ],
      },
      {
        label: "Material",
        type: "dropdown",
        options: [
          "Option 1 - pull from db",
          "Option 2 - pull from db",
        ],
      },
    ],
  },
  "Materials": {
    fields: [
      { label: "Name", type: "text" },
      {
        label: "Unit",
        type: "dropdown",
        options: [
          "FT",
          "EA",
        ],
      },
      { label: "Quantity Available", type: "text" },
    ],
  },
};

export default function InputForm({ table, onCancel }) {
  const schema = tableSchemas[table];

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.fields.map((field, index) => (
        <div key={index} className={styles.formGroup}>
          <label htmlFor={field.label}>{field.label}</label>
          {field.type === "text" && (
            <input
              type="text"
              id={field.label}
              name={field.label}
              value={formData[field.label] || ""}
              onChange={handleChange}
              placeholder={field.label}
            />
          )}
          {field.type === "dropdown" && (
            <select
              id={field.label}
              name={field.label}
              value={formData[field.label] || ""}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select {field.label}
              </option>
              {field.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <div className={styles.buttonContainer}>
        <button type="button" className={styles.button} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.button}>Submit</button>
      </div>
    </form>
  );
}

InputForm.propTypes = {
  table: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};