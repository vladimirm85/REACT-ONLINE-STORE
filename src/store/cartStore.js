import { observable, computed, action } from "mobx";
import DataStore from '~s/dataStore.js';
import { toJS } from "mobx";

class Products {

    @observable cartsProducts = [];
    
    @action getCartsProducts() {
        this.cartsProducts = [...DataStore.getCartsProducts()];
    }

    @computed get totalPrice() {
        let total = 0;
        this.cartsProducts.forEach((product) => {
            total += product.quantity*product.price;
        });
        return total;
    };

    @action updateProduct (id, newQuant) {
        const index = this.cartsProducts.findIndex(product => product.id === id);
        this.cartsProducts[index].quantity = newQuant;

        DataStore.updateProduct(toJS(this.cartsProducts[index]));
    };

    @action removeFromCart (id) {
        DataStore.removeFromCart(id);
        const index = this.cartsProducts.findIndex(product => product.id === id);
        this.cartsProducts.splice(index, 1);
    };

}



export default new Products();