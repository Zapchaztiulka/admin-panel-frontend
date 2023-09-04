import { useAuth } from "../../hooks";
// import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { ROLE } from "../../utils/constants";

// const Link = styled(NavLink)`
//   display: inline-block;
//   padding: 16px 10px;

//   text-decoration: none;
//   font-weight: 500;
//   color: #000;

//   &.active {
//     color: #b92f2c;
//   }
//   &:hover,
//   &:focus {
//     text-decoration: underline;
//   }
// `;
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
