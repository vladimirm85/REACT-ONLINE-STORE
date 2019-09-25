import { observable, computed, action } from "mobx";
import DataStore from '~s/dataStore.js';
import { toJS } from "mobx";

class Products {

    @observable cartsProducts = [];
    
    @action getCartsProducts() {
        this.cartsProducts = [...DataStore.getCartsProducts()];
    }

    isCartProduct = id => !!this.cartsProducts.find(product => product.id === id);

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

    @computed get totalPrice() {
        let total = 0;
        this.cartsProducts.forEach((product) => {
            total += product.quantity*product.price;
        });
        return total;
    };    
};



export default new Products();