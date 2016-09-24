import 'grommet/scss/vanilla/index.scss';
import React, { Component } from 'react';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';

class NavBar extends Component {
  render() {
    return (
      <Box colorIndex="neutral-1">
        <Headline size="small">
          cricd
        </Headline >
      </Box>
    );
  }
}

export default NavBar;
