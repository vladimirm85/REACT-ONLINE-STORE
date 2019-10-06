import { observable, action, computed } from "mobx";

export default class HomeStore {

    @observable products = [];

    @observable serverResponseStatus = '';

    serverResponseError = false;

    constructor (RootStore) {
        this.RootStore = RootStore;
        this.requests = this.RootStore.requests;
    };

    @action getProducts() {
        this.updateServerResponseStatus('pending');
        this.requests.products.getProducts().then((products) => {
                this.products = products;
                this.serverResponseError = false;
            }).catch(() => {
                this.RootStore.notifications.addNotification('getProducts');
                this.serverResponseError = true;
            }).finally(() => {
                this.updateServerResponseStatus('fulfilled');
        });
    };

    @action updateServerResponseStatus(status) {
        this.serverResponseStatus = status;
    };

    @computed get getServerResponseStatus() {
        return this.serverResponseStatus;
    };

    getServerResponseError() {
        return this.serverResponseError;
    };
};