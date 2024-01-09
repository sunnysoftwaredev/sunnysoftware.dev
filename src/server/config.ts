import dotenv from 'dotenv';

dotenv.config();

const getEnvironmentVariable = (key: string): string => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

function getEnvironmentVariableAsNumber<T extends string>(key: T, radix: number = 10): number {
  const value = getEnvironmentVariable(key);
  const number = Number.parseInt(value, radix);
  if (Number.isNaN(number)) {
    throw new Error(`Environment variable "${key}" must be a valid number, but got "${value}"`);
  }
  return number;
}

export default {
  isProduction: getEnvironmentVariable('NODE_ENV') === 'production',
  pg: {
    host: getEnvironmentVariable('PG_HOST'),
    port: getEnvironmentVariableAsNumber('PG_PORT'),
    database: getEnvironmentVariable('PG_DATABASE'),
    user: getEnvironmentVariable('PG_USER'),
    password: getEnvironmentVariable('PG_PASSWORD'),
  },
  mailgun: {
    key: getEnvironmentVariable('MAILGUN_API_KEY'),
  },
};
