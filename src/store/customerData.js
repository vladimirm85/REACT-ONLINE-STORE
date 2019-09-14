import { observable, action} from "mobx";

class CustomerData {
    @observable data = getData();

    @action change (name, value) {
        this.data[name].value = value;        
    };
}

export default new CustomerData();

function getData(){
    return {
            customerName: {
                lable: 'Name',
                value: ''
            },
            customerMail: {
                lable: 'E-mail',
                value: ''
            },
            deliveryAddress: {
                lable: 'Delivery address',
                value: ''
        }
    }
}