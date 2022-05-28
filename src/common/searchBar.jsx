import React from "react";

const SearchBar = ({ onSearch, searchQuery }) => {
  return (
    <div className="input-group my-3">
      <input
        onChange={onSearch}
        value={searchQuery}
        className="form-control"
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
