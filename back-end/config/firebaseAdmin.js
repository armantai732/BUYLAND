
import "dotenv/config";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();

const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ?.replace(/^["']|["']$/g, "")
  .replace(/\\n/g, "\n")
  .trim();

if (!projectId || !clientEmail || !privateKey) {
  throw new Error("Firebase credentials missing. Check your .env file.");
}

const firebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
    });

export const firebaseAdminAuth = getAuth(firebaseApp);
