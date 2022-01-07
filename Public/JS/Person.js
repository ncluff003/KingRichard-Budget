export class Person {
  constructor(options) {
    // firstname, lastname, username, latterDaySaint, email, emailConfirmed, password, passwordConfirmed
    this.firstname = options.firstname;
    this.lastname = options.lastname;
    this.username = options.username;
    this.latterDaySaint = options.latterDaySaint;
    this.email = options.email;
    this.emailConfirmed = options.emailConfirmed;
    this.password = options.password;
    this.passwordConfirmed = options.passwordConfirmed;
  }
}
