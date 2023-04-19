import React from "react";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import "./TableView.css";

/**
 * Component for showing details of the User Details.
 *
 * @component
 */

export default function TableView({
  data,
  currentPage,
  rowLimit,
  selected,
  selectedEdit,
  editData,
  handleEdit,
  handleEditChange,
  handleDelete,
  handleCheckboxClick,
  handleSelectAllClick,
}) {
  // Implementing pagination
  // Low (Inclusive) and High (Exclusive) -> 0 based indexing :)
  const low = (currentPage - 1) * rowLimit;
  const high = currentPage * rowLimit;

  // only get sub fragment of data to show on current page
  // based on the lower and upper bound of currentPage
  let subData = data.slice(low, high);

  // This will be used to show inderminent on table header checkbox (The '-' icon when not all selected)
  let allCurrentSelected = subData.every((user) => selected.has(user.id));

  /**
   * This function checks wether the given User ID is in selected
   * @param {number} id - User ID.
   * */
  const isSelected = (id) => {
    return selected.has(id);
  };

  /**
   * Custom Editable Table Cell to support edit in-memory functionality
   *
   * @component
   * */
  const EditableTableCell = (user, field) => (
    <TableCell align="center">
      {selectedEdit.has(user.id) ? (
        <Input
          value={editData[user.id][field]}
          onChange={(e) => handleEditChange(e, user.id, field)}
        />
      ) : (
        user[field]
      )}
    </TableCell>
  );

  /**
   * @typedef User
   * @type {object}
   * @property {number} id - User ID.
   * @property {string} name - User Name.
   * @property {string} email - User Email.
   * @property {string} role - User Role.
   */

  /**
   * Get User Table Row Component for the given user
   * @param {User} user - User Data
   * @param {number} index - User Index
   */

  const getUserTableRow = (user, index) => {
    const isItemSelected = isSelected(user.id);
    const labelId = `user-list-table-label-${index}`;

    return (
      <TableRow
        key={labelId}
        className="table-row-container"
        role="checkbox"
        aria-checked={isItemSelected}
        selected={isItemSelected}
        sx={{
          "&.Mui-selected, &.Mui-selected:hover": {
            backgroundColor: "secondary.main",
          },
        }}
      >
        <TableCell
          align="center"
          onClick={(e) => handleCheckboxClick(e, user.id)}
        >
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": { labelId },
            }}
          />
        </TableCell>

        {EditableTableCell(user, "name")}
        {EditableTableCell(user, "email")}
        {EditableTableCell(user, "role")}

        <TableCell align="center">
          <Stack direction="row" justifyContent="center" spacing={2}>
            <IconButton
              aria-label="edit"
              size="large"
              sx={{ color: "button.success.main" }}
              label={user.id}
              onClick={() => handleEdit(user.id)}
            >
              {selectedEdit.has(user.id) ? (
                <CheckIcon fontSize="inherit" />
              ) : (
                <EditIcon fontSize="inherit" />
              )}
            </IconButton>

            <IconButton
              aria-label="delete"
              size="large"
              sx={{ color: "button.danger.main" }}
              onClick={() => handleDelete(user.id)}
            >
              <DeleteOutlineIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    );
  };

  /**
   * Table Head Component of our User List View
   *
   * @component
   */

  const TableHeader = ({
    selected,
    allCurrentSelected,
    handleSelectAllClick,
  }) => (
    <TableHead>
      <TableRow>
        <TableCell align="center">
          <Checkbox
            color="primary"
            indeterminate={selected.size > 0 && !allCurrentSelected}
            checked={selected.size > 0 && allCurrentSelected}
            onClick={handleSelectAllClick}
            inputProps={{
              "aria-labelledby": "header",
            }}
          />
        </TableCell>

        <TableCell align="center">
          <strong>Name</strong>
        </TableCell>
        <TableCell align="center">
          <strong>Email</strong>
        </TableCell>
        <TableCell align="center">
          <strong>Role</strong>
        </TableCell>
        <TableCell align="center">
          <strong>Actions</strong>
        </TableCell>
      </TableRow>
    </TableHead>
  );

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHeader
          selected={selected}
          allCurrentSelected={allCurrentSelected}
          handleSelectAllClick={handleSelectAllClick}
        />

        <TableBody>
          {subData.map((d, index) => getUserTableRow(d, index))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
