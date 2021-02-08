const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: process.env.NM_USER,
		pass: process.env.NM_PASSWORD
	}
});

module.exports.sendMessageAck = (email, subject) => {
	transporter.sendMail({
		from: `"Nodemailer Test" <${process.env.NM_USER}>`,
		to: email,
		subject: "Thanks for contacting us",
		text: "We'll get back to you soon!",
		html: `
			<h1>Thanks for getting in touch!</h1>
			<p>We have received your message regarding ${subject}</p>
			<p>We'll get back to you ASAP ❤️</p>
		`
	})
};