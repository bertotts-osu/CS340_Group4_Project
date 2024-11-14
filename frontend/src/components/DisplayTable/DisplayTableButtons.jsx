import PropTypes from "prop-types";
import styles from "./DisplayTableContainer.module.css";

export default function TableButtons({
  onAdd,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  mode,
}) {
  if (mode !== "display") {
    return (
      <div className={styles.buttonContainer}>
        <button type="button" className={styles.button} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.button} onClick={onSave}>
          Save
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.buttonContainer}>
        <button type="button" className={styles.button} onClick={onAdd}>
          Add
        </button>
        <button type="button" className={styles.button} onClick={onEdit}>
          Edit
        </button>
        <button type="button" className={styles.button} onClick={onDelete}>
          Delete
        </button>
      </div>
    );
  }
}

// Declare the prop types (input parameters)
TableButtons.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};
