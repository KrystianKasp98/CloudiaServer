import {connect} from 'mongoose';
import User from '../../models/Users/users';
import * as dotenv from 'dotenv';
import { Options } from '../types';

dotenv.config();

const defaultOptions: Options = {
  dbName: process.env.MONGO_DB_NAME || 'test',
};

export default class UserApi {
  static async init(url = process.env.MONGOCLOUD_URL, options = defaultOptions) {
    await connect(url, options);
  }

  static async addUser()
}