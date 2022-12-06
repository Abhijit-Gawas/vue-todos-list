import Validations from './Validations';

export default class LoginSignupValidations {
    constructor(name, email, password, number) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.number = number;
    }

    checkValidations() {
        let errors = [];
        //name Validations
        if (!Validations.checkName(this.name)) {
            errors['name'] = "*Enter valid Name"
        }
        //email validations
        if (!Validations.checkEmail(this.email)) {
            errors['email'] = '*Invalid Email Address';
        }

        //password validations
        if (!Validations.checkPassword(this.password)) {
            errors['password'] = '*Password should be of 6 characters';
        }

        //number Validations
        if (!Validations.checkNumber(this.number)) {
            errors['number'] = '*Enter a 10 digit valid Number'
        }
        return errors;
    }
}