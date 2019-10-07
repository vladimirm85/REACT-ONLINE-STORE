import { observable, computed, action } from "mobx";

export default class LoaderComponentStore {
   
    @observable serverResponseStatus = '';

    @observable serverResponseError = false;

    constructor (RootStore) {
        this.RootStore = RootStore;
    };

    @action setServerResponseStatus(status) {
        this.serverResponseStatus = status;    
    };

    @action setServerResponseError(isError) {
        this.serverResponseError = isError;
    };

    @computed get getServerResponseStatus() {
        return this.serverResponseStatus;
    };

    @computed get getServerResponseError() {
        return this.serverResponseError;
    };
};