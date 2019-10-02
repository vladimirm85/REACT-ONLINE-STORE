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
    };

    @action setCustomerData (newCustomerData) {
        this.customerData.name.value = newCustomerData.name;
        this.customerData.email.value = newCustomerData.email;
        this.customerData.address.value = newCustomerData.address;
    };

    @action setTempDataForResultPage () {
        this.tempDataForResultPage.cartsProducts = [...this.RootStore.cart.cartsProducts];
        this.tempDataForResultPage.totalPrice = this.RootStore.cart.totalPrice;
        this.tempDataForResultPage.Customer = this.getCustomerData;
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
};