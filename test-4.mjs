//three call case with different order by index

import Transaction from './transaction/index'

const scenario = [
    {
        index: 3,
        // silent: true,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
        // callback for main execution
        call: async (store) => {
            store.first = 'first call';
            // throw new Error('Error inside first call')
        },
        // restore: async () => {}
    },
    {
        index: 1,
        // silent: true,
        meta: {
            title: 'Second title',
            description: 'Second Description'
        },
        // callback for main execution
        call: async (store) => {
            store.second = 'second call';
            // throw new Error('Error inside second call')
        },
        // restore: async () => {}
    },
    {
        index: 2,
        // silent: true,
        meta: {
            title: 'Third title',
            description: 'Third Description'
        },
        // callback for main execution
        call: async (store) => {
            store.third = 'Third call';
            // throw new Error('Error inside Third call')
        },
        // restore: async () => {}
    }
];

const transaction = new Transaction();

(async() => {
    try {
        await transaction.dispatch(scenario);
        const store = transaction.store; // {} | null
        const logs = transaction.logs; // []
        console.log(logs);
        console.log(store);
    } catch (err) {
        // Send email about broken transaction
        console.log(err);
    }
})();


