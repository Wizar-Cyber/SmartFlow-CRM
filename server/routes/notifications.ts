import { Router } from 'express';

const router = Router();

// Mock data for notifications
let notifications = [
  { id: 1, title: 'Bienvenido a SmartFlow', message: 'Gracias por unirte a nuestro CRM. Comienza explorando tus proyectos.', type: 'info', is_read: false, created_at: new Date().toISOString() },
  { id: 2, title: 'Nuevo Contrato Firmado', message: 'El cliente Tech Solutions ha firmado el contrato de mantenimiento.', type: 'success', is_read: false, created_at: new Date().toISOString() },
];

// GET /api/notifications
router.get('/', (req, res) => {
  res.json(notifications);
});

// PUT /api/notifications/:id/read
router.put('/:id/read', (req, res) => {
  const { id } = req.params;
  const index = notifications.findIndex(n => n.id === parseInt(id));
  if (index !== -1) {
    notifications[index].is_read = true;
    res.json(notifications[index]);
  } else {
    res.status(404).json({ message: 'Notificación no encontrada' });
  }
});

export default router;
