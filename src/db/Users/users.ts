import {connect} from 'mongoose';
import User from '../../models/Users/users';
import * as dotenv from 'dotenv';
import {Options, UserAddInterface, UserLoginInterface} from '../types';

dotenv.config();

const defaultOptions: Options = {
  dbName: process.env.MONGO_DB_NAME || 'test',
};

export default class UsersApi {
  static async init(url = process.env.MONGOCLOUD_URL, options = defaultOptions) {
    await connect(url, options);
  }

  static async addUser({name, lastname, email, login, password}: UserAddInterface) {
    const existingUserLogin = await User.find({login});
    if (existingUserLogin.length) {
      return 'passed login is used';
    }
    
    const existingUserEmail = await User.find({email});
    if (existingUserEmail.length) {
      return 'passed email is used';
    }

    const userDocument = new User({name, lastname, email, login, password});
    return await userDocument.save();
  }

  static async loginUser({login, password}: UserLoginInterface) {
    return await User.findOne({login, password});
  }
}
