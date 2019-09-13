import mongoose, { Document } from 'mongoose';

export interface User extends Document {
  googleId: string;
}

export const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true }
});

export const User = mongoose.model<User>('users', UserSchema);
