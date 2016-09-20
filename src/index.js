import { Router, Route, hashHistory} from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import App from './Shared/App/App';
import View from './ViewScore/View';
import './index.scss';


render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
                <Route path="/view/:matchID" component={View} />
        </Route>
    </Router>
), document.getElementById('app'))



