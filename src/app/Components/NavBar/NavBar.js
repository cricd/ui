import React from 'react';
import './NavBar.scss';
import AppBar from 'material-ui/AppBar';
import ActionHome from 'material-ui/svg-icons/action/home';
import SvgIcon from 'material-ui/SvgIcon';

function NavBar(props) {
    return (
      <AppBar title="cricd" showMenuIconButton={false}>
        <p className="cricd-navbar-subtitle">Open platform for cricket scoring</p>
      </AppBar>

    );
  }

export default NavBar;
