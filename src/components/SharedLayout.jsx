import { Suspense } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from 'styled-components';

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

export const SharedLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Статистика</Link>
        <Link to="/products">Продукти</Link>
        <Link to="/clients">Клієнти</Link>
        <Link to="/orders">Замовлення</Link>
        <Link to="chatbot">Чатбот</Link>
        <Link to="/profile">Мій профіль</Link>
        <Link to="/manager">Менеджери</Link>
      </nav>
      <Suspense > 
        <main>
          {" "}
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
};
// fallback={}