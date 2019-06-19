class Validator {
    static validate(data, schema) {
        let diff = Object.getOwnPropertyNames(data)
            .filter(x => !Object.getOwnPropertyNames(schema).includes(x));

        if (diff.length) {
            throw new Error(`${diff[0]} property should not be in data`)
        }

        let names = Object.getOwnPropertyNames(schema);
        for (let name of names) {
            if (Array.isArray(data[name])) {
                for (let val of data[name]) {
                    Validator.validate(val, schema[name][0])
                }
            } else if (typeof data[name] === 'object') {
                Validator.validate(data[name], schema[name])
            } else if (!data.hasOwnProperty(name)) {
                if (schema[name].hasOwnProperty('optional') && schema[name].optional) {
                    continue;
                } else {
                    throw new Error(`Missing ${name} property`)
                }
            } else if (data.hasOwnProperty(name)) {
                if (typeof data[name] === schema[name].type) {
                    continue;
                } else {
                    throw new Error(`${name} property type should be ${schema[name].type}`)
                }
            }
        }
    }
}

export default Validator;