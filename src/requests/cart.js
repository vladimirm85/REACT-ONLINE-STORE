import DataStore from '~/dataStore';

function getCartProducts () {
    return DataStore.getCartProducts().then((response) => {
        return response;
    }).catch(text => {
        console.log(text)
        return [];
    });
};

function addCartProduct (cartProduct) {
    return DataStore.addCartProduct(cartProduct).then((response) => {
        return response;
    }).catch(text => {
        console.log(text)
        return [];
    });
};

function removeCartProduct (id) {
    return DataStore.removeCartProduct(id).then((response) => {
        return response;
    }).catch(text => {
        console.log(text);
        return false;
    });
};

function updateCartProduct (cartProduct) {
    return DataStore.updateCartProduct(cartProduct).then((response) => {
        return response;
    }).catch(text => {
        console.log(text);
        return false;
    });
};

function clearCart () {
    return DataStore.clearCart().then((response) => {        
        return response;
    }).catch(text => {
        console.log(text)
        return false;
    });
};

export {getCartProducts, addCartProduct, removeCartProduct, updateCartProduct, clearCart};