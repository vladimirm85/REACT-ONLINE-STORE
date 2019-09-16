import React from 'react'
import PropTypes from 'prop-types';
import Customer from '~s/customerData.js'
import { Button, Form } from 'react-bootstrap'
import { Formik } from 'formik';
import {observer} from 'mobx-react'

const checkoutForm = observer( ({showModal}) => {
    
    return (
        <Formik
            validationSchema={Customer.getValidationSchema}
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
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                        isInvalid={!!errors.email}
                    />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
            </Form>
        )}
        </Formik>
    );
})

checkoutForm.propTypes = {
    showModal: PropTypes.func
}

checkoutForm.defaultProps = {
    showModal: ()=>{}     
}

export default checkoutForm;