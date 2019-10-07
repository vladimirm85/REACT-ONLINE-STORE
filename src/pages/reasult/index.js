import React from 'react';
import styles from './index.module.css';
import ProductsTable from '~c/productsTable.js';
import withStore from '~/hocs/withStore.js'

const congratForm = ({store}) => {

    const { Customer, cartsProducts, totalPrice } = store.checkout.tempDataForResultPage;
    
    return (
        <div>
            <h1 className={styles.h1}>Thank you for buying, {Customer.name}!</h1>
            <h4>Your order: </h4>
            <ProductsTable
                cartsProducts={cartsProducts}
                totalPrice={totalPrice}                
            />
            <h4>Will be send to: {Customer.address}</h4>
        </div>
    );
};

export default withStore(congratForm);