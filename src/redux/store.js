import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { optionsReduser } from "./options/optionsSlice";
import { productsReduser } from "./products/productsSlice";
import { chatReducer } from "./chat/slice";
import { ordersReducer } from "./orders/orderSlice";
import { notificationsReducer } from "./notifications/notificationsSlice";


const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};
export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    options: optionsReduser,
    products: productsReduser,
    chat: chatReducer,
    orders: ordersReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'notifications/addNotification'],
      },
    }),
});

export const persistor = persistStore(store);
