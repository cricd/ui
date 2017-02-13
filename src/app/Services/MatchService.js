import io from 'socket.io-client';
import request from 'superagent';

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

        request
            .get(entityStoreUrl + '/matches/' + matchId)
            .end((err, res) => {
                if(err) return callback(err);
                else if(!res.ok) return callback(res.statusText);
                callback(null, res.body);
            });
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

        request
            .get(scoreProcessorUrl)
            .query({ match: matchId })
            .end((err, res) => {
                if(err) return callback(err);
                else if(!res.ok) return callback(res.statusText);
                callback(null, res.body);
            });
    };

    createMatch(match, callback) {
        request
            .post(entityStoreUrl + '/matches/')
            .send(match)
            .end((err, res) => {
                if(err && err.response.body.originalError) return callback(err.response.body.originalError);
                else if(err) return callback(err.message);
                callback(null, res.body);
            });
    }
}