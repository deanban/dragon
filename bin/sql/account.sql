CREATE TABLE account(
  id          SERIAL PRIMARY KEY,
  username    CHARACTER(64),
  password    CHARACTER(72),
  "sessionId" CHARACTER(36),
  balance     INTEGER NOT NULL
)
