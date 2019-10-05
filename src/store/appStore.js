import { observable, computed, action } from "mobx";

export default class AppStore {

    @observable serverResponseStatus = '';

    constructor (RootStore) {
        this.RootStore = RootStore;
    };

    @action updateServerResponseStatus(status) {
        this.serverResponseStatus = status;
    };

    @computed get getServerResponseStatus() {
        return this.serverResponseStatus;
    };
};