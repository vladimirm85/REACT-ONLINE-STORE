import { observable, computed, action } from "mobx";
import DataStore from '~/dataStore';
import { toJS } from "mobx";

export default class CartStore {

    @observable cartsProducts = [];

    constructor (RootStore) {
        this.RootStore = RootStore;
        this.api = this.RootStore.api;
    };

    @action getData() {
        this.api.cart.get().then((cartsProducts) => {
                this.cartsProducts = cartsProducts;
            });
    };
    
    @action addCartProduct (product) {
        
        const cartProduct = {
            id: product.id,
            title: product.title,            
            price: product.price,
            rest: product.rest,
            quantity: 1
        };

        this.api.cart.add(cartProduct).then((cartsProducts) => {
            this.cartsProducts = cartsProducts;
        });
    };

    @action removeCartProduct (id) {
        this.api.cart.remove(id).then((success) => {
            if (success) {
                const index = this.cartsProducts.findIndex(product => product.id === id);
                this.cartsProducts.splice(index, 1);
            };
        });
    };

    @action updateProduct (id, newQuant) {        
        const index = this.cartsProducts.findIndex(product => product.id === id);
        const apdatedProduct = {...this.cartsProducts[index]};
        apdatedProduct.quantity = newQuant;
        
        this.api.cart.update(apdatedProduct).then((success) => {
            if (success) {
                this.cartsProducts[index] = apdatedProduct;
            };
        });
    };
    
    @computed get isCartProduct() {
        return id => this.cartsProducts.some(product => product.id === id);
    };

    @computed get totalPrice() {
        let total = 0;
        this.cartsProducts.forEach((product) => {
            total += product.quantity*product.price;
        });
        return total;
    };

    @computed get cartsProductsCnt () {
        return this.cartsProducts.length;
    };
};