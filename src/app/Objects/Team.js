import { observable } from 'mobx';
import Player from './Player';

export default class Team {
    id;
    @observable name;
    @observable players;
    
    constructor(newTeam) {
        this.id = newTeam.id;
        this.name = newTeam.name;
        if(newTeam.players) this.players = newTeam.players.map((p) => {
            return new Player(p);
        });
    }
}