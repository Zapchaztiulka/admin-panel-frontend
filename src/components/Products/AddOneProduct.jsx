import PropTypes from 'prop-types';
import { FlowCrumbs } from '../Common/FlowCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddProductOptions } from '../../redux/options/selectors';
import { useEffect, useState } from 'react';
import { fetchProductOptions } from '../../redux/options/operations';
import { Form, Formik } from 'formik';
import { DynamicProperties } from '../DynamicProperties/DynamicProperties';
import api from "../../service/api";
import { Select } from '../DynamicProperties/Options/Select';
import { Button } from "universal-components-frontend/src/components/buttons";

export const AddOneProduct = () => {
    const [categories, setCategories] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductOptions());
        api.categories.getAllCategories().then(res => setCategories(res));
    }, [dispatch]);

    const options = useSelector(selectAddProductOptions);
    const mainOptions = options?.filter(el => el?.render?.block ===1) ?? {};
    const additionalOptions = options?.filter(el => el?.render?.block ===2) ?? {};

    const initialValues = {};

    if (options) {
        options.map(el => el.key).forEach(el => initialValues[el] = '');
    }

    const handleSubmit = (values) => {
        const newProduct = {
            ...values,
            manufacturer: {
                country: values.country,
                factory: values.factory,
                trademark: values.trademark
            },
            categories: values?.categories?.map(item => categories?.find(el => el.categoryName === item)?._id),
        };
        delete newProduct.trademark;
        Object.entries(newProduct).map(a => Object.entries(a[1]).filter(b => b[1]?.length)?.length ? a : delete newProduct[a[0]])
        console.log([{ ...newProduct, price: Number(values.price), quantity: Number(values.quantity) }]);
        api.product.addProducts([{ ...newProduct, price: Number(values.price), quantity: Number(values.quantity) }])
    }

    return (
        <div className='w-full'>
            <FlowCrumbs
                titles={["Товари", "Додати товар"]}
                redirections={["/products"]}
            />
            {options && <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                handleChange={(v)=>console.log(v)}
                className="mt-5"
            >
                {({setFieldValue}) => {
                   
                    return (
                        <Form className='flex flex-col items-stretch pt-6'>
                            {/* <DynamicProperties options={options.filter(el => !["subcategories", "categories"].includes(el.key))} setFieldValue={setFieldValue}/> */}
                            <div className='tablet768:flex justify-stretch gap-6'>
                                <section className='w-full'>
                                    <h3 className='text-heading3'>Основна інформація</h3>
                                    <DynamicProperties options={mainOptions} setFieldValue={setFieldValue}/>
                                    <Select multiselect={true} setFieldValue={setFieldValue} list={categories.map(el => el.categoryName)} name={'categories'} title={options.find(el => el.key === "categories").title} />
                                </section>

                                <section className='w-full'>
                                    <h3 className='text-heading3'>Характеристики</h3>
                                    <DynamicProperties options={additionalOptions} setFieldValue={setFieldValue}/>
                                </section>
                            </div>
                                
                            <button className="mt-2 block min-h-[48px] py-xs px-s bg-bgBrandLight1 border-1 border-borderDefaultBlue rounded-medium w-full" type="button">
                                <a href="https://zapchastiulka-product-photo-criteria.netlify.app/" target='_blank' rel="noreferrer">
                                    Рекомендації зі стилю зображень</a>
                            </button>
                            
                            <Button
                                buttonType="primary"
                                type="submit"
                                text="Створити товар"
                                className=" mt-2"
                            />
                        </Form>
                    );
                }}
            </Formik>}
        </div>
    )
}

AddOneProduct.propTypes = {
    titles: PropTypes.arrayOf(PropTypes.string),
    redirections: PropTypes.arrayOf(PropTypes.string)
};