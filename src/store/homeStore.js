import { observable, action } from "mobx";
import DataStore from '~s/dataStore.js';

class Products {
    @observable products = [];

    @action getData() {
        this.products = [...DataStore.products];
    };
};

export default new Products();