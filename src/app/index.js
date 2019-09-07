import React from 'react';
import CartForm from '~/cart/'
import CustomerData from '~/checkout'
import Congrat from '~/reasult'

export default class extends React.Component {

    state = {
        products: [
            {
                id: 100,
                title: 'Ipnone 200',
                price: 12000,
                rest: 10,
                quantity: 1
            },
            {
                id: 101,
                title: 'Samsung AAZ8',
                price: 22000,
                rest: 5,
                quantity: 1
            },
            {
                id: 103,
                title: 'Nokia 3310',
                price: 5000,
                rest: 2,
                quantity: 1
            },
            {
                id: 105,
                title: 'Huawei ZZ',
                price: 15000,
                rest: 8,
                quantity: 1
            }
        ],
        customerData: {
            customerName: 'Enter your name',
            customerMail: 'Enter your e-mail',
            deliveryAddress: 'Enter delivery address'
        },
        page: 'CART'        
    };

    pageChange = (pageName) => {
        this.setState({page: pageName})
    };

    changeCustData = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        let newCustData = {...this.state.customerData};
        
        switch (id) {
            case '1':
                if (value) {
                    newCustData.customerName = value;
                    this.setState({customerData: newCustData})
                    break;
                }
                newCustData.customerName = 'Enter your name';
                this.setState({customerData: newCustData})
                break;
            case '2':
                if (value) {
                    newCustData.customerMail = value;
                    this.setState({customerData: newCustData})
                    break;
                }
                newCustData.customerMail = 'Enter your e-mail';
                this.setState({customerData: newCustData})
                break;
            default:
                if (value) {
                    newCustData.deliveryAddress = value;
                    this.setState({customerData: newCustData})
                    break;
                }
                newCustData.deliveryAddress = 'Enter delivery address';
                this.setState({customerData: newCustData})
                break;
        }
    };

    onChange = (newQuantity, i) => {
        let newProducts = [...this.state.products];
        let NewProduct = {...this.state.products[i]}
        NewProduct.quantity = newQuantity;
        newProducts[i]=NewProduct;
        this.setState({products: newProducts});
    }

    deleteProduct = (i) => {
        let newProducts = [...this.state.products];
        newProducts.splice(i, 1);
        this.setState({products: newProducts});
    }

    render() {
        let Page;
        
        switch (this.state.page) {
            case 'CART':
                Page = () => {
                    return (
                        <CartForm
                            products={this.state.products}
                            page={this.state.page}
                            pageChange={this.pageChange}
                            deleteProduct={this.deleteProduct}
                            onChange={this.onChange}                            
                        />
                    )
                };
                break;
            case 'DATA':
                Page = () => {
                    return (
                        <CustomerData
                            products={this.state.products}
                            customerData={this.state.customerData}
                            changeCustData={this.changeCustData}
                            pageChange={this.pageChange}
                        />
                    )
                };
                break;
            default:
                Page = () => {
                    return (
                        <Congrat
                            customerData={this.state.customerData}
                            products={this.state.products}
                        />
                    )
                };
                break;         
        }
        
        return (
            <div>
                <Page/>
            </div>
        );
    }    
}