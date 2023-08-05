import { Routes, Route, } from "react-router-dom";
import { lazy } from "react";
import Statistics from "../pages/Statistics";
// import Login from '../pages/Login';
import Products from "../pages/Products";
import Clients from "../pages/Clients";
import Orders from "../pages/Orders";
import Chatbot from "../pages/Chatbot";
import MyProfile from "../pages/MyProfile";
import Managers from "../pages/Managers";
import NotFound from "../pages/NotFound";
import { TemporaryComponent } from "./TemporaryComponent";
import { SharedLayout } from "./SharedLayout";

// const Statistics = lazy(() => import("../pages/About"));
function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<SharedLayout />} > 
        <Route index element={<Statistics />} />
        <Route path="/products" element={<Products />}>
          <Route path="add" element={<TemporaryComponent title='Додати товар' />} />
                <Route path="edit" element={<TemporaryComponent title='Оновити товар' />} />
        </ Route>
        <Route path="/clients" element={<Clients />} />
        <Route path="/orders" element={<Orders />} >
          <Route path='pending' element={<TemporaryComponent title='Нові замовлення' />} />
          <Route path="processed" element={<TemporaryComponent title='Опрацьовані замовлення' />} />
        </ Route>
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/manager" element={<Managers />} >
          <Route path='add' element={<TemporaryComponent title='Зареєструвати нового менеджера' />} />
          <Route path='delete' element={<TemporaryComponent title='Видалити існуючого менеджера' />} />
          <Route path='statistics' element={<TemporaryComponent title='Інфо/статистика по кожному менеджер ' />} />
        </ Route>
          <Route path="*" element={<NotFound />} />
          </ Route>
      </Routes>
    </>
  );
}

{/* <Route path="/login" element={<Login /> } /> */}
export default App;
