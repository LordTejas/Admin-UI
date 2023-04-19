import React from "react";
import TextField from "@mui/material/TextField";

import "./SearchBar.css";

/**
 * Simple Search Bar Component
 *
 * @component
 * @example
 * const [search, setSearch] = useState("");
 *
 * <SearchBar search={search} setSearch={setSearch} />
 */

export default function SearchBar({ search, setSearch }) {
  return (
    <TextField
      id="user-list-search-bar"
      placeholder="Search"
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      variant="outlined"
      fullWidth
    />
  );
}
