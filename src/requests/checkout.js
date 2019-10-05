import DataStore from '~/dataStore';

function placeOrder () {
    return DataStore.placeOrder().then((response) => {
        return response;
    }).catch(text => {
        console.log(text);
        return false
    });
};

export {placeOrder};