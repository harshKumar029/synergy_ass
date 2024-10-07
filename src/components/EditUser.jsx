// src/components/EditUser.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = ({ users, setUsers }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = users.find(user => user.id === parseInt(id));
    if (user) {
      setUserData(user);
    } else {
      setError('User not found');
    }
  }, [id, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!userData.name || !userData.email || !userData.phone) {
      setError('Name, Email, and Phone are required');
      return;
    }

    setUsers((prevUsers) => 
      prevUsers.map((user) => (user.id === userData.id ? userData : user))
    );
    
    alert('User updated successfully');
    navigate('/');
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className=' w-[90%] md:w-[95%] m-auto my-5'>
    <div className="container   max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="bg-white  rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            name="name"
            type="text"
            value={userData.name}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={userData.email}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            name="phone"
            type="text"
            value={userData.phone}
            className="border rounded w-full py-2 px-3 text-gray-700"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#063E50] hover:bg-[#063E60] text-white py-2 px-4 rounded w-1/3 float-end"
          >
          Update
        </button>
      </form>
    </div>
    </div>
  );
};

export default EditUser;
