import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/ProductCard.css';

function ProductCard({ product, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const imageUrl = product.imagePath ? product.imagePath.split("\\").pop() : "placeholder.png";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleSave = () => {
        onUpdate(product.id, updatedProduct);
        setIsEditing(false);
    };

    return (
        <div className="product-card">
            <img
                src={`http://localhost:8083/photos/${imageUrl}`}
                alt={product.name}
                className="product-image"
                loading="lazy"
            />
            {isEditing ? (
                <>
                    <input type="text" name="name" value={updatedProduct.name} onChange={handleInputChange}/>
                    <input type="text" name="brand" value={updatedProduct.brand} onChange={handleInputChange}/>
                    <input type="text" name="model" value={updatedProduct.model} onChange={handleInputChange}/>
                    <textarea name="description" value={updatedProduct.description} onChange={handleInputChange}/>
                    <input type="number" name="price" value={updatedProduct.price} onChange={handleInputChange}/>
                    <input type="text" name="currency" value={updatedProduct.currency} onChange={handleInputChange}/>
                    <input type="number" name="weight" value={updatedProduct.weight} onChange={handleInputChange}/>
                    <div className="product-card-buttons">
                        <button onClick={handleSave}>Save</button>
                        <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <h3>{product.name}</h3>
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>Model:</strong> {product.model}</p>
                    <p className="product-description"><strong>Description:</strong> {product.description}</p>
                    <p><strong>Weight:</strong> {product.weight} kg</p>
                    <p><strong>Price:</strong> {product.price} {product.currency}</p>
                    <p><strong>Stock:</strong> {product.stockQuantity} pcs</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </>
            )}
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        producerCode: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        weight: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        stockQuantity: PropTypes.number.isRequired,
        imagePath: PropTypes.string,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
