const nodemailer = require('nodemailer');

const emailController = {}

emailController.sendEmail = async(req, res) => {
        const email = req.body.email;
        const text = req.body.text;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'quequeres12@gmail.com',
                pass: 'mhlvfytwxogouyxe'
            }
        });

        const mailOptions = {
            from: 'quequeres12@gmail.com',
            to: email,
            subject: 'Nuevo Anuncio',
            text: text
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }
    // export controller
module.exports = emailController;