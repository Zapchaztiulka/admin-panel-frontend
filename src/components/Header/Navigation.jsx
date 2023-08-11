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
        <div>
          <Link to="/statistics">Статистика</Link>
                  <Link to="/products">Продукти</Link>
          <Link to="/clients">Клієнти</Link>
          <Link to="/orders">Замовлення</Link>
          <Link to="chatbot">Чатбот</Link>
          <Link to="/profile">Мій профіль</Link>
          <Link to="/manager">Менеджери</Link>
        </div>
      )}
    </nav>
  );
};
