class Validator {
    static validate(data, schema) {
        let names = Array.isArray(schema) ? schema : Object.getOwnPropertyNames(schema);
        let flag = true;
        for (let name of names) {
            if (typeof data[name] === 'object' && !Array.isArray(data[name])) {
                flag = Validator.validate(data[name], schema[name])
                if (!flag) {
                    break;
                }
            } else if (Array.isArray(data[name])) {
                for (let val of data[name]) {
                    if (typeof val === 'object' && !Array.isArray(val)) {
                        flag = Validator.validate(val, schema[name][0])
                        if (!flag) {
                            break;
                        }
                    }
                }
            } else if (!data.hasOwnProperty(name) || typeof data[name] !== schema[name]) {
                return false;
            }
        }
        return flag;
    }
}

export default Validator;