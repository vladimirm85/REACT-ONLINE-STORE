import { observable, action } from "mobx";

export default class HomeStore {
    @observable products = [];

    constructor (RootStore) {
        this.RootStore = RootStore;
        this.api = this.RootStore.api;
    };

    @action getData() {
        return this.api.products.all().then((products) => {
                this.products = products;
            });
    };
};