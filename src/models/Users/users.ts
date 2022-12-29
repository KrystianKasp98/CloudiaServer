import {Schema, model} from 'mongoose';
import {UserInterface} from '../types';

const userSchema = new Schema<UserInterface>({
  name: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true}, // unique value
  login: {type: String, required: true}, // unique value
  password: {type: String, required: true},
},
{
  timestamps: true
});

const User = model<UserInterface>('User', userSchema);

export default User;
