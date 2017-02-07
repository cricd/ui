import { observable, computed, action } from 'mobx';
import Match from '../Objects/Match';

class UIStateStore {
    // View Match properties
    @observable selectedMatch;
    @observable selectedInnings = 1;

    // Notification properties
    @observable notify = false; // Set true to popup a notification
    @observable notificationMatchEvent; 
    @observable notificationSettings = { all: false, wickets: false, boundary: false };
}

const uiStateStore = new UIStateStore();
export default uiStateStore;