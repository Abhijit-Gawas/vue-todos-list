export default class Validations {
    static checkName(name) {
        if (/^[A-Za-z]+$/.test(name)) {
            return true;
        }

        return false
    }

    static checkEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }

        return false;
    }

    static checkPassword(password) {
        if (/^[A-Za-z]\w{5,}$/.test(password)) {
            return true;
        }

        return false;
    }

    static checkNumber(number) {
        if (/^[0-9]{10}$/.test(number)) {
            return true;
        }

        return false;
    }
}

