import PropTypes from 'prop-types';
import { FlowCrumbs } from '../Common/FlowCrumbs';

export const AddOneProduct = () => {
    return (
        <div>
            <FlowCrumbs 
                titles={["Товари", "Додати товар"]}
                redirections={["/products"]}
            />
        </div>
    )
}

AddOneProduct.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string),
    redirections: PropTypes.arrayOf(PropTypes.string)
};