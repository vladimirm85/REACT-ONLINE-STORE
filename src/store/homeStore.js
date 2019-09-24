import { observable, action } from "mobx";
import DataStore from '~s/dataStore.js';

class Products {
    @observable products = [];

    @observable cartsProducts = [];

    @action getData() {
        this.products = [...DataStore.products];
        this.cartsProducts = [...DataStore.getCartsProducts()];
    }

    isCartProduct = id => !!this.cartsProducts.find(product => product.id === id);

    @action addToCart (id) {
        const product = this.products.find(product => product.id === id);
        
        const cartProduct = {
            id: product.id,
            title: product.title,            
            price: product.price,
            rest: product.rest,
            quantity: 1
        };
        
        DataStore.addToCart(cartProduct);        
        this.cartsProducts.push(cartProduct);
    };

    @action removeFromCart (id) {
        DataStore.removeFromCart(id);
        const index = this.cartsProducts.findIndex(product => product.id === id);
        this.cartsProducts.splice(index, 1);
    };

}

export default new Products();