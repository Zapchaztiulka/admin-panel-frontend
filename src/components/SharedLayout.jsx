import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppBar } from "./Header/AppBar";
import { useAuth } from "../hooks";





export const SharedLayout = () => {
  const {isLoggedIn} = useAuth()
  return (
    <>
  {isLoggedIn && <AppBar />}
      
      <Suspense>
        <main>
          {" "}
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};
// fallback={}
