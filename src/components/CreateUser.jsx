// src/components/CreateUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = ({ setUsers }) => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        username: 'USER-', // Default username format
        address: { street: '', city: '' },
        company: { name: '' },
        website: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('address')) {
            setUserData({
                ...userData,
                address: {
                    ...userData.address,
                    [name.split('.')[1]]: value // Update street or city
                }
            });
        } else if (name.startsWith('company')) {
            setUserData({
                ...userData,
                company: {
                    ...userData.company,
                    [name.split('.')[1]]: value // Update company name
                }
            });
        } else {
            setUserData({
                ...userData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userData.name || !userData.email || !userData.phone) {
            setError('Name, Email, and Phone are required');
            return;
        }

        axios.post('https://jsonplaceholder.typicode.com/users', userData)
            .then((response) => {
                setUsers((prevUsers) => [...prevUsers, { ...userData, id: response.data.id }]);
                alert('User created successfully');
                navigate('/'); // Redirect to the home page
            })
            .catch(() => setError('Failed to create user'));
    };

    return (
        <div className=' w-[90%] md:w-[95%] m-auto mt-5 mb-20'>
            <div className=" max-w-3xl">
                <h1 className="text-2xl font-bold mb-4">Create New User</h1>
                <p className=" text-base font-medium mb-4 text-[#AFB0B2]">
                    Enter details below to create a new user account.
                </p>
                <form onSubmit={handleSubmit} className="bg-white  rounded-lg ">
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            name="name"
                            type="text"
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
                            className="border rounded w-full py-2 px-3 text-gray-700"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            name="username"
                            type="text"
                            className="border rounded w-full py-2 px-3 text-gray-700"
                            value={userData.username}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Street</label>
                        <input
                            name="address.street"
                            type="text"
                            className="border rounded w-full py-2 px-3 text-gray-700"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">City</label>
                        <input
                            name="address.city"
                            type="text"
                            className="border rounded w-full py-2 px-3 text-gray-700"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Company Name</label>
                        <input
                            name="company.name"
                            type="text"
                            className="border rounded w-full py-2 px-3 text-gray-700"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Website</label>
                        <input
                            name="website"
                            type="text"
                            className="border rounded w-full py-2 px-3 text-gray-700"
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#063E50] hover:bg-[#063E60] text-white py-2 px-4 rounded w-1/3 float-end"
                    >
                        Submit
                    </button>
                    {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
