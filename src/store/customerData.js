import { observable, computed, action} from "mobx";
import * as yup from 'yup';

class CustomerData {
    @observable data = dataStore();
    
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

    @computed get getData () {
        const data = {};        
        for (let key in this.data) {
            data[key] = this.data[key].value;
        };        
        return data;
    }

    @action setData (newData) {
        this.data.name.value = newData.name;
        this.data.email.value = newData.email;
        this.data.address.value = newData.address;
    }

    @action change (key, value) {
        this.data[key].value = value;
    };
}

export default new CustomerData();

function dataStore(){
    return {
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
    }
};