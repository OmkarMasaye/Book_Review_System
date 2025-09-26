const mongoose=require('mongoose')
require('dotenv').config();

const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1); // Exit the process with failure
  }
};
  
module.exports=connectDB;