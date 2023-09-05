import crypt from 'crypto';

// TODO: determine an appropriate number
const HASH_ROUNDS = 3;

export const hash = (input: Buffer): Buffer => {
  const result = crypt.createHash('sha256').update(input).digest();
  return result;
};
// changed from 256
export const generateSalt
= async(): Promise<Buffer> => new Promise((resolve, reject) => {
  crypt.randomBytes(20, (err, buf) => {
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
