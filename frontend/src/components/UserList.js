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
import Pagination from '@mui/material/Pagination';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { visuallyHidden } from '@mui/utils';
import { Button, Divider, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';

import './UserList.css';
import config from '../config.json';


export default function UserList() {

    const [users, setUsers] = useState([]);
    const [rowLimit, setRowLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [found, setFound] = useState([]);
    const [selectedEdit, setSelectedEdit] = useState(new Set());
    const [editData, setEditData] = useState(new Map());

    // Using Set here, not an array
    // It will increase some functionality, Due to O(1) Access time when we have much more load
    const [selected, setSelected] = useState(new Set());

    // Default RowLimit Options
    const rowLimitOptions = [5, 10, 20, 25];


    const searchItems = () => {
        // Filter users which match our search in all name, email, role
        const filteredUsers = users.filter((user) => {
            const combinedFields = user.name + user.email + user.role;

            // String.search(pattern) -> This will search if any pattern matches
            // It returns -1 -> if string not found, else 0...n for first find
            return combinedFields.search(search) !== -1;
        });

        // console.log(filteredUsers);
        setFound(filteredUsers);
        // console.log(found);
    }

    useEffect(() => {
        searchItems();
    }, [search])

    const isSelected = (id) => {
        return selected.has(id);
    }

    const handleDelete = (id) => {

        // Get same array without the selected user (deletes it)
        const filteredUsers = users.filter((user) => user.id !== id);
        // console.log(id, filteredUsers);

        try {
            // Update the prop
            setUsers(filteredUsers);
            return;
        } catch (e) {
            console.log(e);
        }
    }

    const loadEditData = (id) => {
        const userIndex = users.findIndex((user) => user.id = id);
        const user = users[userIndex];

        const newEditData = new Map(editData);
        newEditData.set(id, user);

        setEditData(newEditData);
    }

    const applyEditChange = (id) => {

        const dataIndex = users.findIndex((user) => user.id === id);

        if (dataIndex === -1) return;

        // Get Deep copy (at least level 2+)
        
        try {
            const newUsers = [...users];
    
            newUsers[dataIndex]['name'] = editData.get(id).name;
            newUsers[dataIndex]['email'] = editData.get(id).email;
            newUsers[dataIndex]['role'] = editData.get(id).role;
        
    
            setUsers(newUsers);
        } catch (e) {
            console.log(e);
        } finally {
            const newSelectedEdit = new Set(selectedEdit);
            const newEditData = new Map(editData);

            newSelectedEdit.delete(id);
            newEditData.delete(id);

            setSelectedEdit(newSelectedEdit);
            setEditData(newEditData);

            console.log(selectedEdit, editData);
        }
        
    }

    const handleEdit = (id) => {

        if (selectedEdit.has(id)) {
            applyEditChange(id);
            return;
        }

        // Load data before selecting edit row
        loadEditData(id); 

        // Open Edit functionality
        setSelectedEdit(new Set([...selectedEdit, id]));
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

    const EditableTableCell = ({user, field, isEditable}) => (
      <TableCell
      align='center'
      >
        {
            isEditable
            ?
            <Input
            value={editData.get(user.id)[field]}
            onChange={(e) => {

                const newEditData = new Map(editData);

                const tempUserData = editData.get(user.id);
                tempUserData[field] = e.target.value;

                newEditData.set(user.id, tempUserData);

                setEditData(newEditData);
            }}
            />
            :
            user[field]
        }
      </TableCell>  
    );
    
    const getUserTableRow = (user) => {
        
        const isItemSelected =  isSelected(user.id);
        const isItemEditable = selectedEdit.has(user.id);
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

            {EditableTableCell({user: user, field: "name", isEditable: isItemEditable})}
            {EditableTableCell({user: user, field: "email", isEditable: isItemEditable})}
            {EditableTableCell({user: user, field: "role", isEditable: isItemEditable})}

            <TableCell align="center">
                <Stack direction="row" justifyContent="center" spacing={2}>
                    <IconButton 
                    aria-label="edit" 
                    size="large" 
                    sx={{color: "button.success.main"}}
                    label={user.id}
                    onClick={() => handleEdit(user.id)}
                    >
                        {
                            (selectedEdit.has(user.id))
                            ?
                            <CheckIcon fontSize="inherit" />
                            :
                            <EditIcon fontSize="inherit" />
                        }
                    </IconButton>

                    <IconButton 
                    aria-label="delete" 
                    size="large" 
                    sx={{color: "button.danger.main"}}
                    onClick={() => handleDelete(user.id)}
                    >
                        <DeleteOutlineIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
            </TableCell>

        </TableRow>
    );}

    const TableView = ({data}) => {
        
        // Implementing pagination
        // Low (Inclusive) and High (Exclusive) -> 0 based indexing :)
        const low = (currentPage - 1) * rowLimit;
        const high = currentPage * rowLimit;

        let subData = data.slice(low, high);

        return (
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
                    {subData.map(getUserTableRow)}
                </TableBody>

            </Table>
        </TableContainer>
    )};

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

    const handleDeleteSelected = () => {
        // Simply filters the array which are in selected in order to delete
        // This is where O(1) Access time of our 'Selected Set' shines -> DSA Rocks :)
        const filteredUSers = users.filter((user) => !selected.has(user.id));

        // Try Catch for safety
        try {
            setUsers(filteredUSers);
        } catch (e) {
            console.log(e);
        }  finally {
            // Clears all the selected from props, we need to refresh it thus ..
            setSelected(new Set());
        }
        
    }

    const TableActionArea = () => (
        <Stack direction="row" justifyContent="center" id="table-action-area">
            <Button
            id="delete-selected-button"
            onClick={handleDeleteSelected}
            sx={{
                color: "common.white",
                bgcolor: "button.danger.main",
                "&:hover": {
                    bgcolor: "button.danger.dark",
                },
            }}
            >
                DELETE SELECTED
            </Button>

            <Pagination 
            page={currentPage}
            count={Math.ceil(users.length / rowLimit)}
            size="large" color="primary"
            showFirstButton showLastButton
            onChange={(event, page) => {
                setCurrentPage(page);
            }}
            />

            {/* <Box id="row-limit-select">
                <Select
                value={rowLimit}
                onChange={(e) => setRowLimit(e.target.value)} 
                >
                    {rowLimitOptions.map((option) => <MenuItem key={option}>{option}</MenuItem>)}
                </Select>
            </Box>
             */}

        </Stack>
    );

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
                <TextField
                id="user-list-search-bar"
                placeholder="Search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant="outlined"
                fullWidth
                />
            </Box>

            <Box
            className="user-list-table-view-container"
            >

                {TableView({data: (search.length === 0) ? users : found})}

            </Box>

            <Box
            className="user-list-table-actions-container"
            >
                {TableActionArea()}
            </Box>

        </Box>
    );
}