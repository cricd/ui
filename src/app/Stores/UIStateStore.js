import { observable, computed, action } from 'mobx';
import Match from '../Objects/Match';

class UIStateStore {
    // View Match properties
    @observable selectedMatch;
    @observable selectedInnings = 1;

    // Notification properties
    @observable notify = false; // Set true to popup a notification
    @observable notificationMatchEvent; 
    @observable notificationSettings = { all: false, wickets: false, boundary: false }
    @action setNotificationSettings(settings) { this.notificationSettings = settings; }

    // Error snackbar
    @observable error = '';
    @computed get errorOpen() { return this.error.length > 0; }
    @action displayError(error) { this.error = error; }
}

const uiStateStore = new UIStateStore();
export default uiStateStore;