import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'mobx-react';
import store from '~s';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.querySelector('#app'));