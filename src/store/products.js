import { observable, computed, action} from "mobx";

class Products {
    @observable products = getProducts();

    @computed get totalPrice() {
        return this.products.reduce((t, pr) => t + pr.price*pr.quantity, 0);
    };

    @computed get changeOn(){
        return this.products.map((product, i) => {
            return (newQuant) => this.changeQuant(i, newQuant);
        });
    }

    @action changeQuant (i, newQuant) {
        this.products[i].quantity = newQuant;
    };

    @action deleteProducts (i) {
        this.products.splice(i, 1);
    };
}

export default new Products();

function getProducts(){
    return [
        {
            id: 100,
            title: 'Iphone 11',
            price: 800,
            rest: 10,
            quantity: 1
        },
        {
            id: 101,
            title: 'Iphone 11 Pro',
            price: 999,
            rest: 7,
            quantity: 1
        },
        {
            id: 102,
            title: 'Iphone 11 Pro Max',
            price: 1199,
            rest: 10,
            quantity: 1
        },
        {
            id: 103,
            title: 'Samsung S10',
            price: 800,
            rest: 5,
            quantity: 1
        },
        {
            id: 104,
            title: 'Nokia 3310',
            price: 100,
            rest: 200,
            quantity: 1
        },
        {
            id: 105,
            title: 'Huawei p30',
            price: 989,
            rest: 8,
            quantity: 1
        }
    ];
}