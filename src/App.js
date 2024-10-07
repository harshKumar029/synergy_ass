// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import UserList from './components/UsersList';
import axios from 'axios';
import './App.css';
import SideBar from './components/SideBar';
import Header from './components/Header';
import { SidebarProvider } from './ContextApi';
import AuthLayout from './components/AuthLayout';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users on component mount
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <SidebarProvider>
      <Router>
        {/* <div className="container mx-auto p-4"> */}
          {/* <h1 className="text-3xl font-bold mb-4">User Management</h1> */}
              <AuthLayout>
              <Routes>
                <Route path="/" element={<Header title="User Management"><UserList users={users} setUsers={setUsers} /></Header>} />
                <Route path="/create" element={<Header title="CreateUser"><CreateUser setUsers={setUsers} /></Header>} />
                <Route path="/edit/:id" element={<Header title="EditUser"><EditUser users={users} setUsers={setUsers} /></Header>} />
              </Routes>
              </AuthLayout>
        {/* </div> */}
      </Router>
    </SidebarProvider>
  );
};

export default App;
