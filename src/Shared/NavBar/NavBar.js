import React, { Component } from 'react';
import { Toolbar, Heading } from 'rebass';
import './NavBar.scss';

class NavBar extends Component {
  render() {
    return (
      <Toolbar>
        <Heading size={1}>cricd</Heading>
        <span className="subtitle">
          <Heading size={3} alt>Open platform for cricket scoring</Heading>
        </span>
      </Toolbar>
    );
  }
}

export default NavBar;
