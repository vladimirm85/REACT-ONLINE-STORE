import React from 'react'
import ProductsStore from '~s/productsStore.js'
import { Button, Card, CardColumns } from 'react-bootstrap'
import { toJS } from "mobx";
import {observer} from 'mobx-react'

@observer class Home extends React.Component {

    render () {

        const ID = this.props.match.params.id
        const product = toJS(ProductsStore.products.find(el => el.id == ID));

        return (
            <div>
                <CardColumns>
                    <Card key={product.id} className="text-center">
                        <Card.Body>
                            <Card.Title>{product.fullName}</Card.Title>
                            <Card.Text>
                            Price: {product.price} <p/>
                            Left in stock: {product.rest}
                            </Card.Text>
                            <Button
                                variant={product.inCart ? "warning" : "primary"}
                                onClick={()=>{
                                    product.inCart
                                    ? ProductsStore.removeFromCard(product)
                                    : ProductsStore.addToCard(product);
                                }}
                            >
                                {product.inCart ? "Delete from cart" : "Add to cart"}
                            </Button>
                        </Card.Body>
                    </Card>
                </CardColumns>
            </div>
        )
    };
};

export default Home;