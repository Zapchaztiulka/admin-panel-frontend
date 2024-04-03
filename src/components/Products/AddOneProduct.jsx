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
import { sortOptions } from '@/utils/sortOptions';
import { UploadImage } from '../UploadImage/UploadImage';

export const AddOneProduct = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductOptions());
        api.categories.getAllCategories().then(res => setCategories(res));
    }, [dispatch]);

    const options = useSelector(selectAddProductOptions);
    let mainOptions = sortOptions(options?.filter(el => el?.render?.block === 1)) ?? [];
    const additionalOptions = sortOptions(options?.filter(el => el?.render?.block ===2)) ?? [];

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
            subcategories: values?.subcategories ? values?.subcategories?.filter(el => el)?.map(item => subcategories?.find(el => el.subcategoryName === item)?._id) : [],
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
                className="mt-5"
            >
                {({setFieldValue}) => {
                    const handleFieldChange = (key, value) => {
                        setFieldValue(key, value)
                        if(key === 'categories') {
                            const newSubcategories = value?.flatMap(el => categories?.find(item => item.categoryName === el)?.subcategories);
                            setSubcategories(newSubcategories);
                        }
                        if(key === 'availability') {
                            const quantity = options.find(el => el.key === 'quantity');
                            const quantityEl = mainOptions.find(el => el.key === 'quantity');
                            if(value === "в наявності") {
                                quantityEl.validation={...quantity.validation, minValue:  1, required: true, warningMessages: {...quantity.warningMessages, value: "Для товару зі статусом 'в наявності' кількість товару повинна бути більшою за 0", required: "Для товару зі статусом 'в наявності' кількість товару повинна бути більшою за 0"}}
                                
                            } else {
                                quantityEl.validation={...quantity.validation, maxValue:  0, warningMessages: {...quantity.warningMessages, value: "Для товару зі статусом відмінним від 'в наявності' кількість товару повинна бути 0"}};
                                delete quantityEl.validation.max;
                                delete quantityEl.validation.min;
                            }
                        }
                    }
                    return (
                        <Form className='flex flex-col items-stretch pt-6'>
                            <div className='tablet768:flex justify-stretch gap-6'>
                                <section className='w-full'>
                                    <h3 className='text-heading3'>Основна інформація</h3>
                                    <DynamicProperties options={mainOptions} setFieldValue={handleFieldChange}/>
                                    <Select multiselect={true} setFieldValue={handleFieldChange} list={categories.map(el => el.categoryName)} name={'categories'} title={options.find(el => el.key === "categories").title} {...options.find(el => el.key === "categories")}/>
                                    {subcategories.length > 0 && <Select multiselect={true} setFieldValue={handleFieldChange} list={subcategories.map(el => el.subcategoryName)} name={'subcategories'} title={options.find(el => el.key === "subcategories").title} />}
                                </section>

                                <section className='w-full'>
                                    <h3 className='text-heading3'>Характеристики</h3>
                                    <DynamicProperties options={additionalOptions} setFieldValue={handleFieldChange}/>
                                    <UploadImage />
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