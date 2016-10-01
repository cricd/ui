import { Router, Route, hashHistory} from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import App from './Shared/App/App';
import ViewMatch from './ViewMatch/ViewMatch';
import ScoreMatch from './ScoreMatch/ScoreMatch';
import CreateMatch from './CreateMatch/CreateMatch';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render((
    <div>
    <Router history={hashHistory}>
        <Route path="/" component={App}>
                <Route path="/view/:matchId" component={ViewMatch} />
                <Route path="/score/:matchId" component={ScoreMatch} />
                <Route path="/create/" component={CreateMatch} />
        </Route>
    </Router>
    </div>
), document.getElementById('app'))



