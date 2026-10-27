import mongoose from "mongoose"

export const DBCONNECT = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo DB is Connect")
    } catch (error) {
        console.log(`Mongo DB is not connect ${error}`)
    }
}