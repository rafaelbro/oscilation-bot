/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';

dotenv.config({ path: `.env.${env}.local` });
dotenv.config({ path: `.env.${env}` });
dotenv.config();

const requiredEnvVars = [
  'DB_CONNECTION_STRING',
  'DB_CONNECTION_STRING_TEST',
  'DATABASE_NAME',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_HOST'
];

const missing = [];
requiredEnvVars.forEach((envvar) => {
  if (!process.env[envvar]) {
    missing.push(envvar);
  }
});

if (missing.length) {
  throw new Error(`Missing environment variables: ${missing.join(',')}`);
}
