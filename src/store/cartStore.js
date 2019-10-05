import { observable, computed, action } from "mobx";

export default class CartStore {

    @observable cartsProducts = [];

    @observable elementInProcessIds = [];

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

        this.elementInProcessIds.push(product.id)

        this.requests.cart.addCartProduct(cartProduct).then((cartProduct) => {
            if (cartProduct) {
                this.cartsProducts.push(cartProduct);
            };
        }).finally(() => {
            const index = this.elementInProcessIds.indexOf(product.id);
            this.elementInProcessIds.splice(index);
        });
    };
    
    @action removeCartProduct (id) {

        this.elementInProcessIds.push(id)

        this.requests.cart.removeCartProduct(id).then((success) => {
            if (success) {
                const index = this.cartsProducts.findIndex(product => product.id === id);
                this.cartsProducts.splice(index, 1);
            };
        }).finally(() => {
            const index = this.elementInProcessIds.indexOf(id);
            this.elementInProcessIds.splice(index);
        });
    };

    @action updateCartProduct (id, newQuant) {        
        const index = this.cartsProducts.findIndex(product => product.id === id);
        const updatedProduct = {...this.cartsProducts[index]};
        updatedProduct.quantity = newQuant;

        this.RootStore.app.updateServerResponseStatus('pending');
        
        this.requests.cart.updateCartProduct(updatedProduct).then((cartProduct) => {
            if (cartProduct) {
                this.cartsProducts[index] = cartProduct;
            };
        }).finally(() => {
            this.RootStore.app.updateServerResponseStatus('fulfilled');
        });
    };

    @action clearCart () {
        this.requests.cart.clearCart().then((success) => {                
            if (success) {
                this.cartsProducts = [];
                return true;
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

    elementInProcess (id) {
        return this.elementInProcessIds.includes(id);
    };
};