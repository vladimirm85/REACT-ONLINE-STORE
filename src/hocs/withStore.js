import {observer, inject} from 'mobx-react';

export default function withStore (Component) {
    return inject ('store')(observer (Component));
};