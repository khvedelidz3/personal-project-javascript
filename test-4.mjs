//three call case with different order by index

import Transaction from './transaction'

const scenario = [
    {
        index: 3,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
        call: async (store) => {
            store.first = 'first call';
        },
    },
    {
        index: 1,
        meta: {
            title: 'Second title',
            description: 'Second Description'
        },
        call: async (store) => {
            store.second = 'second call';
        },
    },
    {
        index: 2,
        meta: {
            title: 'Third title',
            description: 'Third Description'
        },
        call: async (store) => {
            store.third = 'Third call';
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


