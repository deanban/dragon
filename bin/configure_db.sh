#!/bin/bash

echo "Dropping dragondb"
dropdb -U node_user dragondb

echo "Creating dragondb"
createdb -U node_user dragondb

echo "Running generation.sql"
psql -U node_user dragondb < ./bin/sql/generation.sql
echo "Running dragon.sql"
psql -U node_user dragondb < ./bin/sql/dragon.sql

echo "dragondb has been configured. Good luck with your new dragons."
