/* written by Brian McCarthy */
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = 'giftdb';

let dbInstance = null;
let client = null;

async function connectToDatabase() {
    if (dbInstance) return dbInstance;

    client = new MongoClient(url);
    await client.connect();
    console.log("Connected successfully to MongoDB");
    dbInstance = client.db(dbName);
    return dbInstance;
}

export { connectToDatabase };
