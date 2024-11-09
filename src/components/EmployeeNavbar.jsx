import React from 'react';
import {Link} from "react-router-dom";
import {useAuth} from "../AuthContext.jsx"
import "../styles/Navbar.css";


function EmployeeNavbar(){
    const {user,logout} = useAuth();


    return(
        <nav className={"navbar"}>
            <Link className={"NavbarLink"} to="/products">Products</Link>
            <Link className={"NavbarLink"} to="/users">Users</Link>
            <Link className={"NavbarLink"} to="/orders">Orders</Link>
            {user.roles.includes("ADMIN") && <Link className={"NavbarLink"} to={"/register"}>Register Employee</Link>}
            <button className={"NavbarLink"} onClick={logout}>Logout</button>
        </nav>
    )


}

export default EmployeeNavbar;