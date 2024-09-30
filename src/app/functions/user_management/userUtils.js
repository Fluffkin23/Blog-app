import axios from "axios";
import {toast} from "react-toastify";
import {useSession} from "next-auth/react";

export const deleteUser = async (id, users, setUsers) =>
{
    try
    {
        const response = await axios.delete(`/api/user?id=${id}`);
        if (response.data.success)
        {
            setUsers(users.filter((user) => user._id !== id));
            toast.success("User deleted successfully");
        }
        else
        {
            throw new Error(response.data.msg);
        }
    }
    catch (error)
    {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
    }
}

export const makeAdmin = async (id, users, setUsers) =>
{
    console.log("Making user admin, ID:", id);
    try
    {
        const response = await axios.patch(`/api/user?id=${id}`, {role: "admin"});
        if (response.data.success) {
            setUsers(users.map((user) => user._id === id ? {...user, role: "admin"} : user));
            toast.success("User role updated to admin");
        }
        else
        {
            throw new Error(response.data.msg);
        }
    }
    catch (error)
    {
        console.error("Error updating user role",error);
        toast.error("Failed to update user role")
    }
}

export const makeUser = async (id, users, setUsers) =>
{
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
}

export function useAuth(requiredRole = "admin") {
    const {data: session, status} = useSession();
    const isLoading = status === "loading";
    const isAuthenticated = !!session; // Ensure true when session exists
    const hasRequiredRole = isAuthenticated && session.user.role === requiredRole;

    return {  // Make sure to start the object on the same line as the return keyword
        isLoading,
        isAuthenticated,
        hasRequiredRole,
    };
}
