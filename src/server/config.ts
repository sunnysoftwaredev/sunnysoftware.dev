import dotenv from 'dotenv';

dotenv.config();

const getEnvironmentVariable = (key: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const getNumericEnvironmentVariable = (key: string): number => {
  const value = getEnvironmentVariable(key);
  const number = Number.parseInt(value, 10);
  if (Number.isNaN(number)) {
    throw new Error(`Environment variable "${key}" must be a number`);
  }
  return number;
};

export default {
  isProduction: getEnvironmentVariable('NODE_ENV') === 'production',
  pg: {
    host: getEnvironmentVariable('PG_HOST'),
    port: getNumericEnvironmentVariable('PG_PORT'),
    database: getEnvironmentVariable('PG_DATABASE'),
    user: getEnvironmentVariable('PG_USER'),
    password: getEnvironmentVariable('PG_PASSWORD'),
  },
  mailgun: {
    key: getEnvironmentVariable('MAILGUN_API_KEY'),
  },
};
