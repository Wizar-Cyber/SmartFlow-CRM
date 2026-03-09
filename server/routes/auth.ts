import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { logActivity } from './activity';
// import db from '../db'; // Descomentar cuando la base de datos esté lista

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Mock user store (reemplazar con DB real)
const mockUsers = [
  {
    id: 1,
    name: 'Admin SmartFlow',
    email: 'admin@smartflow.com',
    // bcrypt hash of "admin123"
    password: '$2b$10$KBlM7qENy7SUGZMMPEge4uvvN.NDIK1OPxPq3niC5B.XYPuTG8yA6',
    role: 'admin',
  },
];

// Registro de usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
    // Mock: push to local array (no persiste entre reinicios)
    const newUser = { id: Date.now(), name, email, password: hashedPassword, role: 'agent' };
    mockUsers.push(newUser as typeof mockUsers[0]);
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    logActivity(user.email, 'LOGIN', 'auth', `Inicio de sesión exitoso — rol: ${user.role}`);

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Validar token y devolver usuario actual
router.get('/me', authenticateToken, (req: AuthRequest, res) => {
  const user = mockUsers.find(u => u.id === req.user?.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

export default router;
