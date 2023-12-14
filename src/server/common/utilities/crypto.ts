import crypt from 'crypto';

// TODO: determine an appropriate number
const HASH_ROUNDS = 500;

export const hash = (input: Buffer): Buffer => {
  const result = crypt.createHash('sha256').update(input).digest();
  return result;
};
// changed from 256 to 128: salt.toString(hex) returns 512 char
export const generateSalt
= async(): Promise<Buffer> => new Promise((resolve, reject) => {
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
  for (let i = 0; i < HASH_ROUNDS; i += 1) {
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
