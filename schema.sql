-- SmartFlow CRM - Database Schema (PostgreSQL)

-- Table: users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user', -- 'admin', 'manager', 'user'
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive'
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: clients
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    company VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    service VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Lead', -- 'Lead', 'Activo', 'Inactivo'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: projects
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'En Progreso', -- 'En Progreso', 'Completado', 'Pausado'
    progress INTEGER DEFAULT 0,
    deadline DATE,
    budget DECIMAL(12, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: notifications
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT,
    type VARCHAR(50), -- 'info', 'success', 'warning', 'error'
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: security_logs
CREATE TABLE IF NOT EXISTS security_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: contracts
CREATE TABLE IF NOT EXISTS contracts (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    sign_date DATE,
    value DECIMAL(12, 2),
    status VARCHAR(20) DEFAULT 'Pendiente', -- 'Firmado', 'En Revisión', 'Pendiente', 'Expirado'
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: payments
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    service VARCHAR(100),
    amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pendiente', -- 'Pagado', 'Pendiente', 'Cancelado'
    method VARCHAR(50), -- 'Transferencia', 'Stripe', 'Efectivo', etc.
    payment_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Initial Admin User (Password: admin123 - hashed version should be used in production)
-- This is just a placeholder, use bcrypt to hash passwords in the app.
INSERT INTO users (name, email, password, role) 
VALUES ('Admin SmartFlow', 'admin@smartflow.com', '$2a$10$x.V9pW/vY.mXvXvXvXvXv.vXvXvXvXvXvXvXvXvXvXvXvXvXvXv', 'admin')
ON CONFLICT (email) DO NOTHING;
