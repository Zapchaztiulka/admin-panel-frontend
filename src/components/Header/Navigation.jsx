import { useAuth } from "../../hooks";
import { NavLink } from "react-router-dom";
import { ROLE } from "../../utils/constants";

export const Navigation = () => {
  const { isLoggedIn, user } = useAuth();
  return (
    <nav>
      {isLoggedIn && (

        <ul>
          <li>
            <NavLink to="/">Статистика</NavLink>
          </li>
          <li>
            <NavLink to="/products">Продукти</NavLink>
          </li>
          <li>
            <NavLink to="/clients">Клієнти</NavLink>
          </li>
          <li>
            <NavLink to="/orders">Замовлення</NavLink>
          </li>
          <li>
            <NavLink to="chatbot">Чатбот</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Мій профіль</NavLink>
          </li>
          {user.role === ROLE.superAdmin && (<li>
            <NavLink to="/manager">Менеджери</NavLink>
          </li>)}
        </ul>
      )}
    </nav>
  );
};
