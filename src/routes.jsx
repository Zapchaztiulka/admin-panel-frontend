import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { TemporaryComponent } from './components/TemporaryComponent';
import { RegisterForm } from './components/Forms/RegisterForm';
import { SharedLayout } from './components/SharedLayout';

import { RestrictedRoute } from './components/Routes/RestrictedRoute';
import { PrivateRoute } from './components/Routes/PrivateRoute';
import { PrivateRouteSuperAdmin } from './components/Routes/PrivateRouteSuperAdmin';
import { AddOneProduct } from './components/Products/AddOneProduct';

const StatisticsPage = lazy(() => import('./pages/Statistics'));
const LogInPage = lazy(() => import('./pages/Login'));
const ProductsPage = lazy(() => import('./pages/Products/Products'));
const ClientsPage = lazy(() => import('./pages/Clients'));
const OrdersPage = lazy(() => import('./pages/Orders/Orders'));
const OrderDetailsPage = lazy(() =>
  import('./pages/Orders/Details/OrderDetailsPage')
);
const ChatbotPage = lazy(() => import('./pages/Chatbot'));
const MyProfilePage = lazy(() => import('./pages/MyProfile'));
const ManagersPage = lazy(() => import('./pages/Managers'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));

export const Router = () => {
  let element = useRoutes([
    {
      path: '/',
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
        OrderDetailsRoute,
        OrdersRoute,
        ChatbotRoute,
        AdminProfileRoute,
        ManagerRoute,
        ManagerByIDRoute,
        StaticRoute,
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);
  return element;
};

export const LogInRoute = {
  path: '/login',
  element: <RestrictedRoute component={<LogInPage />} redirectTo="/" />,
};

export const ProductsRoute = {
  path: '/products',

  element: (
    <ErrorBoundary
      fallback={
        <TemporaryComponent title="Something went wrong on the Product page" />
      }
    >
      <PrivateRoute component={<ProductsPage />} redirectTo="/login" />
    </ErrorBoundary>
  ),
};
export const ProductByIDRoute = {
  path: '/products/:productId',
  element: (
    <ErrorBoundary
      fallback={
        <TemporaryComponent title="Something went wrong on the ProductByID page" />
      }
    >
      <PrivateRoute
        component={<TemporaryComponent title="Один товар" />}
        redirectTo="/login"
      />
    </ErrorBoundary>
  ),
};
export const AddProductRoute = {
  path: '/products/add',
  element: (
    <ErrorBoundary
      fallback={
        <TemporaryComponent title="Something went wrong on the AddProduct page" />
      }
    >
      <PrivateRoute component={<AddOneProduct />} redirectTo="/login" />
    </ErrorBoundary>
  ),
};
export const MultipleAddProductRoute = {
  path: '/products/multipleadd',
  element: (
    <ErrorBoundary
      fallback={
        <TemporaryComponent title="Something went wrong on the MultipleAddProduct page" />
      }
    >
      <PrivateRoute
        component={<TemporaryComponent title="Додати товар" />}
        redirectTo="/login"
      />
    </ErrorBoundary>
  ),
};

export const ClientsRoute = {
  path: '/clients',
  element: (
    <ErrorBoundary
      fallback={
        <TemporaryComponent title="Something went wrong on the Clients page" />
      }
    >
      <PrivateRoute component={<ClientsPage />} redirectTo="/login" />
    </ErrorBoundary>
  ),
};

export const OrdersRoute = {
  path: '/orders',
  element: <PrivateRoute component={<OrdersPage />} redirectTo="/login" />,
  children: [
    {
      path: 'details/:id',
      element: (
        <PrivateRoute component={<OrderDetailsPage />} redirectTo="/login" />
      ),
    },
    {
      path: 'pending',
      element: (
        <ErrorBoundary
          fallback={
            <TemporaryComponent title="Something went wrong on the Orders/pending page" />
          }
        >
          <TemporaryComponent title="Нові замовлення" />
        </ErrorBoundary>
      ),
    },
    {
      path: 'processed',
      element: (
        <ErrorBoundary
          fallback={
            <TemporaryComponent title="Something went wrong on the Orders/processed page" />
          }
        >
          <TemporaryComponent title="Опрацьовані замовлення" />
        </ErrorBoundary>
      ),
    },
  ],
};

export const OrderDetailsRoute = {
  path: '/orders/details/:id',
  element: (
    <PrivateRoute component={<OrderDetailsPage />} redirectTo="/login" />
  ),
};

export const ChatbotRoute = {
  path: '/chatbot',
  element: (
    <ErrorBoundary
      fallback={
        <TemporaryComponent title="Something went wrong on the Chatbot page" />
      }
    >
      <PrivateRoute component={<ChatbotPage />} redirectTo="/login" />
    </ErrorBoundary>
  ),
};

export const AdminProfileRoute = {
  path: '/profile',
  element: (
    <ErrorBoundary
      fallback={
        <TemporaryComponent title="Something went wrong on the AdminProfile page" />
      }
    >
      <PrivateRoute component={<MyProfilePage />} redirectTo="/login" />
    </ErrorBoundary>
  ),
};
//
export const ManagerByIDRoute = {
  path: '/manager/:managerId',
  element: (
    <ErrorBoundary
      fallback={
        <TemporaryComponent title="Something went wrong on the ManagerByIDRoute page" />
      }
    >
      <PrivateRouteSuperAdmin
        component={<TemporaryComponent title="Інфо по одному менеджеру" />}
        redirectTo="/login"
      />
    </ErrorBoundary>
  ),
};
export const ManagerRoute = {
  path: '/manager',
  element: (
    <PrivateRouteSuperAdmin component={<ManagersPage />} redirectTo="/" />
  ),
  children: [
    {
      path: 'add',
      element: (
        <ErrorBoundary
          fallback={
            <TemporaryComponent title="Something went wrong on the Manager/add page" />
          }
        >
          <RegisterForm />
        </ErrorBoundary>
      ),
    },
    {
      path: 'statistics',
      element: (
        <ErrorBoundary
          fallback={
            <TemporaryComponent title="Something went wrong on the Manager/statistics page" />
          }
        >
          <TemporaryComponent title="Інфо/статистика по кожному менеджер" />
        </ErrorBoundary>
      ),
    },
  ],
};

export const StaticRoute = {
  path: '/static',
  element: (
    <ErrorBoundary
      fallback={
        <TemporaryComponent title="Something went wrong on the Static page" />
      }
    >
      <PrivateRouteSuperAdmin
        component={<TemporaryComponent title="Статична інформація" />}
        redirectTo="/login"
      />
    </ErrorBoundary>
  ),
};
