import { observable, computed, action, toJS } from "mobx";
import ProductsStore from '~s/productsStore.js'

class Products {
    @observable cartProducts = getProducts();

    @computed get totalPrice() {
        let total = 0;
        this.cartProducts.forEach((el, index) => {
            total += el.quantity*this.getFullProdInfo[index].price;
        });
        return total;
    };

    @computed get changeQuantFunc(){
        return this.cartProducts.map((product, i) => {
            return (newQuant) => this.changeQuant(i, newQuant);
        });
    }

    @computed get getFullProdInfo(){
        const prod = this.cartProducts.map(el => {
            return toJS(ProductsStore.products.find(EL => EL.id === el.id));        
        });
        return prod;
    }

    @action changeQuant (i, newQuant) {
        this.cartProducts[i].quantity = newQuant;
    };

    @action addProducts (setID) {
        this.cartProducts.push(
            {
                id: setID,
                quantity: 1
            }
        );
    };

    @action deleteProducts (id) {
        const deleteIndex = this.cartProducts.findIndex(el => el.id === id);
        this.cartProducts.splice(deleteIndex, 1);

        const index = ProductsStore.products.findIndex(EL => EL.id === id);
        ProductsStore.products[index].inCart = false;
    };
}

export default new Products();

function getProducts(){
    return [];
}