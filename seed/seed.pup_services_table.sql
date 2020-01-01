
  
TRUNCATE pup_services RESTART IDENTITY CASCADE;

-- DROP the tables and constraints
DROP TABLE IF EXISTS pup_services CASCADE;


-- CREATE PUPSEVICE table without the foreign key
CREATE TABLE IF NOT EXISTS pup_services (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    appt_date Date,
    service_type TEXT NOT NULL,
    note TEXT,
    pup_id INTEGER REFERENCES pups(id) ON DELETE CASCADE

); 

-- insert values into pup_services
INSERT INTO pup_services
  (appt_date, service_type, note)
  VALUES
    ('12/24/2019', 'Grooming', 'Loves bath time'),
    ('1/14/2020', 'Daycare', 'Hates small dogs'),
    ('2/1/2020', 'Vet', 'Update on shots');


-- Add parent_id to the pups
UPDATE pup_services SET pup_id = 1 WHERE id = 1;
UPDATE pup_services SET pup_id = 2 WHERE id = 2;
UPDATE pup_services SET pup_id = 3 WHERE id = 3;

