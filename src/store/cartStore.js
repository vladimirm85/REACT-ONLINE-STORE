import { observable, computed, action } from "mobx";
import DataStore from '~/dataStore';
import { toJS } from "mobx";

export default class CartStore {

    @observable cartsProducts = [...DataStore.getCartsProducts()];

    constructor (RootStore) {
        this.RootStore = RootStore;
    };
    
    @action addCartProduct (product) {
        
        const cartProduct = {
            id: product.id,
            title: product.title,            
            price: product.price,
            rest: product.rest,
            quantity: 1
        };
        
        DataStore.addCartProduct(cartProduct);        
        this.cartsProducts.push(cartProduct);
    };

    @action removeCartProduct (id) {
        DataStore.removeCartProduct(id);
        const index = this.cartsProducts.findIndex(product => product.id === id);
        this.cartsProducts.splice(index, 1);
    };

    @action updateProduct (id, newQuant) {
        const index = this.cartsProducts.findIndex(product => product.id === id);
        this.cartsProducts[index].quantity = newQuant;        
        DataStore.updateProduct(toJS(this.cartsProducts[index]));
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