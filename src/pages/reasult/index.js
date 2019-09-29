import React from 'react';
import styles from './index.module.css';
import ProductsTable from '~c/productsTable.js';
import {observer, inject} from 'mobx-react';

const congratForm = inject('store')(observer(({store}) => {
    const Customer = store.checkout;
    return (
        <div>
            <h1 className={styles.h1}>Thank you for buying, {Customer.getData.name}!</h1>
            <h4>Your order: </h4>
            <ProductsTable/>
            <h4>Will be send to: {Customer.getData.address}</h4>
        </div>
    );
}));

export default congratForm;