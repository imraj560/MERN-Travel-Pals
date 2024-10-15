const nodemailer = require('nodemailer')

const sendVerificationEmail = async() => {

    /**Remember you have to create an app and app password in gmail create app */

    const transporter = nodemailer.createTransport({

        host: "smtp.gmail.com",
        port: 587,
        secure: false,

        auth:{

            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {

        from: process.env.EMAIL_USER,
        to: 'raju560.webdev@gmail.com',
        subject: 'This is a test email',
        text:'Click on the link to get verified'
    }

    await transporter.sendMail(mailOptions)

}

module.exports = sendVerificationEmail;