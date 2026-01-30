import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  //Transporter = postman , yeh decide karta hai konse email server or kaise authentication
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //gmail ka smtp server
    port: 465, //secure (ssl)
    secure: true, //SSL encryption ON, Data safe rahta hai
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, //yeh gmail password hai
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};
