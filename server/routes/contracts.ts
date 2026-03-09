import express from 'express';
import { logActivity } from './activity';
// import db from '../db';

const router = express.Router();

// Obtener todos los contratos
router.get('/', async (req, res) => {
  try {
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
    const newContract = { id: Date.now(), ...req.body };
    logActivity('admin@smartflow.com', 'CREATE', 'contrato', `Contrato creado: ${req.body.type || 'Sin tipo'} — ${req.body.client_id || ''}`);
    res.status(201).json(newContract);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear contrato' });
  }
});

// Actualizar contrato
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    logActivity('admin@smartflow.com', 'UPDATE', 'contrato', `Contrato actualizado: ID ${id}`);
    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar contrato' });
  }
});

// Eliminar contrato
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    logActivity('admin@smartflow.com', 'DELETE', 'contrato', `Contrato eliminado: ID ${id}`);
    res.json({ message: 'Contrato eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar contrato' });
  }
});

export default router;
