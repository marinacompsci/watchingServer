CREATE TABLE locations (
  id          integer PRIMARY KEY,
  long        integer,
  lat         integer,
  modtime     timestamp DEFAULT current_timestamp 
);