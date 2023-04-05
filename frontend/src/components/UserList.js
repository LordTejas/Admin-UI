import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
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
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { visuallyHidden } from '@mui/utils';

import './UserList.css';
import config from '../config.json';import { Divider } from '@mui/material';
;


export default function UserList() {

    const [users, setUsers] = useState([]);

    // Using Set here, not an array
    // It will increase some functionality, Due to O(1) Access time when we have much more load
    const [selected, setSelected] = useState(new Set());

    const SearchBar = () => (
        <TextField
            id="user-list-search-bar"
            placeholder="Search"
            type="search"
            variant="outlined"
            fullWidth
        />
    );

    const isSelected = (id) => {
        return selected.has(id);
    }

    const handleCheckboxClick = (e, id) => {

        // Get Shallow copy of selected SET, Deep copy not needed
        // Since, we only have 1 level deep
        let newSelected = new Set(selected);

        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }

        console.log(newSelected);

        // Swaps our newSelected to prop and updates
        setSelected(newSelected);

    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            // Fetch All user IDs and add it to our set
            let newSelected = new Set(users.map((user) => user.id));
            setSelected(newSelected);
            return;
        }

        setSelected(new Set());
      };
    

    const getUserTableRow = (user) => {
        
        const isItemSelected =  isSelected(user.id);
        const labelId = `user-list-table-label-${user.id}`;
        
        return (
        <TableRow
        key={labelId}
        role="checkbox"
        aria-checked={isItemSelected}
        selected={isItemSelected}
        >
            <TableCell 
            align="center"
            onClick={(e) => handleCheckboxClick(e, user.id)}
            >
                <Checkbox
                color="primary"
                checked={isItemSelected}
                inputProps={{
                    'aria-labelledby': {labelId},
                }}
                />
            </TableCell>

            <TableCell align="center" id={labelId}>{user.name}</TableCell>
            <TableCell align="center">{user.email}</TableCell>
            <TableCell align="center">{user.role}</TableCell>

            <TableCell align="center">
                <Stack direction="row" justifyContent="center" spacing={2}>
                    <IconButton aria-label="delete" size="large" sx={{color: "button.success.main"}}>
                        <EditIcon fontSize="inherit" />
                    </IconButton>

                    <IconButton aria-label="delete" size="large" sx={{color: "button.danger.main"}}>
                        <DeleteOutlineIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
            </TableCell>

        </TableRow>
    );}

    const TableView = ({data}) => (
        <TableContainer component={Paper}>
            <Table>

                <TableHead>
                    <TableRow>
                        <TableCell align="center">
                            <Checkbox
                            color="primary"
                            indeterminate={selected.size > 0 && selected.size < users.length}
                            checked={selected.size > 0 && selected.size === users.length}
                            onClick={handleSelectAllClick}
                            inputProps={{
                              'aria-labelledby': "header",
                            }}
                            />
                        </TableCell>

                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {data.map(getUserTableRow)}
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
                <TableView data={users}/>
            </Box>

            <Box
                className="user-list-table-actions-container"
            >

            </Box>

        </Box>
    );
}