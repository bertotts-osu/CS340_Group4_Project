import PropTypes from "prop-types";

/** 
 * Renders a dropdown list constituted of the input array values .
 * 
 * @param {Array} props.values - the array of values to display in the dropdown list
 * @returns {JSX.Element} - the rendered dropdown list.
*/

export default function Dropdown({ values }) {
  return (
    <select>
      {values.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

// Declares the expected input properties
Dropdown.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
};