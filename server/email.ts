import nodemailer from 'nodemailer';

// Configure via environment variables in .env:
//   EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, EMAIL_FROM
// For testing without real SMTP, nodemailer Ethereal is used as fallback.

let transporter: nodemailer.Transporter | null = null;
let testAccount: { user: string; pass: string } | null = null;

async function getTransporter(): Promise<nodemailer.Transporter> {
  if (transporter) return transporter;

  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587', 10),
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log('[Email] Using SMTP from .env');
  } else {
    // Fallback: Ethereal test account (emails viewable at ethereal.email)
    testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log('[Email] No SMTP config found — using Ethereal test account:', testAccount.user);
  }
  return transporter;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(opts: SendEmailOptions): Promise<{ messageId: string; previewUrl?: string }> {
  const t = await getTransporter();
  const from = process.env.EMAIL_FROM || '"SmartFlow CRM" <noreply@smartflow.com>';

  const info = await t.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    text: opts.text || opts.html.replace(/<[^>]+>/g, ''),
    html: opts.html,
  });

  const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
  if (previewUrl) {
    console.log('[Email] Preview URL:', previewUrl);
  }

  return { messageId: info.messageId, previewUrl: previewUrl || undefined };
}

// ─── Templates ────────────────────────────────────────────────────────────────

export function welcomeEmailHtml(clientName: string, agentName: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body { font-family: Arial, sans-serif; background:#f4f5f7; margin:0; padding:0; }
  .container { max-width:560px; margin:40px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.08); }
  .header { background:#0a2540; padding:32px; text-align:center; }
  .header h1 { color:#22c55e; margin:0; font-size:24px; }
  .body { padding:32px; color:#1e293b; }
  .body h2 { color:#0a2540; }
  .footer { padding:16px 32px; background:#f8fafc; border-top:1px solid #e2e8f0; font-size:12px; color:#94a3b8; text-align:center; }
  .btn { display:inline-block; margin:16px 0; padding:12px 28px; background:#22c55e; color:#fff; border-radius:8px; text-decoration:none; font-weight:bold; }
</style></head>
<body>
  <div class="container">
    <div class="header"><h1>SmartFlow CRM</h1></div>
    <div class="body">
      <h2>¡Bienvenido, ${clientName}!</h2>
      <p>Nos complace informarle que su cuenta ha sido creada exitosamente en <strong>SmartFlow CRM</strong>.</p>
      <p>Su agente asignado es <strong>${agentName}</strong>, quien estará en contacto con usted a la brevedad.</p>
      <a class="btn" href="#">Acceder al Portal</a>
      <p style="color:#64748b;font-size:13px;">Si tiene alguna pregunta, no dude en responder este correo.</p>
    </div>
    <div class="footer">© ${new Date().getFullYear()} SmartFlow CRM · Todos los derechos reservados</div>
  </div>
</body>
</html>`;
}

export function paymentReminderHtml(clientName: string, amount: number, dueDate: string, service: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><style>
  body { font-family: Arial, sans-serif; background:#f4f5f7; margin:0; padding:0; }
  .container { max-width:560px; margin:40px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.08); }
  .header { background:#0a2540; padding:32px; text-align:center; }
  .header h1 { color:#f59e0b; margin:0; font-size:24px; }
  .body { padding:32px; color:#1e293b; }
  .amount { font-size:36px; font-weight:900; color:#0a2540; text-align:center; margin:16px 0; }
  .highlight { background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:16px; margin:16px 0; }
  .footer { padding:16px 32px; background:#f8fafc; border-top:1px solid #e2e8f0; font-size:12px; color:#94a3b8; text-align:center; }
  .btn { display:inline-block; margin:16px 0; padding:12px 28px; background:#f59e0b; color:#fff; border-radius:8px; text-decoration:none; font-weight:bold; }
</style></head>
<body>
  <div class="container">
    <div class="header"><h1>Recordatorio de Pago</h1></div>
    <div class="body">
      <p>Estimado/a <strong>${clientName}</strong>,</p>
      <p>Le recordamos que tiene un pago pendiente:</p>
      <div class="highlight">
        <p><strong>Servicio:</strong> ${service}</p>
        <p><strong>Fecha de vencimiento:</strong> ${dueDate}</p>
      </div>
      <div class="amount">$${amount.toLocaleString()}</div>
      <a class="btn" href="#">Pagar ahora</a>
      <p style="color:#64748b;font-size:13px;">Si ya realizó el pago, por favor ignore este mensaje.</p>
    </div>
    <div class="footer">© ${new Date().getFullYear()} SmartFlow CRM · Todos los derechos reservados</div>
  </div>
</body>
</html>`;
}
