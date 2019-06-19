import Validator from './validator';

class Transaction {
    constructor() {
        this.store = {};
        this.logs = [];
        this.schema = {
            index: {
                type: 'number'
            },
            silent: {
                type: 'boolean',
                optional: true
            },
            meta: {
                title: {
                    type: 'string'
                },
                description: {
                    type: 'string'
                }
            },
            call: {
                type: 'function'
            },
            restore: {
                type: 'function',
                optional: true
            }
        }
    }

    async dispatch(scenario) {
        scenario.sort((a, b) => a.index > b.index);
        this.isValid(scenario)

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

            storeBefore = { ...this.store };

            try {
                await scenario[i].call(this.store);

                log.storeBefore = storeBefore;
                storeAfter = { ...this.store };
                log.storeAfter = storeAfter;

                this.logs.push(log);
            } catch (err) {
                storeAfter = { ...this.store };

                log.error = {
                    name: err.name,
                    message: err.message,
                    stack: err.stack
                };

                if (scenario[i].hasOwnProperty('silent') && scenario[i].silent) {
                    log.silent = true;
                    log.storeBefore = storeBefore;
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

        if (scenario[scenario.length - 1].hasOwnProperty('restore')) {
            throw new Error(`restore method is extra`)
        }

        for (let item of scenario) {
            Validator.validate(item, this.schema)
        }

        let mySet = new Set(scenario.map(x => x.index).filter(x => x >= 0))
        if (mySet.size !== scenario.length) {
            throw new Error(`index value can't be duplicated or negative`)
        }
    }
}


export default Transaction;