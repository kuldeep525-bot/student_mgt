import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://bachelor97797_db_user:DNU9v6MNiYAvPskA@cluster0.wte8c0r.mongodb.net/?appName=Cluster0"
    );

    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log("DB NOT CONNECTED", error);
  }
};

export default connectdb;
