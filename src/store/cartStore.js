import { observable, computed, action, toJS } from "mobx";
import DataStore from '~s/dataStore.js'

class Products {

    @observable productsInCart = DataStore.getProductsInCart;

    @computed get totalPrice() {
        let total = 0;
        this.productsInCart.forEach((product) => {
            total += product.quantity*product.price;
        });
        return total;
    };

    @action changeQuant (id, newQuant) {
        DataStore.changeQuant(id, newQuant);
    };

    @action removeFromCart (id) {
        DataStore.removeFromCart(id);
    };

}

export default new Products();