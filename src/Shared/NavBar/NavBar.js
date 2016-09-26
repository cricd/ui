import React, { Component } from 'react';
import './NavBar.scss';
import AppBar from 'material-ui/AppBar';

class NavBar extends Component {
  render() {
    return (
        <AppBar
          title="cricd"
          iconElementRight={<span>Open platform for cricket scoring</span>}
        />
    );
  }
}

export default NavBar;
