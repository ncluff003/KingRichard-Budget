////////////////////////////////////////////
//  Core Modules

////////////////////////////////////////////
//  Third Party Modules;
const nodemailer = require(`nodemailer`);
const pug = require(`pug`);
const htmlToText = require(`html-to-text`);

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
const Calendar = require(`./Calendar`);
////////////////////////////////////////////
//  Email Model

module.exports = class sendEmail {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstname;
    this.lastName = user.lastname;
    this.username = user.username;
    this.url = url;
    this.from = `Nathan Cluff <${process.env.NAMECHEAP_EMAIL}>`;
  }
  // Create Transport
  makeTransport() {
    if (process.env.NODE_ENV === `production`) {
      return nodemailer.createTransport({
        host: 'mail.privateemail.com',
        port: process.env.SECURE_PORT,
        secure: true,
        auth: {
          user: process.env.NAMECHEAP_EMAIL,
          pass: process.env.NAMECHEAP_PASSWORD,
        },
        logger: true,
      });
    }
    return nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
  }

  async _send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../Views/Emails/${template}.pug`, {
      from: this.from,
      to: this.to,
      user: this.user,
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      subject: subject,
      url: this.url,

      greeting: Calendar.getGreeting(),
      hour: Calendar.getHour(),
      minutes: Calendar.getMinutes(),
      timeOfDay: Calendar.getTimeOfDay(),
      day: Calendar.getDay(),
      weekday: Calendar.getWeekday(),
      month: Calendar.getMonth(),
      year: Calendar.getYear(),
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
      text: htmlToText.fromString(html),
      attachments: [
        {
          filename: 'KingRichard-Logo.jpg',
          contentType: 'image/jpeg',
          path: __dirname + `/../../Public/KingRichard-Logo.png`,
          cid: 'company-logo',
        },
      ],
    };

    await this.makeTransport().sendMail(mailOptions);
  }

  // Define The Email Options

  async sendWelcome() {
    await this._send('welcome', `Welcome To Royal King Richard's Family!`);
  }

  async sendResetPassword() {
    await this._send(`resetPasswordEmail`, `Your Requested Password Reset Token (Valid For Only 15 Minutes)`);
  }
  // Send Email
};
