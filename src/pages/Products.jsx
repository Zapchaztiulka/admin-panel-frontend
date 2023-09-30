import { Link, Outlet } from "react-router-dom";

const Products = () => {
  return (
     <div>
      <h1>Products</h1>
      <ul>
        <li>
          <Link to="add">Додати товар + </Link>
        </li>
        <li>
          <Link to="edit">Множинне додавання товарів +</Link>
        </li>
        <li>
          Імпортувати дані з таблиці +
        </li>
      </ul>
      <Outlet />
    </div>
  )
};
export default Products;
