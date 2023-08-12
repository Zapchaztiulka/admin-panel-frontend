import { Router } from "../routes";
import { useDispatch } from 'react-redux';
import {  useEffect } from 'react';
import { useAuth } from "../hooks";
import { refreshUser } from "../redux/auth/operations";

function App() {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser())
  }, [dispatch]);
  
  return (
    <>
      {!isRefreshing && (<Router />)}
    </>
  );
}


export default App;
