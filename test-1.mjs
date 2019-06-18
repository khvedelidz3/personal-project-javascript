//one call case

import Transaction from './transaction'

const scenario = [
    {
        index: 1,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
        call: async (store) => {
            store.first = 'first call';
        },
    }
];

const transaction = new Transaction();

(async () => {
    try {
        await transaction.dispatch(scenario);
        const store = transaction.store;
        const logs = transaction.logs;
        console.log(logs);
        console.log(store);
    } catch (err) {
        console.log(err);
    }
})();


