import { Router } from 'express';

const router = Router();

// Mock data for team
let team = [
  { id: 1, name: 'Reiber Lozano', email: 'lozanoreiber1@gmail.com', role: 'Administrador', status: 'Activo' },
  { id: 2, name: 'Ana Silva', email: 'ana.silva@smartflow.com', role: 'Gerente', status: 'Activo' },
];

// GET /api/team
router.get('/', (req, res) => {
  res.json(team);
});

// POST /api/team/invite
router.post('/invite', (req, res) => {
  const { name, email, role } = req.body;
  const newMember = {
    id: team.length + 1,
    name,
    email,
    role,
    status: 'Pendiente'
  };
  team.push(newMember);
  res.status(201).json(newMember);
});

export default router;
