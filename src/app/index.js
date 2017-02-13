import { Router, Route, browserHistory } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import App from '../app/App';
import ViewMatch from './Components/ViewMatch/ViewMatch';
import CreateMatch from './Components/CreateMatch/CreateMatch';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { useStrict } from 'mobx';


useStrict(true);
injectTapEventPlugin();

render((
    <div>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="/view/:matchId" component={ViewMatch} />
                <Route path="/create" component={CreateMatch} />
            </Route>
        </Router>
    </div>
), document.getElementById('app'))



