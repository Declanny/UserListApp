// src/components/UserDetail.js

import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../component/UserDetail.css';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
      } catch (error) {
        setError("There was an error fetching the user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-detail">
      {user ? (
        <>
          <h1>{user.name}</h1>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
        </>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default UserDetail;
