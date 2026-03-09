import { Router } from 'express';

const router = Router();

export interface ActivityLog {
  id: number;
  user: string;
  action: string;
  entity: string;
  detail: string;
  ip?: string;
  created_at: string;
}

// In-memory store (replace with DB when ready)
let activityLogs: ActivityLog[] = [
  {
    id: 1,
    user: 'admin@smartflow.com',
    action: 'LOGIN',
    entity: 'auth',
    detail: 'Inicio de sesión exitoso',
    created_at: new Date().toISOString(),
  },
];

let nextId = 2;

export function logActivity(user: string, action: string, entity: string, detail: string, ip?: string) {
  activityLogs.unshift({
    id: nextId++,
    user,
    action,
    entity,
    detail,
    ip,
    created_at: new Date().toISOString(),
  });
  // Keep the last 500 logs in memory
  if (activityLogs.length > 500) {
    activityLogs = activityLogs.slice(0, 500);
  }
}

// GET /api/activity
router.get('/', (req, res) => {
  const limit = parseInt((req.query.limit as string) || '50', 10);
  res.json(activityLogs.slice(0, limit));
});

// DELETE /api/activity — clear all logs (admin only)
router.delete('/', (req, res) => {
  activityLogs = [];
  nextId = 1;
  res.json({ message: 'Registros de actividad eliminados' });
});

export default router;
