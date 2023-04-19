import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";

import TableView from "./TableView";
import TableActionsArea from "./TableActionsArea";
import SearchBar from "./SearchBar";

import "./UserList.css";
import config from "../config.json";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [rowLimit, setRowLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [found, setFound] = useState([]);
  const [selectedEdit, setSelectedEdit] = useState(new Set());
  const [editData, setEditData] = useState({});

  // Using Set here, not an array
  // It will increase some functionality, Due to O(1) Access time when we have much more load
  const [selected, setSelected] = useState(new Set());

  // Default RowLimit Options
  const rowLimitOptions = [5, 10, 20, 25];

  // Fetch Users for the first time
  // No need of async here, since no promised returned
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    searchItems();
  }, [search]);

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
  };

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
  };

  const loadEditData = (id) => {
    const userIndex = users.findIndex((user) => user.id === id);
    const user = users[userIndex];

    setEditData({ ...editData, [id]: { ...user } });
  };

  const applyEditChange = (id) => {
    const dataIndex = users.findIndex((user) => user.id === id);

    if (dataIndex === -1) return;

    // Get Deep copy (at least level 2+)

    try {
      const newUsers = [...users];

      newUsers[dataIndex]["name"] = editData[id].name;
      newUsers[dataIndex]["email"] = editData[id].email;
      newUsers[dataIndex]["role"] = editData[id].role;

      setUsers(newUsers);
    } catch (e) {
      console.log(e);
    } finally {
      const newSelectedEdit = new Set(selectedEdit);

      newSelectedEdit.delete(id);

      setSelectedEdit(newSelectedEdit);
    }
  };

  const handleEdit = (id) => {
    if (selectedEdit.has(id)) {
      applyEditChange(id);
      return;
    }

    // Open Edit functionality
    const newSelectedEdit = new Set(selectedEdit);
    newSelectedEdit.add(id);
    setSelectedEdit(newSelectedEdit);

    // Load data before selecting edit row
    loadEditData(id);
  };

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
  };

  const handleSelectAllClick = (event) => {
    const low = (currentPage - 1) * rowLimit;
    const high = currentPage * rowLimit;

    let tempUsers = [...(search.length === 0 ? users : found)];
    tempUsers = tempUsers.slice(low, high);

    console.log(event.target.checked);
    let newSelected = new Set(selected);
    for (let i = 0; i < tempUsers.length; i++) {
      if (event.target.checked) {
        newSelected.add(tempUsers[i].id);
      } else {
        newSelected.delete(tempUsers[i].id);
      }
    }

    setSelected(newSelected);
  };

  const handleEditChange = (e, id, key) => {
    setEditData({
      ...editData,
      [id]: { ...editData[id], [key]: e.target.value },
    });
  };

  const fetchUsers = async () => {
    const usersUrl = `${config.endpoint}`;

    try {
      const response = await axios.get(usersUrl);

      if (!response.status === 200) setUsers([]);

      setUsers(response.data);
    } catch (e) {
      console.log(e);
      setUsers([]);
    }
  };

  const handleDeleteSelected = () => {
    // Simply filters the array which are in selected in order to delete
    // This is where O(1) Access time of our 'Selected Set' shines -> DSA Rocks :)
    const filteredUSers = users.filter((user) => !selected.has(user.id));

    // Try Catch for safety
    try {
      setUsers(filteredUSers);
    } catch (e) {
      console.log(e);
    } finally {
      // Clears all the selected from props, we need to refresh it thus ..
      setSelected(new Set());
    }
  };

  // Actual Component Returned here [DO NOT MAKE CHANGES DIRECTLY]
  // I use Child components i.e. Divide and Conquer All the way :)
  return (
    <Box className="user-list-container">
      <Box className="user-list-search-bar-container">
        <SearchBar search={search} setSearch={setSearch} />
      </Box>

      <Box className="user-list-table-view-container">
        <TableView
          data={search.length === 0 ? users : found}
          currentPage={currentPage}
          rowLimit={rowLimit}
          selected={selected}
          selectedEdit={selectedEdit}
          editData={editData}
          handleEdit={handleEdit}
          handleEditChange={handleEditChange}
          handleDelete={handleDelete}
          handleCheckboxClick={handleCheckboxClick}
          handleSelectAllClick={handleSelectAllClick}
        />
      </Box>

      <Box className="user-list-table-actions-container">
        <TableActionsArea
          data={search.length === 0 ? users : found}
          rowLimit={rowLimit}
          setRowLimit={setRowLimit}
          rowLimitOptions={rowLimitOptions}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handleDeleteSelected={handleDeleteSelected}
        />
      </Box>
    </Box>
  );
}
