import { Router, Route, hashHistory} from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import App from './Shared/App/App';
import View from './ViewScore/View';
import ScoreMatch from './ScoreMatch/ScoreMatch';
import './index.scss';


render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
                <Route path="/view/:matchID" component={View} />
                <Route path="/score/:matchID" component={ScoreMatch} />
        </Route>
    </Router>
), document.getElementById('app'))



