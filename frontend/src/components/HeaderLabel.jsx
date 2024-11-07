import PropTypes from "prop-types";

export default function HeaderLabel({ text }) {
    return (
        <h2>{text}</h2>
    );
}

//declare the prop types (input parameters)
HeaderLabel.propTypes = {
    text: PropTypes.string.isRequired
}