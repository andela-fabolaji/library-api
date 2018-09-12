import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secureConnection: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const defaultOptions = {
  from: 'Admin <admin@republisher.com>'
};

export const sendMail = (options) => {
  const mailOptions = {
    ...defaultOptions,
    ...options
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Mail err', err);
    }
  });
};