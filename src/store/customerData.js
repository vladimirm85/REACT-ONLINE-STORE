import { observable, computed, action} from "mobx";
import * as yup from 'yup';

class CustomerData {
    @observable data = dataStore();
    
    @computed get getValidationSchema() {
        const schema = yup.object().shape({
            name: yup
                .string()
                .required(),
            mail: yup
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
        let data = {};        
        for (let key in this.data) {
            data[key] = this.data[key].value;
        };        
        return data;
    }

    @action setData (newData) {
        this.data.name.value = newData.name;
        this.data.mail.value = newData.mail;
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
            mail: {
                lable: 'E-mail',
                value: ''
            },
            address: {
                lable: 'Delivery address',
                value: ''
        }
    }
};