import React, { useState, useEffect } from 'react';
import { useAuth } from "../AuthContext.jsx";
import UserFieldUpdater from "./UserFieldUpdater.jsx";


const UserPanel = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user || !user.sub) {
                return;
            }

            try {
                const response = await fetch(`http://localhost:8081/client?email=${user.sub}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP Error status ${response.status}`);
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error occurred: {error}</p>;
    }

    if (!userData) {
        return <p>No user data</p>;
    }

    return (
        <div>
            <h1>{userData.name} {userData.surname}</h1>
            <UserFieldUpdater fieldName="phoneNumber" fieldLabel="Phone Number" fieldValue={userData.phoneNumber} />
            <UserFieldUpdater fieldName="address" fieldLabel="Address" fieldValue={userData.address} />
            <p>Email: {userData.email}</p>
        </div>
    );
};

export default UserPanel;
