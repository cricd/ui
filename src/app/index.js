import { Router, Route, hashHistory} from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import App from '../app/App';
import ViewMatch from './Components/ViewMatch/ViewMatch';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {useStrict} from 'mobx';


useStrict(true);
injectTapEventPlugin();

render((
    <div>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                    <Route path="/view/:matchId" component={ViewMatch} />
            </Route>
        </Router>
    </div>
), document.getElementById('app'))



