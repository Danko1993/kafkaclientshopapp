import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../styles/Category.css"


function Category() {
    const [categoryProducts, setCategoryProducts] = useState([]);
    const { categoryName } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const categoryId = location.state?.categoryId;


    useEffect(() => {
        if (!categoryId) {
            console.warn("categoryId is missing. Redirecting...");
            navigate('/');
            return;
        }
    }, [categoryId, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8083/product/get-by-category?categoryId=${categoryId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCategoryProducts(data);
                console.log(data);
            } catch (err) {
                console.error(err);
            }
        };

        if (categoryId) {
            fetchData();
        }
    }, [categoryId]);

    return (
        <div className="container">
            <h1>{categoryName}</h1>
            {categoryProducts.length === 0 ? (
                <p>No products available for this category.</p>
            ) : (
                categoryProducts.map((product, index) => {

                    const imageUrl = product.imagePath
                        ? `http://localhost:8083/photos/${product.imagePath.split('\\').pop()}`
                        : "/placeholder.png";

                    return (
                        <div key={product.id || index} className="productWraper">
                            <img
                                src={imageUrl}
                                loading="lazy"
                                alt={product.name || "No name"}
                                className="productImage"
                            />
                            <h3>{product.name || "No name"}</h3>
                            <p className="productDescription">{product.description || "No description"}</p>

                            <div className="productDetails">
                                <p><strong>Category:</strong> {product.category || "No category"}</p>
                                <p><strong>Brand:</strong> {product.brand || "No brand"}</p>
                                <p><strong>Model:</strong> {product.model || "No model"}</p>
                                <p><strong>Producer Code:</strong> {product.producerCode || "No code"}</p>
                                <p><strong>Weight:</strong> {product.weight || "No weight"} kg</p>
                                <p><strong>Stock:</strong> {product.stockQuantity || "No stock"} pcs</p>
                                <p className="productPrice"><strong>Price:</strong> {product.price || "No price"} {product.currency || "No currency"}</p>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default Category;
