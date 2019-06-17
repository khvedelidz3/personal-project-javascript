import Transaction from './transaction/index'

const scenario = [
    {
        index: 1,
        silent:true,
        meta: {
            title: 'Read popular customers',
            description: 'This action is responsible for reading the most popular customers'
        },
				// callback for main execution
        call: async (store) => {
            store.somthing = 'first call'
            throw new Error('first error')
        },
				// callback for rollback
        restore: async (store) => {}
    },
    {
        index: 2,
        silent: true,
        meta: {
            title: 'second title',
            description: 'second description'
        },
				// callback for main execution
        call: async (store) => {
            store.name = 'sd';
            throw new Error('some message')
        },
				// callback for rollback
        restore: async (store) => {}
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


