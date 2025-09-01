-- db/sql/ddl.sql
CREATE TABLE patients (
    patient_id TEXT PRIMARY KEY, dhp_id TEXT UNIQUE, name TEXT, dob DATE, contact JSONB, created_at TIMESTAMP DEFAULT now()
);
CREATE TABLE consents (
    consent_id SERIAL PRIMARY KEY, patient_id TEXT REFERENCES patients(patient_id), provider_id TEXT, scopes TEXT[], status TEXT, purpose TEXT, expires_at TIMESTAMP
);
CREATE TABLE access_logs (
    log_id BIGSERIAL PRIMARY KEY, actor_id TEXT, patient_id TEXT, action TEXT, reason TEXT, mode TEXT, purpose TEXT, ts TIMESTAMP DEFAULT now()
);
CREATE TABLE observations (
    obs_id TEXT PRIMARY KEY, patient_id TEXT REFERENCES patients(patient_id), type TEXT, severity TEXT, description TEXT, start_at TIMESTAMP, end_at TIMESTAMP
);
CREATE TABLE medication_plans (
    plan_id TEXT PRIMARY KEY, patient_id TEXT REFERENCES patients(patient_id), drug TEXT, dosage TEXT, schedule TEXT, start_at TIMESTAMP, end_at TIMESTAMP
);
CREATE TABLE adherence_logs (
    log_id BIGSERIAL PRIMARY KEY, plan_id TEXT REFERENCES medication_plans(plan_id), at TIMESTAMP, status TEXT
);