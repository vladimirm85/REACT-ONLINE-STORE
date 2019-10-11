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

    @observable serverResponseStatus = '';

    tempDataForResultPage = {
        cartsProducts: [],
        totalPrice: 0,
        customer: {}
    };

    constructor (RootStore) {
        this.RootStore = RootStore;
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

    @action setServerResponseStatus (status) {
        this.serverResponseStatus = status;
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

    @computed get getServerResponseStatus() {
        return this.serverResponseStatus;
    };

    setTempDataForResultPage () {
        this.tempDataForResultPage.cartsProducts = [...this.RootStore.cartStore.cartsProducts];
        this.tempDataForResultPage.totalPrice = this.RootStore.cartStore.totalPrice;
        this.tempDataForResultPage.customer = this.getCustomerData;
    };

    placeOrder () {
        return new Promise ((resolve, reject) => {            
            this.RootStore.checkoutRequests.placeOrder().then( response => {
                if (response) {
                    this.setTempDataForResultPage();
                    this.RootStore.cartStore.clearCart().then( success => {
                            if (success) {
                                this.clearCustomerData();
                                resolve(true);
                            };
                        }).catch( error => {
                            reject (error);
                    });
                };
            }).catch( error => {
                reject (error);
            });
        });
    };
};