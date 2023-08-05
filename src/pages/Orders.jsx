import { Link, Outlet } from "react-router-dom";

const Orders = () => {
  return (
        <div>
      <h1>Orders</h1>
      <ul>
        <li>
          <Link to="pending">Нові замовлення</Link>
        </li>
        <li>
          <Link to="processed">Опрацьовані замовлення</Link>
        </li>
      
      </ul>
      <Outlet />
    </div>
  )
};

export default Orders;
