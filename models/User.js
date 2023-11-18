import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required field'],
  },
  email: {
    type: String,
    required: [true, 'Email is required field'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required field'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});
const User = model('User', userSchema);
export default User
