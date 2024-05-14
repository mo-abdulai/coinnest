import twilio from "twilio";

const sendWhatsApp = (message) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

 client.messages
    .create({
        body: message,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+17577526127'
    })
    .then(message => console.log(message.sid))
    .done();
};

export default sendWhatsApp;