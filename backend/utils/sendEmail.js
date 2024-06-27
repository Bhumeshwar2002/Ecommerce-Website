const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, // Change to true if your SMTP server requires a secure connection (SSL/TLS)
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
            debug: true, // Enable debugging
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully.');
        return { success: true, message: 'Email sent successfully.' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: error.message };
    }
};

module.exports = sendEmail;
