import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <header className="mp-main-header">
        <ul>
          <li><NavLink to="/keys">Keys</NavLink></li>
          <li><NavLink to="/write">Write</NavLink></li>
          <li><NavLink to="/read">Read</NavLink></li>
          <li><NavLink to="/attach">Attach</NavLink></li>
          <li><NavLink to="/guide">Guide</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>
      </header>
    )
  }
}

export default Header;
