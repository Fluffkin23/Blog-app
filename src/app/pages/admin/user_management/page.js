"use client";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Box from "@mui/material/Box";
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import {useSession} from "next-auth/react";


export default function UserManagement()
{
    const {data:session, status}=useSession();
    const [users,setUsers] = useState([]);

    useEffect(() => {
        // Fetch all users
        const fetchUsers = async () =>
        {
            try
            {
                const response = await axios.get("/api/user");
                setUsers(response.data.userData);
            }
            catch (error)
            {
                console.error("Error fetching user list:", error);
            }
        };
        fetchUsers();
    },[])

    if(status === 'loading')
    {
        return <p>Loading....</p>;
    }

    if(!session)
    {
        return <p>You need to be loggin in to view this page</p>;

    }
    const {role} = session.user;
    if(role !== 'admin')
    {
        return <p>You need to be admin in to view this page</p>;
    }

    // Function to delete a user
    const handleDelete = async (id) =>
    {
        try {
            const response = await axios.delete(`/api/user?id=${id}`);  // Make DELETE request
            if (response.data.success) {
                setUsers(users.filter((user) => user._id !== id));  // Update UI to remove the deleted user
                toast.success("User deleted successfully");
            } else {
                throw new Error(response.data.msg);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user");
        }
    };

    // function to make a user admin
    const handleMakeAdmin = async (id) =>
    {
        console.log("Making user admin, ID:", id);  // Debugging: Check if function is called
        try {
            const response = await axios.patch(`/api/user?id=${id}`, { role: "admin" });
            if (response.data.success) {
                setUsers(
                    users.map((user) =>
                        user._id === id ? { ...user, role: "admin" } : user
                    )
                );
                toast.success("User role updated to admin");
            } else {
                throw new Error(response.data.msg);
            }
        } catch (error) {
            console.error("Error updating user role:", error);
            toast.error("Failed to update user role");
        }
    };

    const handleMakeUser = async (id) => {
        try {
            const response = await axios.patch(`/api/user?id=${id}`, { role: "user" }); // Change role to user
            if (response.data.success) {
                setUsers(
                    users.map((user) =>
                        user._id === id ? { ...user, role: "user" } : user
                    )
                );
                toast.success("User role updated to regular user");
            } else {
                throw new Error(response.data.msg);
            }
        } catch (error) {
            console.error("Error updating user role:", error);
            toast.error("Failed to update user role");
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <h2>User Management</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    {/* Delete User Button */}
                                    <IconButton
                                        onClick={() => handleDelete(user._id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>

                                    {/* Change Role Button */}
                                    {user.role === "admin" ? (
                                        // If user is admin, show "Make User" icon
                                        <IconButton
                                            onClick={() => handleMakeUser(user._id)}
                                            color="secondary"
                                        >
                                            <PersonIcon /> {/* Use a regular person icon for "Make User" */}
                                        </IconButton>
                                    ) : (
                                        // If user is not admin, show "Make Admin" icon
                                        <IconButton
                                            onClick={() => handleMakeAdmin(user._id)}
                                            color="primary"
                                        >
                                            <AdminPanelSettingsIcon /> {/* Admin icon for "Make Admin" */}
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}