
import { Link, Outlet } from "react-router-dom";

const Managers = () => {
  return (
        <div>
      <h1>Managers</h1>
      <ul>
        <li>
          <Link to="add">Зареєструвати нового менеджера</Link>
        </li>
       
        <li>
          <Link to="statistics">Інфо/статистика по кожному менеджер</Link>
        </li>
      
      
      </ul>
      <Outlet />
    </div>
  )
};

export default Managers;
