import mongoose from "mongoose";

export async function connect() {

  try{
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection;

        connection.on(`connected`,()=>{
          console.log('mongoose.connection successfully');

        })
        connection.on(`error`,(err)=>{
          console.log('MongoDB.connection error.please sure mongodb is running ' +err);
          process.exit();
  })
}

  catch (error) {

    console.log("Something wrong");
    console.log(error);

  }
}
