import React from 'react';
import styles from './index.module.css';
import LoaderComponent from '~c/loaderComponent.js';
import ProductsTable from '~c/productsTable.js';
import СheckoutForm from '~f/checkoutForm.js';
import { Button, Modal } from 'react-bootstrap';
import withStore from '~/hocs/withStore.js'
import { Link } from 'react-router-dom';
import { RoutesMap } from '~/routes';
const {Header, Title, Body, Footer} = Modal;

class Checkout extends React.Component {
        
    state = {
        showModalSubmit: false,
        showModalСonfirmed: false
    };   

    showModalSubmit = () => {  
        this.setState({showModalSubmit: true})
    };

    hideModalSubmit = () => {      
        this.setState({showModalSubmit: false});        
    };

    showModalСonfirmed = () => {  
        this.setState({showModalСonfirmed: true})
    };

    hideModalСonfirmed = () => {      
        this.setState({showModalСonfirmed: false});
        this.props.history.push(RoutesMap.home);
    };

    placeOrder = () => {
        this.setState({showModalSubmit: false});
        this.props.store.checkoutStore.setServerResponseStatus('pending');
        this.props.store.checkoutStore.placeOrder().then( response => {
                this.showModalСonfirmed();
                this.props.store.checkoutStore.setServerResponseStatus('fulfilled');
            }).catch( text => {
                console.log(text);
                this.props.store.notificationsStore.addNotification('placeOrder');
                this.props.store.checkoutStore.setServerResponseStatus('rejected');
        });
    };


    render () {

        const { checkoutStore, cartStore } = this.props.store;

        return (
            <div>
                {(checkoutStore.getServerResponseStatus === 'pending')
                ?<LoaderComponent/>
                :<div>
                    <Link to={RoutesMap.cart} className="btn btn-secondary">Back to Cart</Link>
                    <h1 className={styles.h1}>Tell us about you</h1>
                    <СheckoutForm
                        showModal={this.showModalSubmit}
                    />

                    <Modal show={this.state.showModalSubmit} onHide={this.hideModalSubmit} backdrop='static'>
                        <Header closeButton>
                            <Title>Verify you order</Title>
                        </Header>
                        <Body>
                            <ProductsTable
                                cartsProducts={cartStore.cartsProducts}
                                totalPrice={cartStore.totalPrice}
                            />
                            <strong>Delivery address: </strong>{checkoutStore.getCustomerData.address}
                        </Body>
                        <Footer>
                            <Button variant="primary" onClick={this.placeOrder}>
                                Place your order
                            </Button>
                            <Button variant="secondary" onClick={this.hideModalSubmit}>
                                Close
                            </Button>
                        </Footer>
                    </Modal>

                    <div>
                        <h1 className={styles.h1}></h1>
                        
                    </div>

                    <Modal
                        show={this.state.showModalСonfirmed}
                        onHide={this.hideModalСonfirmed}
                        backdrop='static'
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Thank you for buying, {checkoutStore.tempDataForResultPage.customer.name}!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Your order: </h4>
                        <ProductsTable
                            cartsProducts={checkoutStore.tempDataForResultPage.cartsProducts}
                            totalPrice={checkoutStore.tempDataForResultPage.totalPrice}
                        />
                        <h4>Will be send to: {checkoutStore.tempDataForResultPage.customer.address}</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideModalСonfirmed}>Close</Button>
                    </Modal.Footer>
                    </Modal>

                </div>}
            </div>
        )
    }
}

export default withStore(Checkout);