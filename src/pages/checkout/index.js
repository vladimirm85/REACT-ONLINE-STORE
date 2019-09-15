import React from 'react'
import styles from './index.module.css'
import ProductsForm from '~c/productsForm.js'
import CartForm from '~c/cartForm.js'
import Customer from '~s/customerData.js'
import Route from '~s/route.js'
import { Button, Modal } from 'react-bootstrap'
import {observer} from 'mobx-react'

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

        return (
            <div>
                <h1 className={styles.h1}>Tell us about you</h1>
                <CartForm
                    showModal={this.showModal}
                />

                <Modal show={this.state.showModalSubmit} onHide={this.hideModal} backdrop='static'>
                    <Modal.Header closeButton>
                        <Modal.Title>Verify you order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProductsForm/>
                        <strong>Delivery address: </strong>{Customer.getData.address}
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