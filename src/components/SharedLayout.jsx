import { Link, NavLink, Outlet } from "react-router-dom"

export const SharedLayout = () => {
    return (
        <div>
            <NavLink>
        <Link to="/">Статистика</Link>
        <Link to="/products">Продукти</Link>
        <Link to="/clients">Клієнти</Link>
        <Link to="/orders">Замовлення</Link>
        <Link to="chatbot">Чатбот</Link>
        <Link to="/profile">Мій профіль</Link>
        <Link to="/manager">Менеджери</Link>
            </NavLink>
            <Outlet />
        </div>
        
    )
}