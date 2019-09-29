import { observable, action } from "mobx";
import DataStore from '~/dataStore';

export default class HomeStore {
    @observable products = [];

    constructor (RootStore) {
        this.RootStore = RootStore;
    };

    @action getData() {
        this.products = [...DataStore.products];
    };
};