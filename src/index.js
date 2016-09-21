import { Router, Route, hashHistory} from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import App from './Shared/App/App';
import ViewMatch from './ViewMatch/ViewMatch';
import ScoreMatch from './ScoreMatch/ScoreMatch';


render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
                <Route path="/view/:matchId" component={ViewMatch} />
                <Route path="/score/:matchID" component={ScoreMatch} />
        </Route>
    </Router>
), document.getElementById('app'))



