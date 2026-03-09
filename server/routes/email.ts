import { Router } from 'express';
import { sendEmail, welcomeEmailHtml, paymentReminderHtml } from '../email';

const router = Router();

// POST /api/email/welcome
router.post('/welcome', async (req, res) => {
  const { clientName, clientEmail, agentName } = req.body;
  if (!clientEmail || !clientName) {
    return res.status(400).json({ error: 'Se requiere clientEmail y clientName' });
  }
  try {
    const result = await sendEmail({
      to: clientEmail,
      subject: `¡Bienvenido a SmartFlow, ${clientName}!`,
      html: welcomeEmailHtml(clientName, agentName || 'el equipo SmartFlow'),
    });
    res.json({ message: 'Correo de bienvenida enviado', ...result });
  } catch (error) {
    console.error('[Email] Error:', error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
});

// POST /api/email/payment-reminder
router.post('/payment-reminder', async (req, res) => {
  const { clientName, clientEmail, amount, dueDate, service } = req.body;
  if (!clientEmail || !clientName || !amount) {
    return res.status(400).json({ error: 'Se requieren clientEmail, clientName y amount' });
  }
  try {
    const result = await sendEmail({
      to: clientEmail,
      subject: `Recordatorio de pago — $${amount}`,
      html: paymentReminderHtml(clientName, amount, dueDate || 'Próximamente', service || 'Servicio SmartFlow'),
    });
    res.json({ message: 'Recordatorio enviado', ...result });
  } catch (error) {
    console.error('[Email] Error:', error);
    res.status(500).json({ error: 'Error al enviar el recordatorio' });
  }
});

// POST /api/email/test — quick connectivity test
router.post('/test', async (req, res) => {
  const { to } = req.body;
  if (!to) return res.status(400).json({ error: 'Se requiere el campo "to"' });
  try {
    const result = await sendEmail({
      to,
      subject: 'SmartFlow CRM — Prueba de conexión SMTP',
      html: '<h2>Prueba exitosa</h2><p>El servicio de correo de SmartFlow está funcionando correctamente.</p>',
    });
    res.json({ message: 'Correo de prueba enviado', ...result });
  } catch (error) {
    console.error('[Email] Error:', error);
    res.status(500).json({ error: 'Error al enviar el correo de prueba' });
  }
});

export default router;
