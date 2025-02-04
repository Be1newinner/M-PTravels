import 'dotenv/config';
import { Storage } from '@google-cloud/storage';

const privateKey = (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n');

const storage = new Storage({
    projectId: process.env.FIREBASE_PROJECT_ID,
    credentials: {
        private_key: privateKey,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
    },
});

const bucket = storage.bucket("wingfi-9b5b7.appspot.com");

export { bucket };