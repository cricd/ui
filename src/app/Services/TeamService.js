import io from 'socket.io-client';
import request from 'superagent';

const entityStoreUrl = 'http://' + __ENTITYSTORE_URL__;

export default class TeamService {
    constructor() { }

    getTeams(callback) {
        request
            .get(entityStoreUrl + '/teams')
            .end((err, res) => {
                if(err) {
                    console.error(err);
                    return callback('An error occurred trying to retrieve Teams');
                }
                callback(null, res.body);
            });
    }

    createTeam(team, callback) {
        request
            .post(entityStoreUrl + '/teams')
            .send(team)
            .end((err, res) => {
                if(err) {
                    console.error(err);
                    return callback('An error occurred trying to create Team');
                }
                callback(null, res.body);
            });
    }
}