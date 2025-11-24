import { Outlet } from "react-router";
import { AppHeader, AppFooter } from "../components";

export function DefaultLayout() {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
      <AppFooter />
    </>
  );
}
