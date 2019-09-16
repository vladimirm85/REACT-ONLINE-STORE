import React from 'react';
import routesList from '~/routes'
import {observer} from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
                    <Switch>
                        {routesComponent}
                    </Switch>
                </div>
            </Router>
        );
    }    
};

export default App;