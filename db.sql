CREATE TABLE locations (
  id          integer PRIMARY KEY,
  long        numeric,
  lat         numeric,
  modtime     timestamp DEFAULT current_timestamp 
);