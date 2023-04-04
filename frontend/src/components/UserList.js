import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

import './UserList.css';
import config from '../config.json';;


export default function UserList() {

    const [users, setUsers] = useState([]);
    const headers = ["id", "name", "email", "role"];

    const SearchBar = () => (
        <TextField
            id="user-list-search-bar"
            placeholder="Search"
            type="search"
            variant="outlined"
            fullWidth
        />
    );

    const getTableCell = (value, alignment="center") => (
        <TableCell align={alignment}>{value}</TableCell>
    );

    const getTableRow = (user, headers) => (
        <TableRow
        key={user.id}>
            {headers.map((h) => getTableCell(user[h]))}
        </TableRow>
    );

    const TableView = ({data, headers}) => (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((h) => getTableCell(h))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((d) => getTableRow(d, headers))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    const fetchUsers = async () => {
        const usersUrl = `${config.endpoint}`;

        try {
            const response = await axios.get(usersUrl);

            if (!response.status === 200) setUsers([]);;

            setUsers(response.data);

        } catch (e) {
            console.log(e);
            setUsers([]);
        }

    }


    // Fetch Users for the first time 
    // No need of async here, since no promised returned
    useEffect(() => {
        fetchUsers();
    }, [])


    // Actual Component Returned here [DO NOT MAKE CHANGES DIRECTLY]
    // I use Child components i.e. Divide and Conquer All the way :)
    return (
        <Box className="user-list-container">

            <Box
                className="user-list-search-bar-container"
            >
                <SearchBar />
            </Box>

            <Box
                className="user-list-table-view-container"
            >
                <TableView data={users} headers={headers} />
            </Box>

            <Box
                className="user-list-table-actions-container"
            >

            </Box>

        </Box>
    );
}