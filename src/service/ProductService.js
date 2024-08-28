import axios from "axios";

const URL_PRODUCTS = "http://localhost:8080/products";
const URL_CATEGORY = "http://localhost:8080/category"

export const getAllProducts = async (name) => {
    try {
        let productsResponse = await axios.get(URL_PRODUCTS + "?name_like=" + name);
        let categoryResponse = await axios.get(URL_CATEGORY);
        return{
            products : productsResponse.data,
            category : categoryResponse.data,
        };
    } catch (e){
        console.log(e);
        return {
            books: [], category: []
        }
    }
};
export const saveProduct = async (product)=> {
    try {
        await axios.post(URL_PRODUCTS,product);
        return true;
    } catch (e){
        console.log(e);
        return false;
    }
}
