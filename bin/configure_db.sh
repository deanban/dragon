#!/bin/bash

echo "Dropping dragondb"
dropdb -U node_user dragondb

echo "Creating dragondb"
createdb -U node_user dragondb

echo "Creating Generations: Running generation.sql"
psql -U node_user dragondb < ./bin/sql/generation.sql
echo "Creating Dragons: Running dragon.sql"
psql -U node_user dragondb < ./bin/sql/dragon.sql
echo "Assaigning Traits: Running trait.sql"
psql -U node_user dragondb < ./bin/sql/trait.sql

node ./bin/insertTraits.js

echo "dragondb has been configured. Good luck with your new dragons."
