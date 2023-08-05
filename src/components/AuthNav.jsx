import { NavLink } from "react-router-dom"

export const AuthNav = () => {
    return (
        <div>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    )
}