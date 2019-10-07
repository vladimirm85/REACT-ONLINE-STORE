import { observable, computed, action } from "mobx";

export default class ProductStore {

    @observable product = {};

    constructor (RootStore) {
        this.RootStore = RootStore;
        this.requests = this.RootStore.requests;
    };

    @action getProductById(id) {
        this.RootStore.serverResponse.setServerResponseStatus('pending');
        this.requests.products.getProductById(id).then( product => {
                this.product = product;
                this.RootStore.serverResponse.setServerResponseError(false);
            }).catch(() => {
                this.RootStore.notifications.addNotification('getProductById');
                this.RootStore.serverResponse.setServerResponseError(true);
            }).finally(() => {
                this.RootStore.serverResponse.setServerResponseStatus('fulfilled');
        });
    
    };

    @computed get getProduct() {
        return this.product;
    };

    @computed get getServerResponseStatus() {
        return this.serverResponseStatus;
    };

    getServerResponseError() {
        return this.serverResponseError;
    };
};