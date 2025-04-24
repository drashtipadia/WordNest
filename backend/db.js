import mongoose from "mongoose";
import { config } from "dotenv";

config();

const connection = async () => {
  try {
    await mongoose.connect(`${process.env.URI}`);
    console.log(`App listening connect to Mongodb`);
  } catch (error) {
    console.log(error);
  }
};

connection();
