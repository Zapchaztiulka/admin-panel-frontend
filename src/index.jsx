import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { ModalProvider } from "./context/modalContext";
import { Notifications } from "./components/Notifications/Notifications";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ModalProvider>
          <BrowserRouter>
            <App />
            <Notifications />
          </BrowserRouter>
        </ModalProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
