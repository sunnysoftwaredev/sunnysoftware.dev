import crypt from 'crypto';

// After benchmarking, the number is adjusted to ensure security and performance
const ACCURATE_HASH_ROUNDS = 5000;

export const hash = (input: Buffer): Buffer => {
  const result = crypt.createHash('sha256').update(input).digest();
  return result;
};

export const generateSalt = async (): Promise<Buffer> => new Promise((resolve, reject) => {
  crypt.randomBytes(128, (err, buf) => {
    if (err !== null) {
      reject(err);
    }
    resolve(buf);
  });
});

export const saltAndHash = (password: string, salt: Buffer): Buffer => {
  const bufferPassword = Buffer.from(password);
  let saltedPassword = Buffer.concat([bufferPassword, salt]);
  for (let i = 0; i < ACCURATE_HASH_ROUNDS; i += 1) {
    saltedPassword = hash(saltedPassword);
  }
  return saltedPassword;
};

export const generatePassword = (size = 12): string => {
  const randomString = crypt.randomBytes(size);
  return randomString.toString('base64').slice(0, size);
};

export const generateResetToken = (size = 15): string => {
  const randomString = crypt.randomBytes(size);
  return randomString.toString('hex').slice(0, size);
};
