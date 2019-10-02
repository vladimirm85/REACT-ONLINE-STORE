import DataStore from '~/dataStore';

function getProducts () {
    return DataStore.getProducts().then((response) => {        
        return response;
    }).catch(text => {
        console.log(text)
        return [];
    });
};

function getProductById (id) {
    return DataStore.getProductById(id).then((response) => {        
        return response;
    }).catch(text => {
        console.log(text)
        return {};
    });
};

export {getProducts, getProductById};