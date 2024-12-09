import nodemailer from 'nodemailer';

const sendEmail = async function (subject, text, to) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        });

        const info = await transporter.sendMail({
            from: "samrush0099@gmail.com",
            to: "info@searchmyspace.in" || "tm.alam909@gmail.com",
            subject: subject,
            html: text,
        });
        return info;

    } catch (error) {
        throw error;
    }
}

export default sendEmail;
