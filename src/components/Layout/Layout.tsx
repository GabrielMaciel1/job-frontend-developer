import Header from "../Header/Header";
import "./style.css";
import { Outlet } from "react-router";

const Layout = () => {
    return (
        <div className="container">
            <Header />
            <Outlet />
        </div>
    );
};

export default Layout;
