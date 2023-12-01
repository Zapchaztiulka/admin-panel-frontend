import ApiClient from '../client'

//operations with options

const fetchOptions = async (endpoint) => {
    const { data } = await ApiClient.get(`options/${endpoint}`);
    return data;
};

export default {
    fetchOptions
}