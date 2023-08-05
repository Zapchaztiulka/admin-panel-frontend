import PropTypes from "prop-types";
export const TemporaryComponent = ({ title }) => {
    return <h3>{title}</h3>
}

TemporaryComponent.propTypes = {
  title: PropTypes.string,  
}