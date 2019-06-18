//one call case

import Transaction from './transaction/index'

const scenario = [
    {
        index: 1,
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


