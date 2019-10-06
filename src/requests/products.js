import DataStore from '~/dataStore';

function getProducts () {
    return DataStore.getProducts().then((response) => {        
        return response;
    });
};

function getProductById (id) {
    return DataStore.getProductById(id).then((response) => {        
        return response;
    });
};

export {getProducts, getProductById};