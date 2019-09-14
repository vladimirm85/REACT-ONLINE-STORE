import React from 'react'
import styles from './index.module.css'
import ProductsForm from '~c/productsForm.js'
import { Button, Modal, Form } from 'react-bootstrap'
import { Formik } from 'formik';
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

        return (
            <div>
                <h1 className={styles.h1}>Tell us about you</h1>
                <Formik
                    validationSchema={Customer.validationSchema}
                    onSubmit={(values)=>{Customer.setData(values);}}
                    initialValues={Customer.getData}
                >
                    {({
                        handleSubmit,
                        handleChange,                        
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group key="1" controlId="validationFormik01">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                isValid={touched.name && !errors.name}
                                isInvalid={!!errors.name}
                            />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group key="2" controlId="validationFormik02">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                type="text"
                                name="mail"
                                value={values.mail}
                                onChange={handleChange}
                                isValid={touched.mail && !errors.mail}
                                isInvalid={!!errors.mail}
                            />
                        <Form.Control.Feedback type="invalid">{errors.mail}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group key="3" controlId="validationFormik03">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={values.address}
                                onChange={handleChange}
                                isValid={touched.address && !errors.address}
                                isInvalid={!!errors.address}
                            />
                        <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" disabled={!isValid} onClick={this.showModal}>Submit form</Button>
                        <Button variant="secondary" onClick={() => {Route.change('CART')}}>Back to Cart</Button>
                    </Form>
                    )}
                </Formik>
                
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