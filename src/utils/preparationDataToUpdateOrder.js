export const prepareData = (data) => {
  const {_id, userId, totalTypeOfProducts,
    totalProducts,
    totalPrice,
    adminTag,
    userComment,
    adminData,
    createdAt, 
    updatedAt, ...restData} = data

Object.entries(restData).filter(item => {
  return item[1]
})
  
for (let key in restData) {
  if (!restData[key]) {
    delete  restData[key]
  }
}

  const newProducts = data.products?.map(prod => {
    const {productId, quantity } = prod
    return {productId, quantity }
  })
  
  return {...restData, products: newProducts}
}

