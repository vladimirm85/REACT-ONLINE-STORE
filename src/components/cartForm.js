import React from 'react'
import PropTypes from 'prop-types';
import Customer from '~s/customerData.js'
import Route from '~s/route.js'
import { Button, Form } from 'react-bootstrap'
import { Formik } from 'formik';
import {observer} from 'mobx-react'

const cartForm = observer( ({showModal}) => {
    
    return (
        <Formik
            validationSchema={Customer.validationSchema}
            onSubmit={(values)=>{
                Customer.setData(values);
                showModal();}}
            initialValues={Customer.getData}
        >
        {({
            handleSubmit,
            handleChange,                        
            values,
            touched,
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
                <Button type="submit">Submit form</Button>
                <Button variant="secondary" onClick={() => {Route.change('CART')}}>Back to Cart</Button>
            </Form>
        )}
        </Formik>
    );
})

cartForm.propTypes = {
    showModal: PropTypes.func
}

cartForm.defaultProps = {
    showModal: PropTypes.func.isRequired     
}

export default cartForm;