import React from 'react'
import styles from './index.module.css'
import ProductsForm from '~c/productsForm.js'
import { Button, Modal, Form } from 'react-bootstrap'
import {observer} from 'mobx-react'
import Customer from '~s/customerData.js'
import Route from '~s/route.js'

@observer class Checkout extends React.Component {
        
    state = {
        showModalSubmit: false
    };   

    showModal = () => {  
        this.setState({showModalSubmit: true})
    };

    hideModal = () => {      
        this.setState({showModalSubmit: false});        
    };

    buy = () => {
        this.setState({showModalSubmit: false});
        Route.change('RESULT');
    };

    render () {
        let formFilds = [];
        
        for (let name in Customer.data) {
            let field = Customer.data[name];
            
            formFilds.push(
                <Form.Group key={name} controlId={'checkout-form-' + name}>
                    <Form.Label>{field.lable}</Form.Label>
                    <Form.Control
                        type="text"
                        value={field.value}
                        onChange={(e) => {Customer.change(name, e.target.value)}}
                    />
                </Form.Group>
            );
        }

        
        return (
            <div>
                <h1 className={styles.h1}>Tell us about you</h1>
                <Form>
                    {formFilds}
                </Form>
                <Button variant="primary" onClick={this.showModal}>Submit</Button>
                <Button variant="secondary" onClick={() => {Route.change('CART')}}>Back to Cart</Button>

                <Modal show={this.state.showModalSubmit} onHide={this.showModalHandler} backdrop='static'>
                    <Modal.Header closeButton>
                        <Modal.Title>Verify you order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProductsForm/>
                        <strong>Delivery address: </strong>{Customer.data.deliveryAddress.value}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.buy}>
                            Buy
                        </Button>
                        <Button variant="secondary" onClick={this.hideModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Checkout;