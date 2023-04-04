import { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';
import config from '../config.json';;

export default function UserList() {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const usersUrl = `${config.endpoint}`;

        try {
            const response = await axios.get(usersUrl);

            if (! response.status === 200) setUsers([]);;

            setUsers(response.data);

        } catch (e) {
            console.log(e);
            setUsers([]);
        } 

    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <h1>User List</h1>
    );
}