import PropTypes from "prop-types";

export default function HeaderLabel({ text, className }) {
    return (
        <h2 className={className}>{text}</h2>
    );
}

// Declare the prop types (input parameters)
HeaderLabel.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string
};