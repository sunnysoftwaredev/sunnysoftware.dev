import crypt from 'crypto';

// Extracted the hashing algorithm to a constant for easy updates or changes.
const HASH_ALGORITHM = 'sha256';
const HASH_ROUNDS = 500;

/**
 * Hashes an input buffer using the defined algorithm.
 * 
 * @param {Buffer} input - The input data to be hashed.
 * @returns {Buffer} The hashed data.
 */
export const hash = (input: Buffer): Buffer => {
  return crypt.createHash(HASH_ALGORITHM).update(input).digest();
};

/**
 * Generates a cryptographically secure random salt.
 * 
 * @returns {Promise<Buffer>} A promise that resolves with the random salt.
 */
export const generateSalt = (): Promise<Buffer> => 
  new Promise((resolve, reject) => {
    // changed from 256 to 128: the salt.toString('hex') will now return 256 char
    crypt.randomBytes(128, (err, buf) => {
      if (err !== null) {
        reject(err);
      }
      resolve(buf);
    });
});

/**
 * Salts and hashes a password string.
 * 
 * @param {string} password - The plain-text password.
 * @param {Buffer} salt - The salt to be used in conjunction with the password.
 * @returns {Buffer} The salted and hashed password.
 */
export const saltAndHash = (password: string, salt: Buffer): Buffer => {
  let saltedPassword = Buffer.concat([Buffer.from(password), salt]);
  for (let i = 0; i < HASH_ROUNDS; i += 1) {
    saltedPassword = hash(saltedPassword);
  }
  return saltedPassword;
};

/**
 * Generates a random string suitable for use as a password.
 * 
 * @param {number} size - The desired length of the password (default is 12).
 * @returns {string} The generated password string.
 */
export const generatePassword = (size = 12): string => {
  return crypt.randomBytes(size).toString('base64').slice(0, size);
};

/**
 * Generates a cryptographically secure reset token.
 * 
 * @param {number} size - The desired length of the reset token (default is 15).
 * @returns {string} The generated reset token string.
 */
export const generateResetToken = (size = 15): string => {
  return crypt.randomBytes(size).toString('hex').slice(0, size);
};
