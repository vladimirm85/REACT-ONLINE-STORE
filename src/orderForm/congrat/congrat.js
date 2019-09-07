import React from 'react'
import PropTypes from 'prop-types';
import ProductsForm from './../checkOut/productsForm.js'
import styles from './congrat.module.css'

const congratForm = ({customerData, products}) => {
    
    return (
        <div>
            <h1 className={styles.h1}>Thank you for buying {customerData.customerName}</h1>
            <h4>Your order: </h4>
            <ProductsForm
                products={products}
            />
            <h4>Will be send to: {customerData.deliveryAddress}</h4>
        </div>
    );
};

congratForm.propTypes = {
    customerData: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired
}

export default congratForm;