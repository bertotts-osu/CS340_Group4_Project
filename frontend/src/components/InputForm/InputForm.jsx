import PropTypes from "prop-types";
import { useState } from "react";
import HeaderLabel from "../HeaderLabel/HeaderLabel.jsx";
import styles from "./InputForm.module.css";

export default function InputForm({
  label,
  schema,
  onCancel,
  onSubmit,
  resultMessage,
}) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <HeaderLabel text={label} className={styles.formHeader} />
      <div className={styles.formContent}>
        {schema.fields.map((field, index) => (
          <div key={index} className={styles.formGroup}>
            <label htmlFor={field.label} className={styles.label}>
              {field.label}
            </label>
            {field.type === "text" && (
              <input
                type="text"
                id={field.label}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.label}
                className={styles.input}
              />
            )}
            {field.type === "datetime-local" && (
              <input
                type="datetime-local"
                id={field.label}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.label}
                className={styles.input}
              />
            )}
            {field.type === "dropdown" && (
              <select
                id={field.label}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="" disabled>
                  Select {field.label}
                </option>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.display}
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
          <button type="submit" className={styles.button}>
            Submit
          </button>
        </div>
      </div>
      {resultMessage && resultMessage.includes("Error:") ? (
        <div className={styles.msgError}>{resultMessage}</div>
      ) : (
        <div className={styles.msgSuccess}>{resultMessage}</div>
      )}
    </form>
  );
}

InputForm.propTypes = {
  label: PropTypes.string.isRequired,
  schema: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  resultMessage: PropTypes.string,
};
