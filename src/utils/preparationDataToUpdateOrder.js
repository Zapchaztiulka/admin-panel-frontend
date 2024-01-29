import _ from 'lodash';

// TODO: After each changes on backend, this mapping should be updated.
export const prepareData = (data) => {
  let restData = _.omit(data, [
    '_id',
    'totalTypeOfProducts',
    'totalProducts',
    'totalPrice',
    'createdAt',
    'updatedAt',
    'deliveryData',
    'totalPriceWithDelivery',
    'adminData',
  ]);

  restData = { ...restData, ...(data?.deliveryData || {}) };

  Object.entries(restData).filter((item) => {
    return item[1];
  });

  for (let key in restData) {
    if (!restData[key]) {
      delete restData[key];
    }
  }

  const newProducts = data.products?.map((prod) => {
    const { productId, quantity } = prod;
    return { productId, quantity };
  });

  return {
    ...restData,
    products: newProducts,
  };
};

export const cleanEmptyFieldsInObject = (data) => {
  const tempData = { ...data };
  const newProducts = tempData.products?.map((prod) => {
    const { productId, quantity } = prod;
    return { productId, quantity };
  });
  for (let key in tempData) {
    if (!tempData[key]) {
      delete tempData[key];
    }
  }
  console.log('cleanEmptyFieldsInObject', tempData);
  return { ...tempData, products: newProducts };
};
