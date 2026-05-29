WealthCo - Static Website

This is a simple static website scaffold built with HTML, CSS, and JavaScript. It's responsive and works on mobile and desktop browsers.

Files
- index.html — Home page with hero, mission/vision, and client testimony.
- about.html — Company about page.
- inquiry.html — Inquiry form (first name, last name, mobile, email, message).
- contact.html — Contact information and executive details.
- css/styles.css — Styles and responsive layout.
- js/main.js — JavaScript for navbar toggle and form handling.

How inquiry sending works
- The inquiry form uses a client-side mailto: link to open the user's email client pre-filled with the message.
- Edit `js/main.js` and change the `ADMIN_EMAIL` constant to the website administrator's email address.

Notes and next steps
- Using mailto: relies on the visitor having a configured mail client. For professional websites, consider a server-side email integration or a service like EmailJS or Formspree to send emails without exposing the admin email or requiring client's email client.
- To implement server-side email, create an API endpoint that accepts the form POST, validates input server-side, and sends email via SMTP or an email provider API (SendGrid, Mailgun).

Local preview
- You can open the HTML files directly in the browser or serve the folder with any static server.

License
- This scaffold is provided as-is for your project. Customize as needed.