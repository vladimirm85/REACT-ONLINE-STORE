import { observable, action } from "mobx";

export default class HomeStore {
    @observable products = [];

    constructor (RootStore) {
        this.RootStore = RootStore;
        this.requests = this.RootStore.requests;
    };

    @action getData() {
        return this.requests.products.getProducts().then((products) => {
                this.products = products;
            });
    };
};