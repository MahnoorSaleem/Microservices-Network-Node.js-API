import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rubber-chicken-metadata-db';

const connectDB = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useUnifiedTopology: true,
      } as ConnectOptions);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };

export default connectDB;
