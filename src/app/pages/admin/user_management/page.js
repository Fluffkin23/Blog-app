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
import {useFetchUsers} from "@/app/functions/user_management/useFetchUsers";
import {deleteUser, makeAdmin, makeUser, useAuth} from "@/app/functions/user_management/userUtils";


export default function UserManagement()
{
    const { isAuthenticated, hasRequiredRole } = useAuth('admin');
    const { users, loading, error, setUsers } = useFetchUsers(); // Use the custom hook

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching users</p>;
    if (!isAuthenticated) return <p>You need to be logged in to view this page</p>;
    if (!hasRequiredRole) return <p>You need to be an admin to view this page</p>;



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
                                        onClick={() => deleteUser(user._id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>

                                    {/* Change Role Button */}
                                    {user.role === "admin" ? (
                                        // If user is admin, show "Make User" icon
                                        <IconButton
                                            onClick={() => makeUser(user._id, users,setUsers)}
                                            color="secondary"
                                        >
                                            <PersonIcon /> {/* Use a regular person icon for "Make User" */}
                                        </IconButton>
                                    ) : (
                                        // If user is not admin, show "Make Admin" icon
                                        <IconButton
                                            onClick={() => makeAdmin(user._id, users,setUsers)}
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