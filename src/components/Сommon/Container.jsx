import PropTypes from 'prop-types';
export const Container = ({ children, containerStyle }) => {
    return (
        <div className={`ml-auto mr-auto pr-4 pl-4 ${containerStyle}`}>{children}</div>
    )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  containerStyle: PropTypes.string,
};