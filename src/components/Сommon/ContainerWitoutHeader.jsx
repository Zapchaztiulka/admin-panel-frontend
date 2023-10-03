import PropTypes from 'prop-types';
export const ContainerWitoutHeader = ({ children }) => {
    return (
        <div className="ml-auto mr-auto pr-4 pl-4">{children}</div>
    )
}

ContainerWitoutHeader.propTypes = {
  children: PropTypes.node.isRequired,
};