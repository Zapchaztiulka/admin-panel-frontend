import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../redux/products/operations";
import { ProductsNavigation } from "../components/Products/ProductsNavigation";

const Products = () => {
  const dispatch = useDispatch();
  const arrayQ = [];
  useEffect(() => {
    dispatch(
      fetchProducts({
        page: 1,
        limit: 40,
        // query:'',
      })
    );
  }, [dispatch]);

  return (
    <>
      <h1>Products.....</h1>
      <ProductsNavigation />
      {arrayQ.map(item => 
      (  <div key={item}>{item}</div>)
      )}
    </>
  );
};
export default Products;
