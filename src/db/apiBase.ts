import { connect, connection } from 'mongoose';
import * as dotenv from 'dotenv';
import { Options } from './types';

dotenv.config();

const defaultOptions: Options = {
  dbName: process.env.MONGO_DB_NAME || 'test'
};

export default class ApiBase {
  static async init(
    url = process.env.MONGOCLOUD_URL,
    options = defaultOptions
  ) {
    await connect(url, options);
  }

  static disconect() {
    connection.close();
  }
}
