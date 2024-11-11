import PropTypes from "prop-types";
import styles from "./DisplayTableContainer.module.css";

export default function TableButtons({ onDelete, onEdit, onSave, onCancel, onAdd, isEditing }) {
  if (isEditing) {
    return (
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={onCancel}>Cancel</button>
        <button className={styles.button} onClick={onSave}>Save</button>
      </div>
    );
  } else {
    return (
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={onAdd}>Add</button>
        <button className={styles.button} onClick={onEdit}>Edit</button>
        <button className={styles.button} onClick={onDelete}>Delete</button>
      </div>
    );
  }
}

// Declare the prop types (input parameters)
TableButtons.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};