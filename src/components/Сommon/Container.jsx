import PropTypes from 'prop-types';
export const Container = ({ children, containerStyle }) => {
    return (
        <div className={`ml-auto mr-auto pr-[16px] pl-[16px] mobile480:p-[24px] ${containerStyle}`}>{children}</div>
    )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  containerStyle: PropTypes.string,
};