import express from 'express';

const router = express.Router();

// Obtener registros de seguridad
router.get('/logs', async (req, res) => {
  try {
    // const result = await db.query('SELECT * FROM security_logs ORDER BY created_at DESC LIMIT 50');
    res.json([]); // Mock
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener registros de seguridad' });
  }
});

// Actualizar configuración de seguridad (2FA, etc)
router.post('/settings', async (req, res) => {
  try {
    res.json({ message: 'Configuración de seguridad actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar seguridad' });
  }
});

export default router;
