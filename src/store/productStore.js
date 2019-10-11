import { observable, computed, action } from "mobx";

export default class ProductStore {

    @observable product = {};

    @observable serverResponseStatus = '';

    constructor (RootStore) {
        this.RootStore = RootStore;
    };

    @action getProductById(id) {
        this.serverResponseStatus = 'pending';
        this.RootStore.productsRequests.getProductById(id).then( product => {
                this.product = product;
                this.serverResponseStatus = 'fulfilled';
            }).catch( error => {
                console.log('Error: ' + error);
                this.serverResponseStatus = 'rejected';
        });
    
    };

    @computed get getProduct() {
        return this.product;
    };

    @computed get getServerResponseStatus() {
        return this.serverResponseStatus;
    };
};