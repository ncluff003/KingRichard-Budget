////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules

////////////////////////////////////////////
//  Third Party Module Instances

////////////////////////////////////////////
//  Third Party Config Files

////////////////////////////////////////////
//  Third Party Middleware

////////////////////////////////////////////
//  My Middleware

////////////////////////////////////////////
//  Routing Middleward

////////////////////////////////////////////
//  My Modules

/////////////////////////////////////////
//  Validator Model
class Validator {
  constructor() {}
  isName(name) {
    return /^[A-Za-z]+$/.test(name);
  }
  isUsername(username) {
    return /^[A-Z][A-Za-z0-9]*$/.test(username);
  }
  isEmail(email) {
    return /[^@]+@[^@]+[\.]+(com|net|org|io|edu|(co.uk)|me|tech|money)+$/.test(email.toLowerCase());
  }
  isValidEmailSubject(subject) {
    return /^[^`,@,^,&,+,=,<,>,{,},[,\],;,]*^[^`,@,^,&,+,=,<,>,{,},[,\],;,]+$/.test(subject);
  }
  isCompany(companyName) {
    return /^[^?!*,#,%,*,+,=]*^[^?!*,#,%,*,+,=]*$/.test(companyName);
  }
  isCompanyPosition(position) {
    return /^[^<,>,|,\[,\],?,!,`,~,!,@,#,$,%,^,&,*,+,=,;]*^[^<,>,|,\[,\],?,!,`,~,!,@,#,$,%,^,&,*,+,=,;]*$/.test(position);
  }
  is_Eight_Character_One_Upper_Lower_Number_Special(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%&\-\_])[A-Za-z\d@$!%&\-\_&]{8,}$/.test(password);
  }
}
const Validate = new Validator();
module.exports = Validate;
