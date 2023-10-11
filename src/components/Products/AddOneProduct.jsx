import PropTypes from 'prop-types';
import { FlowCrumbs } from '../Common/FlowCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddProductOptions } from '../../redux/options/selectors';
import { useEffect, useState } from 'react';
import { fetchProductOptions } from '../../redux/options/operations';
import { Form, Formik } from 'formik';
import { DynamicProperties } from '../DynamicProperties/DynamicProperties';
import { addProduct, getAllCategories } from '../../service/apiService';
import { Select } from '../DynamicProperties/Options/Select';
// import Button from "universal-components-frontend/src/components/buttons/button"

export const AddOneProduct = () => {
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProductOptions());
        getAllCategories().then(res => setCategories(res));
      }, [dispatch]);

    const options = useSelector(selectAddProductOptions);
    const initialValues = {};
    if(options) {
        options.map(el => el.key).forEach(el => initialValues[el]='');
    }

    const handleSubmit = (values) => {
        // тимчасова функція
        
        console.log(values, Number(values.price));
        const newProduct = {
            ...values, 
            manufacturer: {
                country: values.country,
                factory: values.factory,
                trademark: values.trademark
            },
            categories:[categories.find(el=> el.categoryName === values.categories)._id],
        };
        delete newProduct.trademark;
        Object.entries(newProduct).map(a=>Object.entries(a[1]).filter(b=>b[1].length).length?a:delete newProduct[a[0]])
        addProduct([{...newProduct, price: Number(values.price), quantity: Number(values.quantity)}])
    }
    return (
        <>
            <Button />
            <FlowCrumbs 
                titles={["Товари", "Додати товар"]}
                redirections={["/products"]}
            />
            {options && <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {() => {
                    return (
                        <Form>
                            <DynamicProperties options={options} />
                            <Select list={categories.map(el=>el.categoryName)} name={'categories'} title={options.find(el=>el.key === "categories").title} />
                            <button className="w-[20px] h-[40px]" type="submit">
                                Створити товар
                            </button>
                        </Form>
                    );
                }}
            </Formik>}
        </>
    )
}

AddOneProduct.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string),
    redirections: PropTypes.arrayOf(PropTypes.string)
};