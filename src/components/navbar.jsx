import React from "react";

// Stateless Functional Component
const NavBar = ({ totalCounters }) => {
  
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="https://google.com">
        Navbar
        <span className="badge badge-pill badge-secondary">
          {totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
