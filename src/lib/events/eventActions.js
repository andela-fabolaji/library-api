import { MailService } from '../../services';

/**
 * @description sends a verification mail to newly registered users
 * @param {*} event 
 */
export const sendVerificationMail = mailOpts => MailService.sendVerificationMail(mailOpts);
