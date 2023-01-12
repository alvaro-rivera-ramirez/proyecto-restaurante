const nodemailer= require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "elricondetacnar@gmail.com",
        pass: "zvpregbqntxivhfn"
    },
    tls: { // ELIMINAR EN PRODUCCION
        ciphers:'SSLv3'
    }
});
module.exports = transporter;