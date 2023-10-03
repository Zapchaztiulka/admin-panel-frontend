import PropTypes from 'prop-types';
export const Container = ({ children }) => {
    return (
        <div className=" ml-auto mr-auto pr-4 pl-4">{children}</div>
    )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};