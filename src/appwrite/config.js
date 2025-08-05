import { Client, Databases, ID } from 'appwrite';

const client = new Client();

client.setEndpoint('https://nyc.cloud.appwrite.io/v1') // Replace with yours
    .setProject('6891b88800025bcf86d0');

export const databases = new Databases(client);
export const DB_ID = '6891baae000166f47fa5';
export const COLLECTION_ID = '6891bab5002ae5547d82';