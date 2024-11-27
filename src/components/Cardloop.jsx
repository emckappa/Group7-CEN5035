import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default props => {
    const [userData,setUserData]=useState([])


    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setUserData(data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    }

    const data = userData.map( (object, index) => {
      return <li key={index}>
        <p>ID: {object.user_id}</p>
        <p>Username: {object.username}</p>
        <p>Email: {object.email}</p>
        <p>Role: {object.role}</p>
        <hr />
      </li>
    })

    return (
      <div>
        <h2>Cards</h2>

        <ul>{data}</ul>
      </div>
        
    );
};