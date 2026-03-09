import express from 'express';
// import db from '../db'; // Descomentar cuando la DB esté lista

const router = express.Router();

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    // const result = await db.query('SELECT * FROM clients ORDER BY created_at DESC');
    // res.json(result.rows);
    
    // Mock data for now
    res.json([
      { id: 1, name: 'Ana Martins', company: 'TechNova Solutions', email: 'ana.martins@technova.com', phone: '(11) 98765-4321', service: 'Migración Cloud', status: 'Activo', created_at: new Date() },
      { id: 2, name: 'Ricardo Santos', company: 'Logistics Corp', email: 'ricardo@logistics.co', phone: '(21) 99888-1122', service: 'Soporte Premium', status: 'Lead', created_at: new Date() }
    ]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// Obtener un cliente por ID
router.get('/:id', async (req, res) => {
  try {
    // const { id } = req.params;
    // const result = await db.query('SELECT * FROM clients WHERE id = $1', [id]);
    // res.json(result.rows[0]);
    res.json({ id: req.params.id, name: 'Cliente Mock' });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
});

// Crear cliente
router.post('/', async (req, res) => {
  try {
    const { name, company, email, phone, service, status } = req.body;
    // const result = await db.query(
    //   'INSERT INTO clients (name, company, email, phone, service, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    //   [name, company, email, phone, service, status]
    // );
    // res.status(201).json(result.rows[0]);
    res.status(201).json({ id: Date.now(), ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente' });
  }
});

// Actualizar cliente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, company, email, phone, service, status } = req.body;
    // const result = await db.query(
    //   'UPDATE clients SET name = $1, company = $2, email = $3, phone = $4, service = $5, status = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
    //   [name, company, email, phone, service, status, id]
    // );
    // res.json(result.rows[0]);
    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
});

// Eliminar cliente
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // await db.query('DELETE FROM clients WHERE id = $1', [id]);
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
});

export default router;
