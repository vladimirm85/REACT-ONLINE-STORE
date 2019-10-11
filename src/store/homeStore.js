import { observable, action, computed } from "mobx";

export default class HomeStore {

    @observable products = [];

    @observable serverResponseStatus = '';

    constructor (RootStore) {
        this.RootStore = RootStore;
    };

    @action getProducts() {
        this.serverResponseStatus = 'pending';
        this.RootStore.productsRequests.getProducts().then( products => {
                this.products = products;
                this.serverResponseStatus = 'fulfilled';
            }).catch( error => {
                console.log('Error: ' + error);                
                this.RootStore.notificationsStore.addNotification('getProducts');
                this.serverResponseStatus = 'rejected';
        });
    };

    @computed get getServerResponseStatus() {
        return this.serverResponseStatus;
    };
};