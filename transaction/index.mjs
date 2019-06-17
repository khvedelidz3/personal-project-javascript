class Transaction {
    constructor() {
        this.store = {};
        this.logs = [];
    }

    async dispatch(scenario) {
        let n = scenario.length;

        for (let i = 0; i < n; i++) {
            let storeBefore = {};
            let storeAfter = {};
            let log = {
                index: scenario[i].index,
                meta: {
                    title: scenario[i].meta.title,
                    description: scenario[i].meta.description
                },
                error: null
            }

            Object.assign(storeBefore, this.store);
            try {
                await scenario[i].call(this.store);

                Object.assign(storeAfter, this.store);
                log.storeBefore = storeBefore;
                log.storeAfter = storeAfter;

                this.logs.push(log);
            } catch (err) {
                log.error = {
                    name: err.name,
                    message: err.message,
                    stack: err.stack
                }
                this.logs.push(log);

                if (!scenario[i].hasOwnProperty('silent') && !scenario[i].silent) {
                    for (i = i - 1; i >= 0; i--) {
                        try {
                            if (scenario[i].hasOwnProperty('restore')) {
                                scenario[i].restore();
                            }
                        } catch (err) {
                            throw err;
                        }
                    }
                    this.store = null;
                    return; 
                }
            }
        }
    }
}


export default Transaction;