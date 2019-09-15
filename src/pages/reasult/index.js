import React from 'react'
import styles from './index.module.css'
import ProductsForm from '~c/productsForm.js'
import Customer from '~s/customerData.js'
import {observer} from 'mobx-react'

const congratForm = observer( () => {
    
    return (
        <div>
            <h1 className={styles.h1}>Thank you for buying, {Customer.getData.name}!</h1>
            <h4>Your order: </h4>
            <ProductsForm/>
            <h4>Will be send to: {Customer.getData.address}</h4>
        </div>
    );
})

export default congratForm;