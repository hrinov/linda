import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const UsersSchema = new mongoose.Schema({
  user_id: { type: String, default: uuidv4 },
  email: { type: String },
  password: { type: String },
  access_token: { type: String },
});
