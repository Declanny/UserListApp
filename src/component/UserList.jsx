// src/components/UserList.js

import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserList.css';

const UserList = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setListOfUsers(response.data);
      } catch (error) {
        setError("There was an error fetching the users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = listOfUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-list">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul className="user-list-items">
        {filteredUsers.map(user => (
          <li key={user.id} className="user-item">
            <Link to={`/user/${user.id}`} className="user-link">
              <strong>{user.name}</strong> - {user.email}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
