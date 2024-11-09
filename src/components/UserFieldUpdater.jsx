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
    const dataValidationSchema=Yup.object({
        [fieldName]: Yup.string().required(`${fieldLabel} must be provided`),
    });

    const handleUpdate = async (values) => {
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
            console.log(response);
            handleSetUpdate()
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            {update ? (
                    <Formik
                        initialValues={{ [fieldName]: fieldValue || '' }}
                        validationSchema={dataValidationSchema}
                        onSubmit={handleUpdate}
                    >
                        {() => (
                            <Form className="userFieldUpdaterForm">
                                <div>
                                    <label htmlFor={fieldName}>{fieldLabel}:</label>
                                    <Field name={fieldName} type="text" />
                                    <ErrorMessage name={fieldName} component="div" className="error" />
                                </div>
                                <div className="userFieldUpdaterButtons">
                                    <button className="userPanelButton" type="submit">Save</button>
                                    <button className="userPanelButton" type="button" onClick={handleSetUpdate}>Cancel</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )
                :
                (<div>
                    <p>{fieldLabel}: {fieldValue}</p>
                    <button className={"userPanelButton"} onClick={handleSetUpdate}>Update</button>
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