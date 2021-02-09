import { transport } from "../core/mailer";

import { SentMessageInfo } from "nodemailer/lib/sendmail-transport";

interface sendEmailProps {
  // emailFrom: string; // он указан в option в создании
  emailTo: string;
  subject: string;
  html: string;
}

export const sendEmail =  (
  { emailTo, subject, html }: sendEmailProps,
  callback?: (err: Error | null, info: SentMessageInfo) => void
) => {
  return transport.sendMail(
    {
      // from: emailFrom,
      to: emailTo,
      subject,
      html,
    },
    callback ||
      function (err: Error | null, info: SentMessageInfo) {
        if (err) {
          console.log(err)
        } else {
          console.log(info)
        }
      }
  );
};
