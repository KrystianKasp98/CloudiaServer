const CryptoJS = require('crypto-js');
import * as dotenv from 'dotenv';
dotenv.config();

export default class CryptoHandler {

  static encryptPassword(password: string) {
    return CryptoJS.AES.encrypt(password, process.env.SECURE_KEY_CRYPTO).toString();
  }

  static decryptPassword(encryptedPassword: string) {
    const bytes  = CryptoJS.AES.decrypt(encryptedPassword, process.env.SECURE_KEY_CRYPTO);
    return bytes.toString(CryptoJS.enc.Utf8)
  }
}
