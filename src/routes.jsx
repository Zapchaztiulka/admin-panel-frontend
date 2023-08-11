import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { TemporaryComponent } from "./components/TemporaryComponent";
import { RegisterForm } from "./components/RegisterForm";
import { SharedLayout } from "./components/SharedLayout";
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from "./components/PrivateRoute";

const StatisticsPage = lazy(() => import("./pages/Statistics"));
const LogInPage = lazy(() => import("./pages/Login"));
const ProductsPage = lazy(() => import("./pages/Products"));
const ClientsPage = lazy(() => import("./pages/Clients"));
const OrdersPage = lazy(() => import("./pages/Orders"));
const ChatbotPage = lazy(() => import("./pages/Chatbot"));
const MyProfilePage = lazy(() => import("./pages/MyProfile"));
const ManagersPage = lazy(() => import("./pages/Managers"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

export const Router = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <SharedLayout />,
      children: [
        { index: true, element:<RestrictedRoute component={<LogInPage />} redirectTo="/statistics"/>},
        // LogInRoute,
        StatisticsRoute,
        ProductsRoute,
        ClientsRoute,
        OrdersRoute,
        ChatbotRoute,
        ProfileRoute,
        ManagerRoute,
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return element;
};
export const StatisticsRoute = {
  path: "/statistics",
  element: <PrivateRoute component={<StatisticsPage />} redirectTo="/"/>,
};
// export const LogInRoute = {
//   path: "/login",
//   element: <RestrictedRoute component={<LogInPage />} redirectTo="/"/>,
// };

export const ProductsRoute = {
  path: "/products",
  element: <PrivateRoute component={<ProductsPage />} redirectTo="/"/>,
  children: [
    { path: "add", element: <TemporaryComponent title="Додати товар" /> },
    { path: "edit", element: <TemporaryComponent title="Оновити товар" /> },
  ],
};
export const ClientsRoute = {
  path: "/clients",
  element: <PrivateRoute component={<ClientsPage />} redirectTo="/"/>,
};

export const OrdersRoute = {
  path: "/orders",
  element: <PrivateRoute component={<OrdersPage />} redirectTo="/"/>,
  children: [
    { path: "pending", element: <TemporaryComponent title="Додати товар" /> },
    {
      path: "processed",
      element: <TemporaryComponent title="Оновити товар" />,
    },
  ],
};

export const ChatbotRoute = {
  path: "/chatbot",
  element: <PrivateRoute component={<ChatbotPage />} redirectTo="/"/>,
};

export const ProfileRoute = {
  path: "/profile",
  element: <PrivateRoute component={<MyProfilePage />} redirectTo="/"/>,
};

export const ManagerRoute = {
  path: "/manager",
  element: <PrivateRoute component={<ManagersPage />} redirectTo="/"/>,
  children: [
    { path: "register", element: <RegisterForm /> },
    {
      path: "delete",
      element: <TemporaryComponent title="Видалити існуючого менеджера" />,
    },
    {
      path: "statistics",
      element: (
        <TemporaryComponent title="Інфо/статистика по кожному менеджер" />
      ),
    },
  ],
};
