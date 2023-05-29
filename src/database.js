import { MongoClient } from 'mongodb';

import * as dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

export async function connectDatabase() {
  try {
    await client.connect();

    let db = client.db(process.env.MONGODB_NAME);
    return db;
  } catch (error) {
    console.log('error connecting to');
  }
}
