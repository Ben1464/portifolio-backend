const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors(
  {
  origin:"https://portifolio-eight-ashen-62.vercel.app/"
  }
));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://portifolio-eight-ashen-62.vercel.app/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/',(req, res)=>{
  res.send({ message: 'server is online' });
})

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'armonkimani@gmail.com',
      pass: 'zpgycpcfxkqqthiu' // Add your actual Gmail password here
    }
  });

  let mailOptions = {
    from: 'armonkimani@gmail.com',
    to: 'kimaniben14@gmail.com',
    subject: 'New Message from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` // Fixed the template literal
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Error sending email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});