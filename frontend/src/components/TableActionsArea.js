import React from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import { Button, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import "./TableActionsArea.css";


/**
 * Table Actions Area of our User List Table View
 * has DeleteButton, Pagination, RowLimit Factor
 * 
 * @component
 */

export default function TableActionsArea({
  data,
  width,
  rowLimit,
  setRowLimit,
  rowLimitOptions,
  currentPage,
  setCurrentPage,
  handleDeleteSelected,
}) {

  /**
   * Delete Button Component for delete current selected rows
   * 
   * @component
   */

  const DeleteSelectedButton = ({ handleDeleteSelected }) => (
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
  );


  /**
   * Pagination Component for page navigation
   * 
   * @component
   */

  const PaginationControl = ({ dataLength, currentPage, rowLimit }) => (
    <Pagination
      page={currentPage}
      count={Math.ceil(dataLength / rowLimit)}
      // Use windwidth to set width dynamically
      size={width <= 786 ? "small" : "large"}
      color="primary"
      showFirstButton
      showLastButton
      sx={{
        alignSelf: "center",
      }}
      onChange={(event, page) => {
        setCurrentPage(page);
      }}
    />
  );


  /**
   * Row Select Component to Limit the number of records shown on the Table View
   * 
   * @component
   */

  const RowLimitSelector = ({ rowLimit, rowLimitOptions, setRowLimit }) => (
    <FormControl
      sx={{ m: 1, minWidth: 120 }}
      size="small"
      id="row-limit-select"
    >
      <InputLabel id="row-limit-select-label">Row Limit</InputLabel>
      <Select
        labelId="row-limit-select-label"
        id="row-limit-select-label"
        label="Row Limit"
        value={rowLimit}
        onChange={(e) => setRowLimit(e.target.value)}
      >
        {rowLimitOptions.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      alignItems="strech"
      spacing={2}
      id="table-action-area"
    >
      <DeleteSelectedButton handleDeleteSelected={handleDeleteSelected} />

      <PaginationControl
        dataLength={data.length}
        currentPage={currentPage}
        rowLimit={rowLimit}
      />

      <RowLimitSelector
        rowLimit={rowLimit}
        rowLimitOptions={rowLimitOptions}
        setRowLimit={setRowLimit}
      />
    </Stack>
  );
}
