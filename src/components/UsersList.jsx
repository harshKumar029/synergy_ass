// src/components/UserList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users, setUsers }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id) => {
        setUsers((prevUsers) => prevUsers.filter(user => user.id !== id));
    };

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
    );

    return (
        <div className='w-[90%] md:w-[95%] m-auto my-5'>
            <div className='flex justify-between flex-col md:flex-row items-center my-8'>
                <h1 className='text-[#353535] font-bold text-xl'>Total Users {filteredUsers.length}</h1>

                <div className='flex gap-3 items-center'>
                    <form className="mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search by Name, Email, or Phone..."
                                required
                            />
                        </div>
                    </form>

                    <Link to="/create" className="md:bg-[black] font-medium md:font-normal md:hover:bg-[#171717] flex gap-2 md:text-white py-2 md:px-4 rounded">
                        <svg className='w-4' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Add User
                    </Link>
                </div>
            </div>

            {/* Table View - Visible only on larger screens */}
            <div className="hidden md:block relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#ebebeb] dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="odd:bg-white even:bg-white border-b dark:border-[#e4e3e3]">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.phone}</td>
                                <td className="px-6 py-4">
                                    <Link to={`/edit/${user.id}`} className="text-blue-600 hover:underline">Edit</Link>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-500 hover:underline ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Responsive display for smaller screens */}
            <div className="block md:hidden">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="border-b border-gray-300 py-4">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-gray-600">Email: {user.email}</p>
                        <p className="text-gray-600">Phone: {user.phone}</p>
                        <div className="mt-2">
                            <Link to={`/edit/${user.id}`} className="text-blue-600 hover:underline mr-2">Edit</Link>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className="text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
