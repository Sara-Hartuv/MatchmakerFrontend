import { Outlet } from "react-router-dom";
//import NavBar from "../sections/nav/NavBar";

export default function Layout() {
 /*<header><NavBar /></header>*/
    return <>
      
        <main><Outlet /></main>
        <footer></footer>
    </>

}

