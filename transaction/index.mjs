class Transaction {
    constructor() {
        this.store = {};
        this.logs = [];
    }

    async dispatch(scenario) {
        scenario.sort((a, b) => a.index > b.index);
        if(!this.isValid(scenario)) {
            throw new Error('Invalid scenario');
        }

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
            };

            Object.assign(storeBefore, this.store);
            log.storeBefore = storeBefore;

            try {
                await scenario[i].call(this.store);

                Object.assign(storeAfter, this.store);
                log.storeAfter = storeAfter;

                this.logs.push(log);
            } catch (err) {
                Object.assign(storeAfter, this.store);
                log.storeAfter = storeAfter;

                log.error = {
                    name: err.name,
                    message: err.message,
                    stack: err.stack
                };

                if (scenario[i].hasOwnProperty('silent') && scenario[i].silent) {
                    log.silent = true;
                    log.storeAfter = storeAfter;

                    this.logs.push(log);
                } else {
                    this.logs.push(log);

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

    isValid(scenario) {
        if (scenario.length === 1 &&
            scenario[0].hasOwnProperty('restore') ||
            scenario[scenario.length - 1].hasOwnProperty('restore')) {
            return false;
        }

        if(!scenario.every(item => {
            return item.hasOwnProperty('index') &&
                typeof item.index === 'number' &&
                item.hasOwnProperty('meta') &&
                typeof item.meta === 'object' &&
                item.meta.hasOwnProperty('title') &&
                typeof item.meta.title === 'string' &&
                item.meta.hasOwnProperty('description') &&
                typeof item.meta.description === 'string' &&
                item.hasOwnProperty('call') &&
                typeof item.call === 'function'
        })) {
            return false
        }

        for(let i = 0; i < scenario.length-1; i++) {
            if(scenario[i].index >= scenario[i+1].index) {
                return false;
            }
        }

        return true;
    }
}


export default Transaction;