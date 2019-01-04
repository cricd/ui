import { observable, action, computed } from 'mobx';

export default class Player {
    id;
    @observable name;

    constructor(player) {
        this.id = player.id;
        this.name = player.name;
    }
}