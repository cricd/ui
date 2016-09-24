import React, { Component } from 'react';
import { Link } from 'react-router';
import './Home.scss';
import { Banner, Heading } from 'rebass';

class Home extends Component {
    render() {
        return (
            <Banner align="center">
                <Heading>cricd</Heading>
            </Banner>
        );
    }
}

export default Home;
