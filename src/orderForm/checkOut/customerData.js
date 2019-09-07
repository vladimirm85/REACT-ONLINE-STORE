import React from 'react'
import PropTypes from 'prop-types';
import ProductsForm from './productsForm.js'
import LaziInput from './lazy.js'
import styles from './customerData.module.css'
import { Button, Modal } from 'react-bootstrap'

export default class CustomerData extends React.Component {
        
    state = {
        showModalError: false,
        showModalSubmit: false
    };

    static defaultProps = {
        pageChange: function(){},
        changeCustData: function(){}
    }

    static propTypes = {
        customerData: PropTypes.object.isRequired,
        changeCustData: PropTypes.func,
        products: PropTypes.array.isRequired,
        pageChange: PropTypes.func
    }

    showModalHandler = () => {
        if (this.props.customerData.customerName == 'Enter your name' ||
            this.props.customerData.customerMail == 'Enter your e-mail' ||
            this.props.customerData.deliveryAddress == 'Enter delivery address') {
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
        this.props.changeCustData(e);        
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
                        <LaziInput
                            nativeProps={{type: 'text', id: 1}}
                            value={this.props.customerData.customerName}
                            onChange={(e) => {this.onChange(e)}}
                        />
                    </td>
                </tr>
                <tr>
                    <td>e-mail</td>
                    <td>
                        <LaziInput
                            nativeProps={{type: 'text', id: 2}}
                            value={this.props.customerData.customerMail}
                            onChange={(e) => {this.onChange(e)}}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Delivery address</td>
                    <td>
                        <LaziInput
                            nativeProps={{type: 'text', id: 3}}
                            value={this.props.customerData.deliveryAddress}
                            onChange={(e) => {this.onChange(e)}}
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
                    <strong>Delivery address: </strong>{this.props.customerData.deliveryAddress}
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