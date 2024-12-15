require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// Email configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Input validation
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Email invalide' });
        }

        // Phone validation (French format)
        const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ error: 'Numéro de téléphone invalide' });
        }

        // Send email
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.CONTACT_EMAIL,
            subject: `Nouveau message de ${name}`,
            text: `
                Nom: ${name}
                Email: ${email}
                Téléphone: ${phone}
                
                Message:
                ${message}
            `,
            html: `
                <h2>Nouveau message de contact</h2>
                <p><strong>Nom:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Téléphone:</strong> ${phone}</p>
                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        // Send auto-reply
        const autoReplyOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Merci pour votre message - IRVE Pro Services',
            text: `
                Bonjour ${name},
                
                Nous avons bien reçu votre message et nous vous en remercions.
                Notre équipe vous contactera dans les plus brefs délais.
                
                Cordialement,
                L'équipe IRVE Pro Services
            `,
            html: `
                <h2>Merci pour votre message</h2>
                <p>Bonjour ${name},</p>
                <p>Nous avons bien reçu votre message et nous vous en remercions.</p>
                <p>Notre équipe vous contactera dans les plus brefs délais.</p>
                <br>
                <p>Cordialement,</p>
                <p>L'équipe IRVE Pro Services</p>
            `
        };

        await transporter.sendMail(autoReplyOptions);

        res.status(200).json({ message: 'Message envoyé avec succès' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Une erreur est survenue' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
