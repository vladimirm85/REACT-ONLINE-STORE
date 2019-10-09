import React from 'react';
import PropTypes from 'prop-types';
import withStore from '~/hocs/withStore.js'
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
const {Group, Label, Control} = Form;

const checkoutForm = ({store, showModal}) => {
    
    const { checkoutStore } = store;

    return (    
        <Formik
            validationSchema={checkoutStore.getValidationSchema}
            onSubmit={(newCustomerData)=>{
                checkoutStore.setCustomerData(newCustomerData);
                showModal();}}
            initialValues={checkoutStore.getCustomerData}
        >
            {({
                handleSubmit,
                handleChange,                        
                values,
                touched,
                errors,
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Group key="1" controlId="validationFormik01">
                        <Label>Name</Label>
                        <Control
                            type="text"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            isValid={touched.name && !errors.name}
                            isInvalid={!!errors.name}
                        />
                    <Control.Feedback type="invalid">{errors.name}</Control.Feedback>
                    </Group>
                    <Group key="2" controlId="validationFormik02">
                        <Label>E-mail</Label>
                        <Control
                            type="text"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            isValid={touched.email && !errors.email}
                            isInvalid={!!errors.email}
                        />
                    <Control.Feedback type="invalid">{errors.email}</Control.Feedback>
                    </Group>
                    <Group key="3" controlId="validationFormik03">
                        <Label>Delivery address</Label>
                        <Control
                            type="text"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            isValid={touched.address && !errors.address}
                            isInvalid={!!errors.address}
                        />
                    <Control.Feedback type="invalid">{errors.address}</Control.Feedback>
                    </Group>
                    <Button type="submit">Submit form</Button>
                </Form>
            )}
        </Formik>
    )  
    
};

checkoutForm.propTypes = {
    showModal: PropTypes.func.isRequired
}

export default withStore(checkoutForm);