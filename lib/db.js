import mongoose from "mongoose";

const connection = {};

const connectDB = async () => {
    try {

        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected = db.connections[0].readyState;
        console.log(`Successfully connnected to mongoDB 👍`);
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
