import React from 'react'
import styles from './index.module.css'
import ProductsForm from '~f/productsForm.js'
import СheckoutForm from '~f/checkoutForm.js'
import Customer from '~s/customerData.js'
import { Button, Modal } from 'react-bootstrap'
import {observer} from 'mobx-react'
import { Link } from 'react-router-dom';
import { RoutesMap } from '~/routes'

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
        this.props.history.push(RoutesMap.result);
    };

    render () {

        return (
            <div>
                <Link to={RoutesMap.home} className="btn btn-secondary">Back to Cart</Link>
                <h1 className={styles.h1}>Tell us about you</h1>
                <СheckoutForm
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