import io from 'socket.io-client';
import request from 'superagent';
const writeApiUrl = 'http://' + __WRITEAPI_URL__;

export function getTeams(callback) {
    request
        .get(writeApiUrl + '/teams')
        .end((err, res) => {
            if (err) {
                console.error(err);
                return callback('An error occurred trying to retrieve Teams');
            }
            callback(null, res.body);
        });
}

export function getTeam(teamId, callback) {
    if (!teamId) {
        let message = 'teamId is required to retrieve Team';
        console.error(message);
        return callback(message);
    }

    request
        .get(writeApiUrl + '/teams/' + teamId)
        .end((err, res) => {
            if (err) {
                console.error(err);
                return callback('An error occurred trying to retrieve Team');
            }
            callback(null, res.body);
        });
}

export function createTeam(team, callback) {
    request
        .post(writeApiUrl + '/teams')
        .send(team)
        .end((err, res) => {
            if (err) {
                console.error(err);
                return callback('An error occurred trying to create Team');
            }
            callback(null, res.body);
        });
}