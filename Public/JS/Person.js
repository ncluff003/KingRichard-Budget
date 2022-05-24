import axios from 'axios';
import qs from 'qs';
import { logout } from './Login';

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
    this.latterDaySaint = false;
  }

  async _getPersonData() {
    try {
      let id = window.location.pathname.split('/')[3];
      const response = await axios({
        method: `GET`,
        url: `/App/Users/${id}/Me`,
      });
      if (response[0] === `Email`) console.log(true);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async _logMeOut(id) {
    await logout(id);
  }

  async _deactivateMe(id) {
    try {
      const response = await axios({
        method: `DELETE`,
        url: `/App/Users/${id}/DeactivateMe`,
      });
      if (response.statusText === 'Success') {
        window.location.assign('/App');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async _deleteMe(id) {
    try {
      const response = await axios({
        method: `DELETE`,
        url: `/App/Users/${id}/DeleteMe`,
      });
      if (response.statusText === 'No Content') {
        window.location.assign('/App');
      }
    } catch (error) {
      console.log(error);
    }
  }

  _updateFirstName(firstName) {
    return (this.firstname = firstName);
  }
  _updateLastName(lastName) {
    return (this.lastname = lastName);
  }
  _updateUsername(username) {
    return (this.username = username);
  }

  async _updatePhoto(options) {
    try {
      const response = await axios({
        method: `PATCH`,
        url: `/App/Users/${options.id}/UpdateMe`,
        data: options,
      });
    } catch (error) {
      console.log(error);
    }
  }

  _updateLatterDaySaintStatus() {
    return (this.latterDaySaint = !this.latterDaySaint);
  }

  _updateEmail(email) {
    return (this.email = email);
  }

  _updateEmailConfirmed(emailConfirmed) {
    return (this.emailConfirmed = emailConfirmed);
  }
  _updatePassword(password) {
    return (this.password = password);
  }

  _updatePasswordConfirmed(passwordConfirmed) {
    return (this.passwordConfirmed = passwordConfirmed);
  }

  async _updatePerson(options) {
    try {
      const response = await axios({
        method: `PATCH`,
        url: `/App/Users/${options.id}/UpdateMe`,
        data: qs.stringify({
          ...options,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async _updatePersonPassword(currentPassword, newPassword, newPasswordConfirmed, id) {
    try {
      const response = await axios({
        method: `POST`,
        url: `/App/Users/${id}/UpdateMyPassword`,
        data: qs.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
          newPasswordConfirmed: newPasswordConfirmed,
        }),
      });
      if (response.statusText === 'OK') {
        document.getElementById('currentPassword').value = newPassword;
        document.getElementById('newPassword').value = ``;
        document.getElementById('newPasswordConfirmed').value = ``;
        // window.location.reload(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  _createPlaceholderUser(user, personCopy) {
    personCopy.firstname = user.firstname;
    personCopy.lastname = user.lastname;
    personCopy.username = user.username;
    personCopy.email = user.email;
    personCopy.phoneNumber = user.phoneNumber;
    personCopy.communicationPreference = user.communicationPreference;
    personCopy.photo = user.photo;
    personCopy.latterDaySaint = user.latterDaySaint;
    return personCopy;
  }

  _getLatterDaySaintStatus() {
    return this.latterDaySaint;
  }
}
