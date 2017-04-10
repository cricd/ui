import { observable, action, computed } from 'mobx';

export default class Player {
    id;
    @observable name;
    @observable dateOfBirth;
    @observable gender; 

    constructor(player) {
        this.id = player.id;
        this.name = player.name;
        this.dateOfBirth = player.dateOfBirth;
        this.gender = player.gender;
    }
}