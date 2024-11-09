import React, {useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import {useAuth} from "../AuthContext.jsx"
import "../styles/Navbar.css";




function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const {user,logout} = useAuth();
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        const fetchCategories = async () => {
                try {
                    const response = await fetch(`http://localhost:8083/category/get-all`, {
                        method:`GET`,
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    if(!response.ok){
                        throw new Error(`HTTP Error status ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(data);
                    setCategories(data);
                }catch(err){
                    console.log(err);
                }

        }
        fetchCategories()
    },[])



    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className={"navbar"}>

            {user ? (
                <Link className={"NavbarLink"} to="/user">Account</Link>
            ):(
                <Link className={"NavbarLink"} to="/">Home</Link>
            )}
            <div className={"dropdown"}>
                <button className={"dropdownButton"} onClick={toggleDropdown}>Categories</button>

                {showDropdown && (
                    <div className={"dropdownContent"}>
                        {categories.map((category) => (
                            <Link key={category.name} to={`/categories/${category.name}`} onClick={toggleDropdown} state={{ categoryId: category.id }} >
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