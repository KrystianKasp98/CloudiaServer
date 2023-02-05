import { connect, connection } from 'mongoose';
import * as dotenv from 'dotenv';
import { Options } from './types';

dotenv.config();

const defaultOptions: Options = {
  dbName: process.env.MONGO_DB_NAME || 'test'
};

export default class ApiBase {
  static init(url = process.env.MONGOCLOUD_URL, options = defaultOptions) {
    connect(url, options);
  }

  static disconect() {
    connection.close();
  }
}
