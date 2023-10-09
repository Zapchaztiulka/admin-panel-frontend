import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import { TemporaryComponent } from "./components/TemporaryComponent";
import { RegisterForm } from "./components/Forms/RegisterForm";
import { SharedLayout } from "./components/SharedLayout";
import { RestrictedRoute } from "./components/Routes/RestrictedRoute";
import { PrivateRoute } from "./components/Routes/PrivateRoute";
import { PrivateRouteSuperAdmin } from "./components/Routes/PrivateRouteSuperAdmin";

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
        {
          index: true,
          element: (
            <PrivateRoute
              component={<StatisticsPage />}
              test="StatisticsPage"
              redirectTo="/login"
            />
          ),
        },
        LogInRoute,
        ProductsRoute,
        ProductByIDRoute,
        AddProductRoute,
        MultipleAddProductRoute,
        ClientsRoute,
        OrdersRoute,
        ChatbotRoute,
        AdminProfileRoute,
        ManagerRoute,
        ManagerByIDRoute,
        StaticRoute,
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return element;
};

export const LogInRoute = {
  path: "/login",
  element: <RestrictedRoute component={<LogInPage />} redirectTo="/" />,
};

export const ProductsRoute = {
  path: "/products",
  element: <PrivateRoute component={<ProductsPage />} redirectTo="/login" />,
};
export const ProductByIDRoute = {
  path: "/products/:productId",
  element: (
    <PrivateRoute
      component={<TemporaryComponent title="Один товар" />}
      redirectTo="/login"
    />
  ),
};
export const AddProductRoute = {
  path: "/products/add",
  element: (
    <PrivateRoute
      component={<TemporaryComponent title="Додати товар" />}
      redirectTo="/login"
    />
  ),
};
export const MultipleAddProductRoute = {
  path: "/products/multipleadd",
  element: (
    <PrivateRoute
      component={<TemporaryComponent title="Додати товар" />}
      redirectTo="/login"
    />
  ),
};

export const ClientsRoute = {
  path: "/clients",
  element: <PrivateRoute component={<ClientsPage />} redirectTo="/login" />,
};

export const OrdersRoute = {
  path: "/orders",
  element: <PrivateRoute component={<OrdersPage />} redirectTo="/login" />,
  children: [
    {
      path: "pending",
      element: <TemporaryComponent title="Нові замовлення" />,
    },
    {
      path: "processed",
      element: <TemporaryComponent title="Опрацьовані замовлення" />,
    },
  ],
};

export const ChatbotRoute = {
  path: "/chatbot",
  element: <PrivateRoute component={<ChatbotPage />} redirectTo="/login" />,
};

export const AdminProfileRoute = {
  path: "/profile",
  element: <PrivateRoute component={<MyProfilePage />} redirectTo="/login" />,
};
//
export const ManagerByIDRoute = {
  path: "/manager/:managerId",
  element: (
    <PrivateRouteSuperAdmin
      component={<TemporaryComponent title="Інфо по одному менеджеру" />}
      redirectTo="/login"
    />
  ),
};
export const ManagerRoute = {
  path: "/manager",
  element: (
    <PrivateRouteSuperAdmin component={<ManagersPage />} redirectTo="/" />
  ),
  children: [
    { path: "add", element: <RegisterForm /> },
    {
      path: "statistics",
      element: (
        <TemporaryComponent title="Інфо/статистика по кожному менеджер" />
      ),
    },
  ],
};

export const StaticRoute = {
  path: "/static",
  element: (
    <PrivateRouteSuperAdmin
      component={<TemporaryComponent title="Статична інформація" />}
      redirectTo="/login"
    />
  ),
};
