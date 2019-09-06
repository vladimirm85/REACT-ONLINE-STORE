import React from 'react'
import PropTypes from 'prop-types';
import ProductsForm from './productsForm.js'
import styles from './customerData.module.css'
import { Button, Modal } from 'react-bootstrap'

export default class CustomerData extends React.Component {
        
    state = {
        customerName: 'Enter your name',
        customerMail: 'Enter your e-mail',
        deliveryAddress: 'Enter delivery address',
        showModalError: false,
        showModalSubmit: false
    };

    static defaultProps = {
        pageChange: function(){}
    }

    static propTypes = {
        products: PropTypes.array.isRequired,
        pageChange: PropTypes.func
    }

    showModalHandler = () => {
        if (this.state.customerName == 'Enter your name' ||
            this.state.customerMail == 'Enter your e-mail' ||
            this.state.deliveryAddress == 'Enter delivery address') {
                this.setState({showModalError: true})
                return;
        };
        
        if (this.state.showModalSubmit) {
            this.setState({showModalSubmit: false});
            return;
        };
        this.setState({showModalSubmit: true})
    }

    showModalError = () => {        
        if (this.state.showModalError) {
            this.setState({showModalError: false});
            return;
        };
        this.setState({showModalError: true})
    }

    onChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;        
        
        switch (id) {
            case '1':
                value
                ? this.setState({customerName: value})
                : e.target.value = 'Enter your name';
                break;
            case '2':
                value
                ? this.setState({customerMail: value})
                : e.target.value = 'Enter your e-mail';
                break;
            default:
                value
                ? this.setState({deliveryAddress: value})
                : e.target.value = 'Enter delivery address';
                break;
        }
    };

    onBlur = (e) => {
        this.onChange(e);
    }

    onKeyUp = (e) => {
        if (e.keyCode === 13) {
        this.onChange(e);
        };
    };

    onClick = (e) => {
        let v = e.target.value;
        if (v == 'Enter your name' ||
            v == 'Enter your e-mail' ||
            v == 'Enter delivery address')
            e.target.value = '';
    };

    render () {
        
        return (
            <div>
                <h1 className={styles.h1}>Tell us about you</h1>
                <table className="table table-bordered">
                <tbody>                
                <tr>
                    <td>Name</td>
                    <td>
                        <input
                            id='1'
                            defaultValue={this.state.customerName}                            
                            onBlur={this.onBlur}
                            onKeyUp={this.onKeyUp}
                            onClick={this.onClick}
                        />
                    </td>
                </tr>
                <tr>
                    <td>e-mail</td>
                    <td>
                        <input
                            id='2'
                            defaultValue={this.state.customerMail}
                            onBlur={this.onBlur}
                            onKeyUp={this.onKeyUp}
                            onClick={this.onClick}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Delivery address</td>
                    <td>
                        <input
                            id='3'
                            defaultValue={this.state.deliveryAddress}
                            onBlur={this.onBlur}
                            onKeyUp={this.onKeyUp}
                            onClick={this.onClick}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Button variant="primary" onClick={this.showModalHandler}>Submit</Button>
                    </td>
                    <td>
                        <Button variant="secondary" onClick={() => {this.props.pageChange('CART')}}>Back to Cart</Button>                        
                    </td>
                </tr>
                </tbody>
            </table>
            
            <Modal show={this.state.showModalSubmit} onHide={this.showModalHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Verify you order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductsForm
                        products={this.props.products}
                    />
                    <strong>Delivery address: </strong>{this.state.deliveryAddress}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {this.props.pageChange('CONGRAT')}}>
                        Buy
                    </Button>
                    <Button variant="secondary" onClick={this.showModalHandler}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                size="sm"
                aria-labelledby="example-modal-sizes-title-sm"
                show={this.state.showModalError}
                onHide={this.showModalError}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Data error</Modal.Title>
                </Modal.Header>
                <Modal.Body>                    
                    <strong>Fill in all the fields</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.showModalError}>
                        Ok
                    </Button>                    
                </Modal.Footer>
            </Modal>
            </div>
        )
    }
}