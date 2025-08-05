import { Client, Databases, ID } from 'appwrite';

const client = new Client();

client.setEndpoint('https://nyc.cloud.appwrite.io/v1') // Replace with yours
    .setProject('6891');

export const databases = new Databases(client);
export const DB_ID = '6895';

export const COLLECTION_ID = '6891b2';
