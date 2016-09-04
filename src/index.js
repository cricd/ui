import { Router, Route, hashHistory} from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';
import Matches from './components/Matches/Matches';
import Match from './components/Match/Match';
import Score from './components/Score/Score';
import './index.css';


render((
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path="/matches" component={Matches}>
                    <Route path="/matches/:matchID" component={Match}/>
                </Route>
                <Route path="/score" component={Score}/>
            </Route>
        </Router>
), document.getElementById('app'))



