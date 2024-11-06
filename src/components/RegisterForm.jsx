import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import "../styles/RegisterForm.css"

const RegisterForm = () => {
    const navigate = useNavigate();

    const initialValues = {
        name: '',
        surname: '',
        phoneNumber: '',
        email: '',
        address: '',
        password: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name must be provided'),
        surname: Yup.string().required('Surname must be provided'),
        phoneNumber: Yup.string().required('Phone number must be provided'),
        email: Yup.string().email('Invalid email format').required('Email must be provided'),
        address: Yup.string().required('Address must be provided'),
        password: Yup.string()
            .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,30}$/, 'Password must be between 8 and 30 characters long and contain at least one uppercase letter, one digit, and one special character.')
            .required('Password must be provided')
    });

    const handleSubmit = async (values) => {
        try {
            const response = await fetch('http://localhost:8081/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            navigate("/login")
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className="register-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field name="name" type="text" />
                    <ErrorMessage name="name" component="div" className="error-message" />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname</label>
                    <Field name="surname" type="text" />
                    <ErrorMessage name="surname" component="div" className="error-message" />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <Field name="phoneNumber" type="text" />
                    <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" />
                    <ErrorMessage name="email" component="div" className="error-message" />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <Field name="address" type="text" />
                    <ErrorMessage name="address" component="div" className="error-message" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" />
                    <ErrorMessage name="password" component="div" className="error-message" />
                </div>
                <button type="submit">Register</button>
            </Form>
        </Formik>
    );
};

export default RegisterForm;
