import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link, redirect} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";
import RegisterForm from "./RegisterForm.jsx";
import '../styles/LoginForm.css';

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();


    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,30}$/,
                'Password must be 8-30 characters long, contain at least one uppercase letter, one number, and one special character.'
            )
            .required('Required')
        ,
    });

    const handleSubmit = async (values) => {
        try {
            const response = await fetch('http://localhost:8081/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const { message:token } = await response.json();
            login(token);
            navigate("/user")
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({isSubmitting}) => (
                <Form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <Field type="email" name="email"/>
                        <ErrorMessage name="email" component="div" className="error-message"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <Field type="password" name="password"/>
                        <ErrorMessage name="password" component="div" className="error-message"/>
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                    <div>
                        <p className={"minorText"}>Dont have an account yet? </p>
                        <Link to={"/register"}>Register</Link>
                    </div>
                </Form>
            )}
        </Formik>

    );
};

export default LoginForm;
