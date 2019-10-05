import { observable, computed, action} from "mobx";
import * as yup from 'yup';

export default class CheckoutStore{

    @observable customerData = {
        name: {
            lable: 'Name',
            value: ''
        },
        email: {
            lable: 'E-mail',
            value: ''
        },
        address: {
            lable: 'Delivery address',
            value: ''
        }
    };

    tempDataForResultPage = [];

    constructor (RootStore) {
        this.RootStore = RootStore;
        this.requests = this.RootStore.requests;
    };

    @action setCustomerData (newCustomerData) {
        this.customerData.name.value = newCustomerData.name;
        this.customerData.email.value = newCustomerData.email;
        this.customerData.address.value = newCustomerData.address;
    };

    @action clearCustomerData () {
        this.customerData.name.value = '';
        this.customerData.email.value = '';
        this.customerData.address.value = '';
    };

    @computed get getCustomerData () {
        const customerData = {};        
        for (let key in this.customerData) {
            customerData[key] = this.customerData[key].value;
        };        
        return customerData;
    };
    
    @computed get getValidationSchema() {
        const schema = yup.object().shape({
            name: yup
                .string()
                .required(),
            email: yup
                .string()
                .email()
                .required(),
            address: yup
                .string()
                .required(),    
        });
        return schema;
    };

    setTempDataForResultPage () {
        this.tempDataForResultPage.cartsProducts = [...this.RootStore.cart.cartsProducts];
        this.tempDataForResultPage.totalPrice = this.RootStore.cart.totalPrice;
        this.tempDataForResultPage.Customer = this.getCustomerData;
    };

    placeOrder () {
        return new Promise ((resolve, reject) => {
            this.requests.checkout.placeOrder().then((response) => {
                if (response) {
                    this.setTempDataForResultPage();
                    this.clearCustomerData();
                    this.RootStore.cart.clearCart()
                    resolve(true);
                };
                reject ('Place order fail');
            });
        });
    };
};