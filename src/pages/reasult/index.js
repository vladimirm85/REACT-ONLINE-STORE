import React from 'react'
import ProductsForm from '~c/productsForm.js'
import styles from './index.module.css'
import {observer} from 'mobx-react'
import Customer from '~s/customerData.js'

const congratForm = observer( () => {
    
    return (
        <div>
            <h1 className={styles.h1}>Thank you for buying, {Customer.data.customerName.value}!</h1>
            <h4>Your order: </h4>
            <ProductsForm/>
            <h4>Will be send to: {Customer.data.deliveryAddress.value}</h4>
        </div>
    );
})

export default congratForm;