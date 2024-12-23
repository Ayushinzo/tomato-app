import mongoose from "mongoose";

async function connectDb(){
    await mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Database connected successfully !!")
    })
    .catch((error)=>{
        console.log("Error occured: ", error)
    })
}

export default connectDb;