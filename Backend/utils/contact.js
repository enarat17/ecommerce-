const nodemailer = require("nodemailer");

module.exports = class Contact {
  constructor(user, subject, message, file, recipientEmail) {
    this.to = recipientEmail; // Dynamic admin email from the database
    this.from = user.email;
    this.replyTo = user.email; // Customer's email for replies
    this.subject = subject;
    this.message = message;
    this.file = file;
    this.userDetails = user;
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
  async send() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: this.subject,
      text: this.message,
      html: `
        <p><strong>Email:</strong> ${this.userDetails.email}</p>
        <p><strong>Phone:</strong> ${this.userDetails.phone}</p>
        <p><strong>Subject:</strong> ${this.subject}</p>
        <p><strong>Message:</strong> ${this.message}</p>
      `,
      replyTo: this.replyTo,
      attachments: this.file
        ? [{ filename: this.file.originalname, content: this.file.buffer }]
        : []
    };

    await this.newTransport().sendMail(mailOptions);
  }
};
