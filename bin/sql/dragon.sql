CREATE TABLE dragon(
  id              SERIAL PRIMARY KEY,
  birthday        TIMESTAMP NOT NULL,
  nickname        VARCHAR(64),
  "generationId"  INTEGER,
  "isPublic"      BOOLEAN NOT NULL,
  "saleValue"     INTEGER NOT NULL,
  "sireValue"     INTEGER NOT NULL,
  FOREIGN KEY ("generationId") REFERENCES generation(id)
);
