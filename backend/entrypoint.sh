#!/bin/sh
sleep 5
npm run migration:run
npm run seed
exec "$@"