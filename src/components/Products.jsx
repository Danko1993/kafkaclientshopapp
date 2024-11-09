import React, { useState, useEffect } from 'react';
import "../styles/Products.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    // Pobieranie produktów z API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8083/product/get-all');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term.length > 0) {
            const filtered = products.filter(product =>
                product.producerCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredProducts(filtered);
            setSuggestions(filtered.slice(0, 5));
        } else {
            setFilteredProducts(products);
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (code) => {
        setSearchTerm(code);
        const filtered = products.filter(product =>
            product.producerCode.toLowerCase().includes(code.toLowerCase())
        );
        setFilteredProducts(filtered);
        setSuggestions([]);
    };

    return (
        <div className="products-container">
            <h1>Products List</h1>
            <input
                type="text"
                placeholder="Search by Producer Code"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />

            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((product, index) => (
                        <li
                            key={index}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(product.producerCode)}
                        >
                            {product.producerCode}
                        </li>
                    ))}
                </ul>
            )}

            <div className="product-list">
                {filteredProducts.map((product) => {
                    const imageUrl = product.imagePath ? product.imagePath.split("\\").pop() : "placeholder.png";
                    return (
                        <div key={product.id} className="product-card">
                            <img
                                src={`http://localhost:8083/photos/${imageUrl}`}
                                alt={product.name}
                                className="product-image"
                                loading="lazy"
                            />
                            <h3>{product.name}</h3>
                            <p><strong>Producer Code:</strong> {product.producerCode}</p>
                            <p><strong>Price:</strong> {product.price} {product.currency}</p>
                            <p><strong>Stock:</strong> {product.stockQuantity} pcs</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Products;
