import express from 'express';
// import db from '../db';

const router = express.Router();

// Obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    // const result = await db.query('SELECT p.*, c.name as client_name FROM projects p LEFT JOIN clients c ON p.client_id = c.id ORDER BY p.created_at DESC');
    // res.json(result.rows);
    
    // Mock data
    res.json([
      { id: 1, name: 'Rediseño E-commerce', client_name: 'TechNova', status: 'En Progreso', progress: 65, deadline: '2024-05-15', budget: 12000 },
      { id: 2, name: 'App Móvil Delivery', client_name: 'Logistics Corp', status: 'Completado', progress: 100, deadline: '2024-03-20', budget: 8500 }
    ]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proyectos' });
  }
});

// Crear proyecto
router.post('/', async (req, res) => {
  try {
    const { name, client_id, status, progress, deadline, budget } = req.body;
    // const result = await db.query(
    //   'INSERT INTO projects (name, client_id, status, progress, deadline, budget) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    //   [name, client_id, status, progress, deadline, budget]
    // );
    // res.status(201).json(result.rows[0]);
    res.status(201).json({ id: Date.now(), ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear proyecto' });
  }
});

// Actualizar proyecto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, client_id, status, progress, deadline, budget } = req.body;
    // const result = await db.query(
    //   'UPDATE projects SET name = $1, client_id = $2, status = $3, progress = $4, deadline = $5, budget = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
    //   [name, client_id, status, progress, deadline, budget, id]
    // );
    // res.json(result.rows[0]);
    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar proyecto' });
  }
});

// Eliminar proyecto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // await db.query('DELETE FROM projects WHERE id = $1', [id]);
    res.json({ message: 'Proyecto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar proyecto' });
  }
});

export default router;
