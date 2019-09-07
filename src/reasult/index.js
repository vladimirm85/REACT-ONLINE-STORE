import React from 'react'
import PropTypes from 'prop-types';
import ProductsForm from '~/checkout/productsForm.js'
import styles from './index.module.css'

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