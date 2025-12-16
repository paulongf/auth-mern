

import SibApiV3Sdk from "sib-api-v3-sdk";

// Config Brevo API 
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// Config transporter to mimic Nodemailer
const transporter = {
  sendMail: async ({ from, to, subject, html }) => {
    try {
      await tranEmailApi.sendTransacEmail({
        sender: { email: from.email || process.env.SENDER_EMAIL, name: from.name || "My App" },
        to: Array.isArray(to)
          ? to.map(email => ({ email })) 
          : [{ email: to }],
        subject,
        htmlContent: html,
      });
      console.log("Email enviado para", to);
    } catch (err) {
      console.error("Erro ao enviar e-mail:", err);
      throw err; 
    }
  },
};

export default transporter;
