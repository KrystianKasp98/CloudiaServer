import { connect, connection } from 'mongoose';
import * as dotenv from 'dotenv';

import User from '../../models/Users/users';
import { Options, UserAddInterface, UserLoginInterface } from '../types';
import { RESPONSE_TEXT } from '../../utils/consts';
import CryptoHandler from '../../utils/cryptoHandler';

dotenv.config();

const defaultOptions: Options = {
  dbName: process.env.MONGO_DB_NAME || 'test'
};

export default class UsersApi {
  static async init(
    url = process.env.MONGOCLOUD_URL,
    options = defaultOptions
  ) {
    await connect(url, options);
  }

  static disconect() {
    connection.close();
  }

  static async addUser({
    name,
    lastname,
    email,
    login,
    password
  }: UserAddInterface) {
    const existingUserLogin = await User.find({ login });
    if (existingUserLogin.length) {
      return RESPONSE_TEXT.USERS.USED_LOGIN;
    }

    const existingUserEmail = await User.find({ email });
    if (existingUserEmail.length) {
      return RESPONSE_TEXT.USERS.USED_EMAIL;
    }

    const userDocument = new User({ name, lastname, email, login, password });
    return userDocument.save();
  }

  static async loginUser({ login, password }: UserLoginInterface) {
    const user = await User.findOne({ login });
    if (!user) return null;
    const decryptedPassword = CryptoHandler.decryptPassword(user.password);
    return decryptedPassword === password ? user : null;
  }

  static async deleteUser(id: string) {
    return User.deleteOne({ _id: id });
  }
}
