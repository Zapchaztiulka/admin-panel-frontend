
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../redux/products/operations";
import { selectProducts, selectTotalCount } from "../redux/products/selectors";
import { ProductsNavigation } from "../components/Products/ProductsNavigation";

const Products = () => {
  const dispatch = useDispatch();
  // const products = useSelector(selectProducts);
  // const totalCount = useSelector(selectTotalCount);
    useEffect(() => {
    dispatch(fetchProducts({
  page: 1,
  limit: 40,
  // query:'',
    }));
      
    }, [dispatch]);
  
  // console.log(products);
  // console.log(totalCount);
  return (

    <div>
      <h1>Products.....</h1>
      
    <ProductsNavigation />

        
    </div>
  );
};
export default Products;
