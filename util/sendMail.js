const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports.sendMail = (msg, res) => {
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.send("email send");
    })
    .catch((error) => {
      console.error(error);
      res.send("email send failed");
    });
};
