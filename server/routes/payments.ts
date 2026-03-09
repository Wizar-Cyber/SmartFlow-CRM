import express from 'express';
// import db from '../db';

const router = express.Router();

// Obtener todos los pagos
router.get('/', async (req, res) => {
  try {
    // const result = await db.query('SELECT p.*, c.name as client_name FROM payments p LEFT JOIN clients c ON p.client_id = c.id ORDER BY p.created_at DESC');
    // res.json(result.rows);
    
    res.json([
      { id: 1, client_name: 'Agencia Mova', service: 'Consultoría Estratégica', amount: 2400, status: 'Pagado', method: 'Transferencia', payment_date: '2023-10-24' },
      { id: 2, client_name: 'SkyTech Corp', service: 'Mantenimiento Cloud', amount: 1150, status: 'Pendiente', method: 'Efectivo', payment_date: '2023-10-22' }
    ]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pagos' });
  }
});

// Crear pago
router.post('/', async (req, res) => {
  try {
    const { client_id, service, amount, status, method, payment_date } = req.body;
    // const result = await db.query(
    //   'INSERT INTO payments (client_id, service, amount, status, method, payment_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    //   [client_id, service, amount, status, method, payment_date]
    // );
    res.status(201).json({ id: Date.now(), ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear pago' });
  }
});

// Actualizar pago
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { client_id, service, amount, status, method, payment_date } = req.body;
    // const result = await db.query(
    //   'UPDATE payments SET client_id = $1, service = $2, amount = $3, status = $4, method = $5, payment_date = $6 WHERE id = $7 RETURNING *',
    //   [client_id, service, amount, status, method, payment_date, id]
    // );
    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar pago' });
  }
});

// Eliminar pago
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // await db.query('DELETE FROM payments WHERE id = $1', [id]);
    res.json({ message: 'Pago eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar pago' });
  }
});

export default router;
