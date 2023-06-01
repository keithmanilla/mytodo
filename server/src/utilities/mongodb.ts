import mongoose from "mongoose";

/**
 * MongoDB Connection Configuration.
 * 
 * NOTE: The MongoDB Atlas instance will be
 * terminated after a few days.
 *
 * @returns MongoDB Connection
 */
async function dbConnect() {
    try {
        // No .env file used. Just for quick testing.
        await mongoose
            .connect(`mongodb+srv://todo:47zaCShYkDAzrMkI@testdb.zzv0p.mongodb.net/todo?retryWrites=true&w=majority`, {});
        console.log("Database connected");
    } catch (error) {
        console.error("db error", error);
        process.exit(1);
    }
};

export default dbConnect;
