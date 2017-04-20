import io from 'socket.io-client';
import request from 'superagent';

const entityStoreUrl = 'http://' + __ENTITYSTORE_URL__;
const changePublisherUrl = 'http://' + __CHANGEPUBLISHER_URL__;
const scoreProcessorUrl = 'http://' + __SCOREPROCESSOR_URL__;
const nextBallProcessorUrl = 'http://' + __NEXTBALLPROCESSOR_URL__;
const eventApiUrl = 'http://' + __EVENTAPI_URL__;

export function getMatch(matchId, callback) {
    if (!matchId) {
        let message = 'matchId is required to retrieve Match info';
        console.error(message);
        return callback(message);
    }

    request
        .get(entityStoreUrl + '/matches/' + matchId)
        .end((err, res) => {
            if (err && err.status === 404) return callback('No match with this id exists');
            else if (err) {
                console.error(err);
                return callback('An error occurred trying to get Match info');
            }
            callback(null, res.body);
        });
};

export function subscribeToMatchEvents(matchId, handler, callback) {
    if (!matchId || !handler) {
        let message = 'matchId and handler are required to subscribe to match events';
        console.error(message);
        return callback(message);
    }

    let socket = io.connect(changePublisherUrl + '?match=' + matchId);
    socket.on('score-change', handler);
    console.debug('Subscription to match ' + matchId + ' successful');
    callback();
};

export function getScore(matchId, callback) {
    if (!matchId) {
        let message = 'matchId is required to retrieve score';
        console.error(message);
        return callback(message);
    }

    request
        .get(scoreProcessorUrl)
        .query({ match: matchId })
        .end((err, res) => {
            if (err && err.status === 404) return callback('No score associated with this matchId');
            else if (err) {
                console.error(err);
                return callback('An error occurred trying to retrieve the score');
            }
            callback(null, res.body);
        });
};

export function getNextMatchEvent(matchId, callback) {
    if (!matchId) {
        let message = 'matchId is required to retrieve next ball';
        console.error(message);
        return callback(message);
    }

    request
        .get(nextBallProcessorUrl)
        .query({ match: matchId })
        .end((err, res) => {
            if (err && err.status === 404) {
                console.debug('No matchEvents associated with this matchId');
                return callback();
            }
            if (err) {
                console.error(err);
                return callback('An error occurred trying to retrieve the score');
            }
            callback(null, res.body);
        });
};

export function createMatch(match, callback) {
    request
        .post(entityStoreUrl + '/matches/')
        .send(match)
        .end((err, res) => {
            if (err) {
                console.error(err);
                return callback('An error occurred trying to create Match');
            }
            callback(null, res.body);
        });
}

export function createMatchEvent(matchEvent, callback) {
    request
        .post(eventApiUrl)
        .send(matchEvent)
        .end((err, res) => {
            if (err) {
                console.error(err);
                return callback('An error occurred trying to create MatchEvent');
            }
            callback(null, res.body);
        });
}