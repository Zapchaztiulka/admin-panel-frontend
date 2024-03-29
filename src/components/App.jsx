import { Router } from "../routes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "../hooks";
import { refreshUser } from "../redux/auth/operations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "./Common/Loader";
import { fetchPatternsOptions } from "@/redux/options/operations";

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchPatternsOptions());
  }, [dispatch]);

  return (
    <>
        {isRefreshing ? (
       <Loader />
      ) : (
        <Router />
      )}
      <ToastContainer
        autoClose={8000}
        hideProgressBar={true}
        position="top-right"
      />
    </>
  );
}

export default App;
