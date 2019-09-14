import React from 'react';
import Route from '~s/route.js'

import {observer} from 'mobx-react'

import Customer from '~s/customerData.js'


@observer class App extends React.Component {

    render() {

        return (
            <div>
                {Route.page()}
            </div>
        );
    }    
};

export default App;