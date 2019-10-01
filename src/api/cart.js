import DataStore from '~/dataStore';

function get () {
    return DataStore.getCartsProducts().then((response) => {
        return response;
    }).catch(text => {
        console.log(text)
        return [];
    });
};

function add (cartProduct) {
    return DataStore.addCartProduct(cartProduct).then((response) => {
        return response;
    }).catch(text => {
        console.log(text)
        return [];
    });
};

function remove (id) {
    return DataStore.removeCartProduct(id).then((response) => {
        return response;
    }).catch(text => {
        console.log(text);
        return false;
    });
};

function update (cartProduct) {
    return DataStore.updateProduct(cartProduct).then((response) => {
        return response;
    }).catch(text => {
        console.log(text);
        return false;
    });
};

export {get, add, remove, update};