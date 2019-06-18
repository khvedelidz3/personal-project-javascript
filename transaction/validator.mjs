class Validator {
    static validate(data, schema) {
        let diff = Object.getOwnPropertyNames(data)
            .filter(x => !Object.getOwnPropertyNames(schema).includes(x));

        if (diff.length) {
            return false;
        }

        let names = Object.getOwnPropertyNames(schema);
        let flag = true;
        for (let name of names) {
            if (Array.isArray(data[name])) {
                for (let val of data[name]) {
                    flag = Validator.validate(val, schema[name][0])
                    if (!flag) {
                        break;
                    }
                }
            } else if (typeof data[name] === 'object') {
                flag = Validator.validate(data[name], schema[name])
                if (!flag) {
                    break;
                }
            } else if (!data.hasOwnProperty(name)) {
                if (schema[name].hasOwnProperty('optional') && schema[name].optional) {
                    continue;
                } else {
                    flag = false;
                }
            } else if (data.hasOwnProperty(name)) {
                if (typeof data[name] === schema[name].type) {
                    continue;
                } else {
                    flag = false;
                }
            }
        }
        return flag;
    }
}

export default Validator;