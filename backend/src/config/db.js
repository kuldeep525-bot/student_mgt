import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGOURL}`);
    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log("DB NOT CONNECTED", error);
  }
};

export default connectdb;
