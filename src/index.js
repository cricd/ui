import { Router, Route, hashHistory} from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import App from './Shared/App/App';
<<<<<<< HEAD
import ViewMatch from './ViewMatch/ViewMatch';
=======
import View from './ViewScore/View';
import ScoreMatch from './ScoreMatch/ScoreMatch';
import './index.scss';
>>>>>>> scoring-ui


render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
<<<<<<< HEAD
                <Route path="/view/:matchId" component={ViewMatch} />
=======
                <Route path="/view/:matchID" component={View} />
                <Route path="/score/:matchID" component={ScoreMatch} />
>>>>>>> scoring-ui
        </Route>
    </Router>
), document.getElementById('app'))



