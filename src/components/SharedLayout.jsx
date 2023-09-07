import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Header/Navigation";





export const SharedLayout = () => {
  return (
    <>
    <Navigation />
      
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
