import { observable, computed, action } from "mobx";
import DataStore from '~/dataStore';
import { toJS } from "mobx";

export default class CartStore {

    @observable cartsProducts = [];

    constructor (RootStore) {
        this.RootStore = RootStore;
        this.requests = this.RootStore.requests;
    };

    @action getData() {
        this.requests.cart.getCartProducts().then((cartsProducts) => {
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

        this.requests.cart.addCartProduct(cartProduct).then((cartProduct) => {
            if (cartProduct) {
                this.cartsProducts.push(cartProduct);
            };
        });
    };
    
    @action removeCartProduct (id) {
        this.requests.cart.removeCartProduct(id).then((success) => {
            if (success) {
                const index = this.cartsProducts.findIndex(product => product.id === id);
                this.cartsProducts.splice(index, 1);
            };
        });
    };

    @action updateCartProduct (id, newQuant) {        
        const index = this.cartsProducts.findIndex(product => product.id === id);
        const updatedProduct = {...this.cartsProducts[index]};
        updatedProduct.quantity = newQuant;
        
        this.requests.cart.updateCartProduct(updatedProduct).then((cartProduct) => {
            if (cartProduct) {
                this.cartsProducts[index] = cartProduct;
            };
        });
    };

    @action clearCart () {
        this.RootStore.checkout.setTempDataForResultPage();            

        return new Promise ((resolve, reject) => {
            this.requests.cart.clearCart().then((success) => {
                if (success) {
                    this.cartsProducts = [];
                    this.RootStore.checkout.clearCustomerData ();
                    resolve(true);
                };
                reject('Purchase fail');
            });
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