# SmartFlow CRM

Enterprise CRM system for managing clients, projects, contracts and payments. Built with React 19, TypeScript, Tailwind CSS v4 and an Express.js backend.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite 6 |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion) |
| Backend | Express.js + tsx (no build step) |
| Auth | JWT (`jsonwebtoken`) + bcrypt (`bcryptjs`) |
| Email | Nodemailer (Ethereal fallback for dev) |
| Database | PostgreSQL schema ready — currently in-memory mock data |

---

## Features

- **JWT Authentication** — Login with bcrypt-hashed passwords, token validation on app load via `/api/auth/me`
- **Global Search** — Real-time dropdown searching across clients, projects and contracts
- **Notification Bell** — Header panel with unread badge, mark-as-read per item or all at once
- **Activity Audit Log** — Tracks CREATE / UPDATE / DELETE / LOGIN actions per entity, viewable in Settings
- **Operations Calendar** — Month-view calendar with project deadlines and payment due dates
- **CSV Export** — Export client and payment tables to CSV with proper UTF-8 encoding
- **Email Integration** — Welcome emails and payment reminders via nodemailer; Ethereal test account used when no SMTP is configured
- **Full CRUD** — Clients, Projects, Contracts, Payments with search and filter
- **Collapsible Sidebar** — Navigation with collapse toggle, active state highlighting
- **Settings Panel** — Profile, Security, Notifications, Billing, Integrations, Team, Activity tabs

---

## Project Structure

```
SmartFlow-CRM/
├── public/                  # Static assets (logo, etc.)
├── server/
│   ├── middleware/
│   │   └── auth.ts          # JWT authenticateToken middleware
│   ├── routes/
│   │   ├── auth.ts          # POST /login, POST /register, GET /me
│   │   ├── clients.ts       # CRUD /api/clients
│   │   ├── projects.ts      # CRUD /api/projects
│   │   ├── contracts.ts     # CRUD /api/contracts
│   │   ├── payments.ts      # CRUD /api/payments
│   │   ├── search.ts        # GET /api/search?q=
│   │   ├── activity.ts      # GET/DELETE /api/activity + logActivity()
│   │   ├── notifications.ts # GET /api/notifications
│   │   ├── email.ts         # POST /api/email/welcome|payment-reminder|test
│   │   ├── team.ts          # GET/POST /api/team
│   │   └── security.ts      # Stub routes
│   ├── email.ts             # Nodemailer transport + HTML templates
│   └── db.ts                # DB connection (PostgreSQL — currently mocked)
├── src/
│   ├── components/
│   │   ├── Header.tsx       # Global search + notification bell
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   └── settings/        # Settings sub-components
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Clients.tsx
│   │   ├── Projects.tsx
│   │   ├── Contracts.tsx
│   │   ├── Payments.tsx
│   │   ├── CalendarPage.tsx
│   │   ├── Settings.tsx
│   │   └── Documentation.tsx
│   ├── utils/
│   │   └── export.ts        # CSV export utility
│   └── App.tsx
├── schema.sql               # PostgreSQL schema
├── server.ts                # Express entry point
└── .env.example             # Environment variable reference
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Wizar-Cyber/SmartFlow-CRM.git
cd SmartFlow-CRM

# Install dependencies
# On Windows, use a clean install to avoid rollup optional dep issues
rm -rf node_modules package-lock.json
npm install

# Copy environment variables
cp .env.example .env
```

### Environment Variables

Edit `.env` with your values:

```env
# JWT secret — change this in production
JWT_SECRET="your-super-secret-jwt-key"

# SMTP email (leave empty to use Ethereal test account)
EMAIL_HOST="smtp.example.com"
EMAIL_PORT="587"
EMAIL_USER="noreply@smartflow.com"
EMAIL_PASS="your-smtp-password"
EMAIL_FROM='"SmartFlow CRM" <noreply@smartflow.com>'
```

### Run

```bash
npm run dev
```

The app runs on **http://localhost:3000**.
Vite dev server proxies `/api/*` requests to the Express backend.

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/login` | Login, returns JWT |
| POST | `/api/auth/register` | Register new user |
| GET | `/api/auth/me` | Validate token, return current user |
| GET | `/api/clients` | List all clients |
| POST | `/api/clients` | Create client |
| PUT | `/api/clients/:id` | Update client |
| DELETE | `/api/clients/:id` | Delete client |
| GET | `/api/projects` | List all projects |
| GET | `/api/contracts` | List all contracts |
| GET | `/api/payments` | List all payments |
| GET | `/api/search?q=` | Search clients, projects, contracts |
| GET | `/api/activity` | Get audit log |
| DELETE | `/api/activity` | Clear audit log |
| GET | `/api/notifications` | List notifications |
| POST | `/api/email/welcome` | Send welcome email |
| POST | `/api/email/payment-reminder` | Send payment reminder |
| POST | `/api/email/test` | Test SMTP connection |

---

## Known Limitations

- All data is stored in **in-memory arrays** and resets on server restart. The PostgreSQL schema (`schema.sql`) is ready — connecting a real database is the next step.
- API routes do not yet enforce JWT authentication. The middleware exists at `server/middleware/auth.ts` and is ready to be applied.
- Frontend `fetch()` calls do not yet send the `Authorization: Bearer` header.

## License

MIT
