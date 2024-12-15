# IRVE Professional Services Landing Page

Landing page for a professional electric vehicle charging infrastructure service in France.

## Features

- Responsive design
- Modern UI with animations
- Contact form with email notifications
- GDPR-compliant cookie management
- Multi-language support (French)
- Mobile-first approach

## Project Structure

```
irve-landing/
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   └── cookie-consent.js
├── images/
│   ├── hero-bg.jpg
│   ├── projects/
│   │   ├── commercial-1.jpg
│   │   ├── residential-1.jpg
│   │   ├── public-1.jpg
│   │   └── maintenance-1.jpg
│   └── certification-logos/
│       ├── irve-certification.png
│       └── qualifelec.png
├── server/
│   └── server.js
├── index.html
├── package.json
└── .env
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables:
     - `SMTP_HOST`: Your SMTP server host
     - `SMTP_PORT`: SMTP port (usually 587)
     - `SMTP_USER`: Your email address
     - `SMTP_PASS`: Your email password
     - `CONTACT_EMAIL`: Email to receive contact form submissions

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser

## Development

- HTML: The main content is in `index.html`
- CSS: Styles are in `css/styles.css`
- JavaScript: Client-side code is in `js/` directory
- Server: Backend code is in `server/server.js`

## Dependencies

- Express.js - Web framework
- Nodemailer - Email handling
- Helmet - Security headers
- CORS - Cross-origin resource sharing
- Express Rate Limit - API rate limiting
- Dotenv - Environment variables

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please contact:
- Email: contact@irve-pro.fr
- Phone: +33 (0)1 XX XX XX XX
