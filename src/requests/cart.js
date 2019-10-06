import DataStore from '~/dataStore';

function getCartProducts () {
    return DataStore.getCartProducts().then((response) => {
        return response;
    });
};

function addCartProduct (cartProduct) {
    return DataStore.addCartProduct(cartProduct).then((response) => {
        return response;
    });
};

function removeCartProduct (id) {
    return DataStore.removeCartProduct(id).then((response) => {
        return response;
    });
};

function updateCartProduct (cartProduct) {
    return DataStore.updateCartProduct(cartProduct).then((response) => {
        return response;
    });
};

function clearCart () {
    return DataStore.clearCart().then((response) => {        
        return response;
    });
};

export {getCartProducts, addCartProduct, removeCartProduct, updateCartProduct, clearCart};