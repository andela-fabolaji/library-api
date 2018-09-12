import transporter from '../config/mailer';

const defaultOpts = {
  from: 'Admin <admin@republisher.com>'
};

const sendMail = opts => {
  const mailOptions = {
    ...defaultOpts,
    ...opts
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Mail err', err);
    }
  });
};

export const MailService = {
  /**
   * sends verification email to new users
   * @param {*} param0 
   */
  sendVerificationMail({ firstname, email, token }) {
    const name = `${firstname[0].toUpperCase()}${firstname.substr(1)}`;
    const verificationLink = `http://localhost:3200/auth/verify?ref=${token}`;
    const mailOptions = {
      to: email,
      subject: 'Account Activation',
      html: `
        <table style="background: #f6f6f6; width: 500px; margin: 0 auto; padding: 2.2rem;">
          <tr><td><h2>Hi, <strong>${name}!</strong></h2></td></tr>
          <tr>
            <td>This is to notify you that your account has been created. Just Click on the button below to verify your account.</td>
          </tr>
          <tr>
            <td style="padding-top: 1rem;">
              <a
                href=${verificationLink}
                style="height: 60px; line-height: 60px; text-align: center; font-size: 1rem; width: 220px; background: blue; color: white; text-decoration: none; display: block; border-radius: 5px">Verify Account
              </a>
              <hr/>
              <span>${verificationLink}</span>
            </td>
          </tr>
        </table>  
      `
    };

    sendMail(mailOptions);
  }
};
