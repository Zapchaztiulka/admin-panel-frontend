import ApiClient from '../client'

//operations with categories

export const getAllCategories = async () => {
    const { data } = await ApiClient.get("categories");
    return data.categories;
};
  
export default {
    getAllCategories
  };