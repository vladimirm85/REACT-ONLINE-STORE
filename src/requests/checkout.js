import DataStore from '~/dataStore';

function placeOrder () {
    return DataStore.placeOrder().then((response) => {
        return response;
    });
};

export {placeOrder};