import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppBar } from "./Header/AppBar";
import { useAuth } from "../hooks";
import { Container } from "./Сommon/Container";
import { Loader } from "./Common/Loader";

export const SharedLayout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn && <AppBar />}

   <Suspense fallback={<Loader />}>
        <main>
         
          <Container containerStyle='mt-[56px] tablet1024:ml-[250px] tablet1024:mt-0'>
            <Outlet />
          </Container>
        </main>
      </Suspense>
    </>
  );
};
// fallback={}
