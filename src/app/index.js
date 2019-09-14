import React from 'react';
import Route from '~s/route.js'

import {observer} from 'mobx-react'

@observer class App extends React.Component {

    render() {

        return (
            <div>
                <button onClick={() => this.forceUpdate()}>upd</button>
                {Route.page()}
            </div>
        );
    }    
};

export default App;
