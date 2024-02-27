// connectToMongoDB.js

import mongoose from 'mongoose';

const mongoURI = "mongodb+srv://sandeepks2807:vhoCeQvDPVnUi1Bw@cluster0.4tvamgp.mongodb.net/chat-app?retryWrites=true&w=majority";

async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

export default connectToMongoDB;
