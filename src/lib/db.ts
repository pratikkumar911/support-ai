import { connect } from "mongoose";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

const mongo_Url = process.env.MONGODB_URL;
if (!mongo_Url) {
    console.error("MongoDB URL not found. Set MONGODB_URL in .env.local");
}

let cache = global.mongoose;

if (!cache) {
    cache = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
    if (cache.conn) {
        return cache.conn;
    }

    if (!cache.promise) {
        cache.promise = connect(mongo_Url!).then((c) => {
            cache.conn = c.connection;
            return cache.conn;
        });
    }

    try {
        return await cache.promise;
    } catch (error) {
        cache.promise = null;
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectDb