import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/AddProductForm.css';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8083/category/get-all');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const initialValues = {
        name: '',
        description: '',
        categoryName: '',
        price: '',
        stockQuantity: '',
        producerCode: '',
        weight: '',
        brand: '',
        model: '',
        currency: 'USD',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        categoryName: Yup.string().required('Category is required'),
        price: Yup.number().required('Price is required').positive('Price must be positive'),
        stockQuantity: Yup.number().required('Stock quantity is required').integer().min(0, 'Must be 0 or more'),
        producerCode: Yup.string().required('Producer code is required'),
        weight: Yup.number().required('Weight is required').positive('Weight must be positive'),
        brand: Yup.string().required('Brand is required'),
        model: Yup.string().required('Model is required'),
        currency: Yup.string().required('Currency is required'),
    });

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (values, { resetForm }) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No authorization token found. Please log in.');
            navigate('/login');
            return;
        }

        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        formData.append('data', new Blob([JSON.stringify(values)], { type: 'application/json' }));

        try {
            const response = await fetch('http://localhost:8083/product/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                    // Nie ustawiaj ręcznie 'Content-Type', aby przeglądarka mogła ustawić boundary automatycznie
                },
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`HTTP Error: ${response.status}`, errorText);
                throw new Error(`HTTP Error status ${response.status}`);
            }

            alert('Product added successfully!');
            resetForm();
            navigate('/products');
        } catch (error) {
            console.error('Error:', error);
            alert(`Failed to add product: ${error.message}`);
        }
    };

    return (
        <div className="add-product-container">
            <h1>Add New Product</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <Field type="text" name="name" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <Field as="textarea" name="description" />
                            <ErrorMessage name="description" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="categoryName">Category:</label>
                            <Field as="select" name="categoryName">
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="category" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <Field type="number" name="price" step="0.01" />
                            <ErrorMessage name="price" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="stockQuantity">Stock Quantity:</label>
                            <Field type="number" name="stockQuantity" />
                            <ErrorMessage name="stockQuantity" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="producerCode">Producer Code:</label>
                            <Field type="text" name="producerCode" />
                            <ErrorMessage name="producerCode" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="weight">Weight (kg):</label>
                            <Field type="number" name="weight" step="0.01" />
                            <ErrorMessage name="weight" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="brand">Brand:</label>
                            <Field type="text" name="brand" />
                            <ErrorMessage name="brand" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="model">Model:</label>
                            <Field type="text" name="model" />
                            <ErrorMessage name="model" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="currency">Currency:</label>
                            <Field as="select" name="currency">
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="PLN">PLN</option>
                            </Field>
                            <ErrorMessage name="currency" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="file">Product Image:</label>
                            <input type="file" name="file" onChange={handleFileChange} />
                        </div>

                        <button type="submit" disabled={isSubmitting} className="submit-button">
                            {isSubmitting ? 'Adding...' : 'Add Product'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddProductForm;
