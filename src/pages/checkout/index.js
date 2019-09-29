import React from 'react';
import styles from './index.module.css';
import ProductsTable from '~c/productsTable.js';
import СheckoutForm from '~f/checkoutForm.js';
import { Button, Modal } from 'react-bootstrap';
import withStore from '~/hocs/withStore.js'
import { Link } from 'react-router-dom';
import { RoutesMap } from '~/routes';
const {Header, Title, Body, Footer} = Modal;

class Checkout extends React.Component {
        
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

        const Customer = this.props.store.checkout;

        return (
            <div>
                <Link to={RoutesMap.home} className="btn btn-secondary">Back to Cart</Link>
                <h1 className={styles.h1}>Tell us about you</h1>
                <СheckoutForm
                    showModal={this.showModal}
                />

                <Modal show={this.state.showModalSubmit} onHide={this.hideModal} backdrop='static'>
                    <Header closeButton>
                        <Title>Verify you order</Title>
                    </Header>
                    <Body>
                        <ProductsTable/>
                        <strong>Delivery address: </strong>{Customer.getData.address}
                    </Body>
                    <Footer>
                        <Button variant="primary" onClick={this.buy}>
                            Buy
                        </Button>
                        <Button variant="secondary" onClick={this.hideModal}>
                            Close
                        </Button>
                    </Footer>
                </Modal>
            </div>
        )
    }
}

export default withStore(Checkout);