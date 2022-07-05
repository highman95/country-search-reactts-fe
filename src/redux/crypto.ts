import { Buffer } from "buffer";
import {
  createCipheriv,
  createDecipheriv,
  // randomFill,
  // scrypt,
  createHash,
} from "crypto";

const {
  REACT_APP_CRYPTO_KEY,
  // REACT_APP_CRYPTO_SALT,
  REACT_APP_CRYPTO_MAIN_ALGORITHM,
  REACT_APP_CRYPTO_HASH_ALGORITHM,
} = process.env;

//* const password = REACT_APP_CRYPTO_KEY;
// const salt = REACT_APP_CRYPTO_SALT;
const algorithm = REACT_APP_CRYPTO_MAIN_ALGORITHM!;
const hashAlgorithm = REACT_APP_CRYPTO_HASH_ALGORITHM!;

const inputEncoding = "utf8";
const outputEncoding = "hex";

// compute hash-key
const key = createHash(hashAlgorithm).update(REACT_APP_CRYPTO_KEY!).digest();

// The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.

// First, we'll generate the key. The key length is dependent on the algorithm.
// In this case for aes256, it is 32 bytes (256 bits).
const encrypt = (data: string) => {
  // scrypt(password, salt, 32, (err, key) => {
  // if (err) throw err;

  // Then, we'll generate a random initialization vector
  // randomFill(new Uint8Array(16), (err, iv) => {
  // if (err) throw err;

  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, inputEncoding, outputEncoding);
  encrypted += cipher.final(outputEncoding);
  return encrypted;
  // });
  // });
};

const decrypt = (encrypted: string) => {
  // scrypt(password, salt, 32, (err, key) => {
  // if (err) throw err;

  // Encrypted using same algorithm, key and iv.
  // const encrypted = 'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';

  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, outputEncoding, inputEncoding);
  decrypted += decipher.final(inputEncoding);
  return decrypted;
  // });
};

export const encryptAndStore = (user: object, key0 = "user") => {
  try {
    localStorage.setItem(key0, encrypt(JSON.stringify(user)));
  } catch (e) {
    throw new Error("Unable to encrypt data");
  }
};

export const decryptAndReturn = (key0 = "user") => {
  let user;
  try {
    user = JSON.parse(decrypt(localStorage.getItem(key0)!));
  } catch (e) {
    localStorage.removeItem(key0);
  }

  return user;
};
