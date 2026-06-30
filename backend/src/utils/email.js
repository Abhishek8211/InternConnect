const nodemailer = require("nodemailer");

/**
 * Send an email via Nodemailer.
 * Configure SMTP credentials in .env before use.
 *
 * @param {Object} options
 * @param {string} options.to      - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html    - HTML email body
 */
const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // true for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM || "InternConnect <noreply@internconnect.com>",
    to,
    subject,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`📧 Email sent: ${info.messageId}`);
  return info;
};

// ─── Email Templates ──────────────────────────────────────────────

/**
 * Welcome email template.
 * @param {string} name - Recipient's name
 */
const welcomeEmailHtml = (name) => `
  <div style="font-family: Inter, sans-serif; max-width: 600px; margin: auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
    <h1 style="color: #4f46e5; margin-bottom: 8px;">Welcome to InternConnect 🚀</h1>
    <p style="color: #374151;">Hi <strong>${name}</strong>,</p>
    <p style="color: #374151;">We're thrilled to have you on board. Start exploring thousands of internship opportunities tailored for you.</p>
    <a href="${process.env.CLIENT_URL}" style="display:inline-block;margin-top:20px;padding:12px 24px;background:#4f46e5;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
      Get Started
    </a>
    <p style="color: #9ca3af; margin-top: 32px; font-size: 12px;">© ${new Date().getFullYear()} InternConnect. All rights reserved.</p>
  </div>
`;

module.exports = { sendEmail, welcomeEmailHtml };
