import io from 'socket.io-client';

const entityStoreUrl = 'http://' + __ENTITYSTORE_URL__;
const changePublisherUrl = 'http://' + __CHANGEPUBLISHER_URL__;
const scoreProcessorUrl = 'http://' + __SCOREPROCESSOR_URL__;

export default class MatchService {

    constructor() {}

    getMatchInfo(matchId, callback) {
        if(!matchId) {
            let message = 'matchId is required to retrieve Match info';
            console.error(message);
            return callback(message);
        }

        fetch(entityStoreUrl + '/matches/' + matchId)
            .then(response => { return response.json(); })
            .then(json => { callback(null, json) })
            .catch(error => { callback(error); });
    };

    subscribeToMatchEvents(matchId, handler, callback) {
        if(!matchId || !handler) {
            let message = 'matchId and handler are required to subscribe to match events';
            console.error(message);
            return callback(message);
        }

        let socket = io.connect(changePublisherUrl + '?match=' + matchId);
        socket.on('score-change', handler);
        callback();
    };

    getScore(matchId, callback) {
        if(!matchId) {
            let message = 'matchId is required to retrieve score';
            console.error(message);
            return callback(message);
        }

        fetch(scoreProcessorUrl + '?match=' + matchId)
            .then(response => { return response.json(); })
            .then(json => { callback(null, json) })
            .catch(error => { callback(error); });
    };
}