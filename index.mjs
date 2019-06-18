import Transaction from './transaction/index'

const scenario = [
    {
        index: 1,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers',
        },
        call: async (store) => { },
    },
    {
        index: 2,
        meta: {
            title: 'second title',
            description: 'second description'
        },
        call: async (store) => { },
    }
];

const transaction = new Transaction();

(async () => {
    try {
        await transaction.dispatch(scenario);
        const store = transaction.store;
        const logs = transaction.logs;
        console.log(store)
        console.log(logs)
    } catch (err) {
        console.log(err);
    }
})();


