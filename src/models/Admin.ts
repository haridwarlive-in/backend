import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IAdmin extends Document {
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const adminSchema = new mongoose.Schema<IAdmin>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

adminSchema.methods.matchPassword = async function(enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);