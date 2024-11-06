import React, {useEffect, useState} from 'react';
import {useAuth} from "../AuthContext.jsx";
import { useNavigate } from 'react-router-dom';
import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from 'yup';
import PropTypes from 'prop-types';


const UserFieldUpdater = ({fieldName, fieldLabel,fieldValue}) => {
    const [update, setUpdate] = useState(false);
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user){
            navigate('/login');
        }

    },[user,navigate]);

    const handleSetUpdate = () => {
        setUpdate(!update);

    }
    const phoneValidationSchema=Yup.object({
        [fieldName]: Yup.string().required(`${fieldLabel} must be provided`),
    });

    const handlePhoneUpdate = async (values) => {
        try {
            console.log("Token: ", localStorage.getItem('token'));
            const response = await fetch(`http://localhost:8081/client/update?email=${user.sub}`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            {update ? (
                    <Formik
                        initialValues={{ [fieldName]: fieldValue || '' }}
                        validationSchema={phoneValidationSchema}
                        onSubmit={handlePhoneUpdate}
                    >
                        {() => (
                            <Form>
                                <div>
                                    <label htmlFor={fieldName}>{fieldLabel}:</label>
                                    <Field name={fieldName} type="text" />
                                    <ErrorMessage name={fieldName} component="div" className="error" />
                                </div>
                                <button type="submit">Save</button>
                                <button type="button" onClick={handleSetUpdate}>Cancel</button>
                            </Form>
                        )}
                    </Formik>
                )
                :
                (<div>
                    <p>{fieldLabel}: {fieldValue}</p>
                    <button onClick={handleSetUpdate}>Update</button>
                </div>)

            }
        </div>
    )
}

UserFieldUpdater.propTypes = {
    fieldName: PropTypes.string.isRequired,
    fieldLabel: PropTypes.string.isRequired,
    fieldValue: PropTypes.string,
};

export default UserFieldUpdater;