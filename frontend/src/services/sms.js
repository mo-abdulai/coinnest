import  twilio from "twilio";


const sendSMS = (phone, content) => {
  
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  client.messages
    .create({
      body: content,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
    .then((message) => {
      console.log(message.sid);
    })
    .catch((error) => {
      console.error("Error sending SMS:", error);
    });
};

export default sendSMS;
