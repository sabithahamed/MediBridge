-- db/sql/seed_and_indexes.sql
INSERT INTO patients (patient_id, dhp_id, name, dob, contact) VALUES
('p001', 'dhp001', 'Alice Wonder', '1990-05-15', '{"email": "alice@email.com"}'),
('p002', 'dhp002', 'Bob Builder', '1985-11-20', '{"email": "bob@email.com"}'),
('p003', 'dhp003', 'Charlie Brown', '2000-02-01', '{"email": "charlie@email.com"}');

INSERT INTO consents (patient_id, provider_id, scopes, status, purpose, expires_at) VALUES
('p001', 'dr_gregory_house', ARRAY['summary.read', 'symptom.write'], 'active', 'annual-checkup', '2026-12-31 23:59:59');
;
CREATE INDEX idx_consents_patient_provider ON consents(patient_id, provider_id);
CREATE INDEX idx_access_logs_patient_ts ON access_logs(patient_id, ts DESC);