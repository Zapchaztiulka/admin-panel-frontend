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

  restData = {
    ...restData,
    ...(data?.deliveryData || {}),
    ...(data?.adminData || {}),
  };

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
  return { ...tempData, products: newProducts };
};

export const prepareProducts = (data) => {
  const newProducts = data.products?.map((prod) => {
    const { productId, quantity } = prod;
    return { productId, quantity };
  });

  return { products: newProducts };
};

export const prepareDataForCreateOrder = (data) => {
  const clean = cleanEmptyFieldsInObject(data);
  const { products, legalEntityData, ...rest } = clean;

  return { products, legalEntityData };
};
//    Fields NOT used
// updatedAt,  
//   userComment,
//   userMiddleName,
//   userSurname, totalTypeOfProducts,
//   userType, deliveryData, adminData,
//   username, email, createdAt, _id,
//   totalProducts, totalPrice, totalPriceWithDelivery,

export const prepareDataForCopyOrder = (data) => {
  const clean = cleanEmptyFieldsInObject(data);
  const {
    products,
    legalEntityData,
    userComment,
    userMiddleName,
    userSurname,
    userType,
    username,
    email,
    phone,
    ...rest
  } = clean;

  return {
    products,
    legalEntityData,
    userComment,
    userMiddleName,
    userSurname,
    userType,
    username,
    email,
    phone,
  };
};
//    Fields NOT used
//     _id,    
//     deliveryData,
//     adminData,
//     totalTypeOfProducts,
//     totalProducts,
//     totalPrice,
//     totalPriceWithDelivery,createdAt,updatedAt,
