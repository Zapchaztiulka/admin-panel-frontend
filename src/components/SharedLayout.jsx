import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppBar } from "./Header/AppBar";
import { useAuth } from "../hooks";
import { Container } from "./Сommon/Container";

export const SharedLayout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn && <AppBar />}

      <Suspense>
        <main>
          {" "}
          <Container containerStyle='mt-[56px] tablet1024:ml-[250px] tablet1024:mt-0'>
            <Outlet />
          </Container>
        </main>
      </Suspense>
    </>
  );
};
// fallback={}
