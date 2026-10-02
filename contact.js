/**
 * Vercel Serverless Function — Portfolio Contact Form
 * POST /api/contact
 *
 * Env vars (set in Vercel Project Settings):
 *   RESEND_API_KEY       — from https://resend.com
 *   CONTACT_TO_EMAIL     — romemhartabifranca68@gmail.com
 *   CONTACT_FROM_EMAIL   — optional verified sender (default: onboarding@resend.dev for testing)
 */

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "romemhartabifranca68@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  // Same-origin preferred; allow simple CORS preflight if needed
  const origin = req.headers.origin || "";
  const allowed = process.env.ALLOWED_ORIGIN || "";
  if (req.method === "OPTIONS") {
    if (allowed && origin === allowed) {
      res.setHeader("Access-Control-Allow-Origin", allowed);
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { ok: false, error: "Method not allowed." });
  }

  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return json(res, 500, {
      ok: false,
      error: "Email service is not configured. Please try again later or email me directly.",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return json(res, 400, { ok: false, error: "Invalid request body." });
    }
  }
  if (!body || typeof body !== "object") {
    return json(res, 400, { ok: false, error: "Invalid request body." });
  }

  // Honeypot — bots fill this; humans leave it empty
  if (body.website) {
    // Silently accept to avoid tipping off bots
    return json(res, 200, { ok: true, message: "Message sent successfully. Thank you for reaching out!" });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const message = String(body.message || "").trim();

  if (!name || name.length < 2) {
    return json(res, 400, { ok: false, error: "Please enter your name." });
  }
  if (name.length > MAX_NAME) {
    return json(res, 400, { ok: false, error: "Name is too long." });
  }
  if (!email) {
    return json(res, 400, { ok: false, error: "Please enter your email." });
  }
  if (!isValidEmail(email) || email.length > MAX_EMAIL) {
    return json(res, 400, { ok: false, error: "Please enter a valid email address." });
  }
  if (!message || message.length < 10) {
    return json(res, 400, { ok: false, error: "Please write a message (at least 10 characters)." });
  }
  if (message.length > MAX_MESSAGE) {
    return json(res, 400, { ok: false, error: "Message is too long." });
  }

  const submittedAt = new Date().toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width:560px;background:#111118;border:1px solid #2a2a35;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:20px 24px;background:#0d1117;border-bottom:1px solid #2a2a35;">
              <p style="margin:0;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:#00e5ff;font-weight:600;">New Portfolio Contact</p>
              <h1 style="margin:8px 0 0;font-size:20px;color:#f0f2f5;font-weight:700;">Message from ${safeName}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 6px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Name</p>
              <p style="margin:0 0 18px;font-size:16px;color:#f0f2f5;">${safeName}</p>

              <p style="margin:0 0 6px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Email</p>
              <p style="margin:0 0 18px;font-size:16px;"><a href="mailto:${safeEmail}" style="color:#00e5ff;text-decoration:none;">${safeEmail}</a></p>

              <p style="margin:0 0 6px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#d1d5db;">${safeMessage}</p>

              <p style="margin:0 0 6px;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Submitted</p>
              <p style="margin:0;font-size:14px;color:#a0a8b8;">${escapeHtml(submittedAt)} (PHT)</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;border-top:1px solid #2a2a35;background:#0d1117;">
              <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.5;">
                This message was submitted through the contact form on Rome Mhar Tabifranca's developer portfolio.
                Reply directly to this email to respond to the visitor.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

  const text = [
    "NEW PORTFOLIO CONTACT",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
    "",
    `Submitted: ${submittedAt} (PHT)`,
    "",
    "--------------------------------",
    "This message was submitted through the contact form on Rome Mhar Tabifranca's developer portfolio.",
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New Portfolio Contact — ${name}`,
        html,
        text,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Resend error:", response.status, data);
      return json(res, 500, {
        ok: false,
        error: "We couldn't send your message right now. Please try again or contact me directly by email.",
      });
    }

    return json(res, 200, {
      ok: true,
      message: "Message sent successfully. Thank you for reaching out!",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return json(res, 500, {
      ok: false,
      error: "We couldn't send your message right now. Please try again or contact me directly by email.",
    });
  }
};
