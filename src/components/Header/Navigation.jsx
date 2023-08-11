import { useAuth } from "../../hooks";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Link = styled(NavLink)`
  display: inline-block;
  padding: 16px 10px;

  text-decoration: none;
  font-weight: 500;
  color: #000;

  &.active {
    color: #b92f2c;
  }
  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;
export const Navigation = () => {
  const { isLoggedIn } = useAuth();
  return (
    <nav>
      {isLoggedIn && (

        <ul>
          <li>
            <Link to="/statistics">Статистика</Link>
          </li>
          <li>
            <Link to="/products">Продукти</Link>
          </li>
          <li>
            <Link to="/clients">Клієнти</Link>
          </li>
          <li>
            <Link to="/orders">Замовлення</Link>
          </li>
          <li>
            <Link to="chatbot">Чатбот</Link>
          </li>
          <li>
            <Link to="/profile">Мій профіль</Link>
          </li>
          <li>
            <Link to="/manager">Менеджери</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
