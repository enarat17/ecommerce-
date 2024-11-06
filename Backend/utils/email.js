const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name ? user.name.split(" ")[0] : "";
    this.url = url;
    this.from = `UNITED GROUP <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.GMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(subject, text, html) {
    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
      html,
      attachments: [
        {
          filename: "logo.png",
          path: path.join(__dirname, "logo.png"),
          cid: "logo"
        }
      ]
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    // Load the HTML template
    const htmlTemplate = fs.readFileSync(
      path.join(__dirname, "passwordReset.html"),
      "utf-8"
    );

    // Replace placeholders in the HTML template
    const htmlContent = htmlTemplate
      .replace("{{firstName}}", this.firstName)
      .replace("{{url}}", this.url);

    await this.send(
      "Password Reset",
      "Your password reset token (valid for only 10 minutes)",
      htmlContent
    );
  }
};
