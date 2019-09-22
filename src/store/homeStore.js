import { observable, computed, action, toJS } from "mobx";
import DataStore from '~s/dataStore.js'

class Products {
    @observable products = DataStore.products;

    @observable productsInCart = DataStore.getProductsInCart;

    @computed get isInCart () {
        return (id) => {
            const product = this.productsInCart.find(product => product.id == id);

            if (product === undefined) {
                return false;
            }

            return true;
        }
    };

    @action addToCart (id) {
        DataStore.addToCart(id);
    };

    @action removeFromCart (id) {
        DataStore.removeFromCart(id);
    };

}

export default new Products();