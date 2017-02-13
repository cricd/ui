import io from 'socket.io-client';

const entityStoreUrl = 'http://' + __ENTITYSTORE_URL__;

export default class TeamService {
    constructor() { }

    getTeams(callback) {
        let isError = false;
        fetch(entityStoreUrl + '/teams')
            .then(response => { 
                if(response.status !== 200) isError = true;
                return response.json(); 
            })
            .then(json => { 
                if(isError) return callback(json.message);
                callback(null, json) 
            })
            .catch(error => { callback(error); });
    }

    createTeam(team, callback) {
        let isError = false;
        fetch(entityStoreUrl + '/teams', {
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            body: JSON.stringify(team)
        })
            .then(response => {
                if(response.status !== 202) isError = true;
                return response.json(); 
            })
            .then(json => { 
                if(isError) return callback(json.message);
                callback(null, json) 
            })
            .catch(error => { callback(error); });
    }
}