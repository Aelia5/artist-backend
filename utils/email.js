const nodemailer = require('nodemailer');

const { NODE_ENV, SERVICE, USER, PASS } = process.env;

const sendEmail = (email, subject, text) => {
  let mailConfig;
  if (NODE_ENV === 'production') {
    mailConfig = {
      service: SERVICE,
      auth: {
        user: USER,
        pass: PASS,
      },
    };
  } else {
    mailConfig = {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'z5rtrh6zztuf7ycr@ethereal.email',
        pass: 'QJ5S3txBS4aVhqrFp1',
      },
    };
  }
  const transporter = nodemailer.createTransport(mailConfig);
  const mailOptions = {
    from: NODE_ENV === 'production' ? USER : 'z5rtrh6zztuf7ycr@ethereal.email',
    to: email,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
