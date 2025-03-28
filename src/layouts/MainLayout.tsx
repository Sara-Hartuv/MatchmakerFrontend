import { Outlet } from "react-router-dom";
import NavBar from "../sections/nav/navbar";

export default function MainLayout() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}
