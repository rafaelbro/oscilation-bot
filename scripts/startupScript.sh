#!/bin/bash

npm run db:create
npm run db:migrate
npm run start BTCUSD,0.01,5 ADAUSD,0.02,10