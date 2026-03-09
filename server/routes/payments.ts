import express from 'express';
import { logActivity } from './activity';
// import db from '../db';

const router = express.Router();

// Obtener todos los pagos
router.get('/', async (req, res) => {
  try {
    res.json([
      { id: 1, client_id: 1, client_name: 'Agencia Mova', service: 'Consultoría Estratégica', amount: 2400, status: 'Pagado', method: 'Transferencia', payment_date: '2023-10-24' },
      { id: 2, client_id: 2, client_name: 'SkyTech Corp', service: 'Mantenimiento Cloud', amount: 1150, status: 'Pendiente', method: 'Efectivo', payment_date: '2023-10-22' }
    ]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pagos' });
  }
});

// Crear pago
router.post('/', async (req, res) => {
  try {
    const newPayment = { id: Date.now(), ...req.body };
    logActivity('admin@smartflow.com', 'CREATE', 'pago', `Pago registrado: $${req.body.amount || 0} — ${req.body.status || ''}`);
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear pago' });
  }
});

// Actualizar pago
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    logActivity('admin@smartflow.com', 'UPDATE', 'pago', `Pago actualizado: ID ${id} → ${req.body.status || ''}`);
    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar pago' });
  }
});

// Eliminar pago
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    logActivity('admin@smartflow.com', 'DELETE', 'pago', `Pago eliminado: ID ${id}`);
    res.json({ message: 'Pago eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar pago' });
  }
});

export default router;
