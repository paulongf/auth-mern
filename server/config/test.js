

// Problem: SMTP timeout in production
await transporter.sendMail({
  from: process.env.SENDER_EMAIL,
  to: user.email,
  subject: "Welcome!",
  html: "<p>Hello!</p>"
});
