import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
// import Login from '../pages/Login';
import { TemporaryComponent } from "./TemporaryComponent";
import { SharedLayout } from "./SharedLayout";
import { RegisterForm } from "./RegisterForm";

const StatisticsPage = lazy(() => import("../pages/Statistics"));
const ProductsPage = lazy(() => import("../pages/Products"));
const ClientsPage = lazy(() => import("../pages/Clients"));
const OrdersPage = lazy(() => import("../pages/Orders"));
const ChatbotPage = lazy(() => import("../pages/Chatbot"));
const MyProfilePage = lazy(() => import("../pages/MyProfile"));
const ManagersPage = lazy(() => import("../pages/Managers"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<StatisticsPage />} />
           <Route
            path="/login"
            element={<TemporaryComponent title="login" />}
          ></Route>
            <Route path="/products" element={<ProductsPage />}>
            <Route
              path="add"
              element={<TemporaryComponent title="Додати товар" />}
            />
            <Route
              path="edit"
              element={<TemporaryComponent title="Оновити товар" />}
            />
          </Route>
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/orders" element={<OrdersPage />}>
            <Route
              path="pending"
              element={<TemporaryComponent title="Нові замовлення" />}
            />
            <Route
              path="processed"
              element={<TemporaryComponent title="Опрацьовані замовлення" />}
            />
          </Route>
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/profile" element={<MyProfilePage />} />
          <Route path="/manager" element={<ManagersPage />}>
            <Route
              path="register"
              element={
                <RegisterForm />
              }
            />
            <Route
              path="delete"
              element={
                <TemporaryComponent title="Видалити існуючого менеджера" />
              }
            />
            <Route
              path="statistics"
              element={
                <TemporaryComponent title="Інфо/статистика по кожному менеджер " />
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
       
      </Routes>
       
    </>
  );
}


export default App;
