import { Router } from 'express';

const router = Router();

// In-memory mock data shared with individual routes (mirrors their GET responses)
const mockClients = [
  { id: 1, name: 'Ana Martins', company: 'TechNova Solutions', email: 'ana.martins@technova.com', status: 'Activo' },
  { id: 2, name: 'Ricardo Santos', company: 'Logistics Corp', email: 'ricardo@logistics.co', status: 'Lead' },
];

const mockProjects = [
  { id: 1, name: 'Rediseño E-commerce', client_name: 'TechNova', status: 'En Progreso', deadline: '2024-05-15' },
  { id: 2, name: 'App Móvil Delivery', client_name: 'Logistics Corp', status: 'Completado', deadline: '2024-03-20' },
];

const mockContracts = [
  { id: 1, client_name: 'Acme Corp', type: 'Servicios IT', status: 'Firmado', value: 15000 },
  { id: 2, client_name: 'Global Tech', type: 'Licenciamiento', status: 'En Revisión', value: 8200 },
];

// GET /api/search?q=<query>
router.get('/', (req, res) => {
  const query = ((req.query.q as string) || '').toLowerCase().trim();

  if (!query || query.length < 2) {
    return res.json({ clients: [], projects: [], contracts: [] });
  }

  const clients = mockClients.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.company.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query)
  );

  const projects = mockProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.client_name.toLowerCase().includes(query) ||
      p.status.toLowerCase().includes(query)
  );

  const contracts = mockContracts.filter(
    (c) =>
      c.client_name.toLowerCase().includes(query) ||
      c.type.toLowerCase().includes(query) ||
      c.status.toLowerCase().includes(query)
  );

  res.json({ clients, projects, contracts });
});

export default router;
