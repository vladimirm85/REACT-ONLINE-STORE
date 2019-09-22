import React from 'react'
import { Button, Card, CardColumns } from 'react-bootstrap'
import { toJS } from "mobx";
import {observer} from 'mobx-react'
import HomeStore from '~s/homeStore.js';

@observer class Home extends React.Component {

    render () {

        const ID = this.props.match.params.id
        const product = toJS(HomeStore.products.find(el => el.id == ID));

        return (
            <div>
                <CardColumns>
                    <Card key={product.id} className="text-center">
                        <Card.Body>
                            <Card.Title>{product.fullName}</Card.Title>
                            <Card.Text>
                            Price: {product.price} <hr/>
                            Left in stock: {product.rest}
                            </Card.Text>
                            <Button
                                variant={HomeStore.isInCart(product.id) ? "warning" : "primary"}
                                onClick={()=>{
                                    HomeStore.isInCart(product.id)
                                    ? HomeStore.removeFromCart(product.id)
                                    : HomeStore.addToCart(product.id);
                                }}
                            >
                                {HomeStore.isInCart(product.id) ? "Delete from cart" : "Add to cart"}
                            </Button>
                        </Card.Body>
                    </Card>
                </CardColumns>
            </div>
        )
    };
};

export default Home;