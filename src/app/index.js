import React from 'react';
import routesList from '~/routes'
import withStore from '~/hocs/withStore.js';
import styles from './app.module.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { RoutesMap } from '~/routes';
import Notifications from '~c/notifications'

class App extends React.Component {

    componentDidMount() {
        this.props.store.cart.getCartProducts();
    };

    render() {

        const { cart: CartStore } = this.props.store;

        const routesComponent = routesList.map((route) => {
            return <Route
                path={route.url}
                component={route.component}
                exact={route.exact}
                key={route.url}
            />
        });
        
        return (
            <Router>
                <Notifications/>
                <header>
                    <div className="container">
                        <hr/>
                        <div className="row justify-content-between">
                            <div className="col col-4">
                                <div className="alert alert-success">Site name</div>
                            </div>
                            <div className="col col-3">
                                <strong>
                                    In Cart: {CartStore.cartsProductsCnt}
                                    <br/>
                                    Total: {CartStore.totalPrice}
                                </strong>
                            </div>
                        </div>
                        <hr/>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col col-3">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <NavLink to={RoutesMap.home} exact activeClassName={styles.active}>
                                        Home
                                    </NavLink>
                                </li>
                                <li className="list-group-item">
                                    <NavLink to={RoutesMap.cart} activeClassName={styles.active}>
                                        Cart
                                    </NavLink>
                                </li>
                                <li className="list-group-item">
                                    <NavLink to={RoutesMap.checkout} activeClassName={styles.active}>
                                        Order
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="col col-9">
                            <Switch>                                
                                {routesComponent}
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }    
};

export default withStore(App);