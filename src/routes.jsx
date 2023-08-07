import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { TemporaryComponent } from "./components/TemporaryComponent";
import { RegisterForm } from "./components/RegisterForm";
import { SharedLayout } from "./components/SharedLayout";

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
        { index: true, element: <StatisticsPage /> },
        LogInRoute,
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

export const LogInRoute = {
  path: "/login",
  element: <LogInPage />,
};

export const ProductsRoute = {
  path: "/products",
  element: <ProductsPage />,
  children: [
    { path: "add", element: <TemporaryComponent title="Додати товар" /> },
    { path: "edit", element: <TemporaryComponent title="Оновити товар" /> },
  ],
};
export const ClientsRoute = {
  path: "/clients",
  element: <ClientsPage />,
};

export const OrdersRoute = {
  path: "/orders",
  element: <OrdersPage />,
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
  element: <ChatbotPage />,
};

export const ProfileRoute = {
  path: "/profile",
  element: <MyProfilePage />,
};

export const ManagerRoute = {
  path: "/manager",
  element: <ManagersPage />,
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
