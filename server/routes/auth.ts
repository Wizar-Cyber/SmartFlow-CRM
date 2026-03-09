import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import db from '../db'; // Descomentar cuando la base de datos esté lista

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Registro de usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    // await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Simulación de login exitoso para desarrollo
    if (email === 'admin@smartflow.com' && password === 'admin123') {
      const token = jwt.sign({ userId: 1, email }, JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, user: { id: 1, name: 'Admin User', email } });
    }
    
    // Lógica real comentada:
    /*
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });
    
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' });
    
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    */
    
    res.status(401).json({ error: 'Credenciales inválidas' });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

export default router;
