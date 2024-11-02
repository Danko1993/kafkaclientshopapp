import React from 'react';
import {useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../AuthContext.jsx"

const categories = [
    {id:"powerTools", name: "Power Tools"},
    {id:"handTools", name: "Hand Tools"}
]

function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const {user} = useAuth();
    const {logout} = useAuth();


    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className={"navbar"}>
            <Link className={"NavbarLink"} to="/">Home</Link>
            <Link className={"NavbarLink"} to="/all-products">Products</Link>
            <div className={"dropdown"}>
                <button className={"dropdownButton"} onClick={toggleDropdown}>Categories</button>

                {showDropdown && (
                    <div className={"dropdownContent"}>
                        {categories.map((category) => (
                            <Link key={category.id} to={`/categories/${category.id}`} onClick={toggleDropdown}>
                                {category.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            {
                user ? (
                    <button className={"NavbarLink"} onClick={logout}>Logout</button>
                ) : (
                    <Link className={"NavbarLink"} to="/login">Login</Link>
                )
            }
        </nav>
    )
}

export default Navbar;