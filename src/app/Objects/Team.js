import { observable } from 'mobx';

export default class Team {
    id;
    @observable name;
    @observable players;
    
    constructor(newTeam) {
        this.id = newTeam.id;
        this.name = newTeam.name;
        this.players = newTeam.players;
    }
}