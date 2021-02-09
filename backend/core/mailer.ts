  import nodemailer from "nodemailer";

  export const transport = nodemailer.createTransport(
    {
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    },
    { from: `Twitter Clone <${process.env.NODEMAILER_USER}>` }
  );
