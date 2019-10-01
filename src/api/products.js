import DataStore from '~/dataStore';

function all () {
    return DataStore.getProducts().then((response) => {        
        return response;
    }).catch(text => {
        console.log(text)
        return [];
    });
};

function byId (id) {
    return DataStore.getProductById(id).then((response) => {        
        return response;
    }).catch(text => {
        console.log(text)
        return {};
    });
};

export {all, byId};