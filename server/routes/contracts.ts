import express from 'express';
// import db from '../db';

const router = express.Router();

// Obtener todos los contratos
router.get('/', async (req, res) => {
  try {
    // const result = await db.query('SELECT co.*, cl.name as client_name FROM contracts co LEFT JOIN clients cl ON co.client_id = cl.id ORDER BY co.created_at DESC');
    // res.json(result.rows);
    
    res.json([
      { id: 1, client_name: 'Acme Corp', type: 'Servicios IT', sign_date: '2023-10-12', value: 15000, status: 'Firmado' },
      { id: 2, client_name: 'Global Tech', type: 'Licenciamiento', sign_date: '2023-11-05', value: 8200, status: 'En Revisión' }
    ]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener contratos' });
  }
});

// Crear contrato
router.post('/', async (req, res) => {
  try {
    const { client_id, type, sign_date, value, status } = req.body;
    // const result = await db.query(
    //   'INSERT INTO contracts (client_id, type, sign_date, value, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    //   [client_id, type, sign_date, value, status]
    // );
    res.status(201).json({ id: Date.now(), ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear contrato' });
  }
});

// Actualizar contrato
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { client_id, type, sign_date, value, status } = req.body;
    // const result = await db.query(
    //   'UPDATE contracts SET client_id = $1, type = $2, sign_date = $3, value = $4, status = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
    //   [client_id, type, sign_date, value, status, id]
    // );
    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar contrato' });
  }
});

// Eliminar contrato
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // await db.query('DELETE FROM contracts WHERE id = $1', [id]);
    res.json({ message: 'Contrato eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar contrato' });
  }
});

export default router;
