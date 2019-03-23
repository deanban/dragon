#!/bin/bash

echo "Dropping dragondb"
dropdb -U node_user dragondb

echo "Creating dragondb"
createdb -U node_user dragondb

echo "Creating Account: Running account.sql"
psql -U node_user dragondb < ./bin/sql/account.sql
echo "Creating Generations: Running generation.sql"
psql -U node_user dragondb < ./bin/sql/generation.sql
echo "Creating Dragons: Running dragon.sql"
psql -U node_user dragondb < ./bin/sql/dragon.sql
echo "Creating Traits: Running trait.sql"
psql -U node_user dragondb < ./bin/sql/trait.sql
echo "Assaigning Traits: Running dragonTrait.sql"
psql -U node_user dragondb < ./bin/sql/dragonTrait.sql
echo "Assaigning Dragons to Users: Running accountDragon.sql"
psql -U node_user dragondb < ./bin/sql/accountDragon.sql

node ./bin/insertTraits.js

echo "dragondb has been configured. Good luck with your new dragons."
