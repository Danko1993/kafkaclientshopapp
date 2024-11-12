import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import '../styles/Products.css';

function Products() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

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

    const handleUpdate = async (productId, updatedProduct) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8083/product/update-product-data?productId=${productId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) throw new Error('Failed to update product');
            const updatedData = await response.json();
            console.log('Product updated:', updatedData);

            // Aktualizacja listy produktów
            setProducts(products.map(p => (p.id === productId ? updatedProduct : p)));
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div className="products-container">
            <h1>Products List</h1>
            <div className="add-product-button">
                <Link to="/add-product" className="add-product-link">Add New Product</Link>
            </div>
            <div className="product-list">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} onUpdate={handleUpdate} />
                ))}
            </div>
        </div>
    );
}

export default Products;
