import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export function useFetchUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get("/api/user");
                setUsers(response.data.userData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user list:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error, setUsers };
}
