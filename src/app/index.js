import React from 'react';
import routesList from '~/routes'
import {observer} from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Table, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { RoutesMap } from '~/routes';

@observer class App extends React.Component {

    render() {

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
                <div>                    
                    <Table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td className="d-inline-block col-2">                                                           
                                    <Nav className="flex-column">                                        
                                        <Link to={RoutesMap.home}>Home</Link>
                                        <Link to={RoutesMap.cart}>Cart</Link>
                                        <Link to={RoutesMap.checkout}>Order</Link>
                                    </Nav>
                                </td>
                                <td className="d-inline-block col-10">
                                    <Switch>
                                        {routesComponent}
                                    </Switch>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Router>
        );
    }    
};

export default App;