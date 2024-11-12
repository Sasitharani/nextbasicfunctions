import nodemailer from 'nodemailer';

export async function POST(request) {
  const { email, subject, body } = await request.json();

  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Gmail SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sasitharani@gmail.com', // Replace with your email
      pass: 'xwwhhaozejfdiavv', // Replace with your Google App Password
    },
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Inshphile Enquiry form', // Replace with your email
    to: email,
    subject: subject,
    text: body,
  });

  return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
}