import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type Auth,
  type User,
} from "firebase/auth";

export type PayFirebaseUser = {
  uid: string;
  email: string | null;
};

function readFirebaseConfig() {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim() || "";
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim() || "";
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() || "";
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim() || "";
  return { apiKey, authDomain, projectId, appId };
}

export function isFirebaseWebAuthConfigured(): boolean {
  const { apiKey, authDomain, projectId } = readFirebaseConfig();
  return Boolean(apiKey && authDomain && projectId);
}

function getFirebaseAuthInstance(): Auth | null {
  if (typeof window === "undefined" || !isFirebaseWebAuthConfigured()) {
    return null;
  }
  const { apiKey, authDomain, projectId, appId } = readFirebaseConfig();
  const app: FirebaseApp =
    getApps().length > 0
      ? getApp()
      : initializeApp({
          apiKey,
          authDomain,
          projectId,
          ...(appId ? { appId } : {}),
        });
  return getAuth(app);
}

function toPayUser(user: User | null): PayFirebaseUser | null {
  if (!user) return null;
  return { uid: user.uid, email: user.email };
}

export function subscribeFirebaseUser(
  onChange: (user: PayFirebaseUser | null) => void
): () => void {
  const auth = getFirebaseAuthInstance();
  if (!auth) {
    onChange(null);
    return () => {};
  }
  return onAuthStateChanged(auth, (user) => onChange(toPayUser(user)));
}

export async function signInWithGoogle(): Promise<PayFirebaseUser | null> {
  const auth = getFirebaseAuthInstance();
  if (!auth) throw new Error("Firebase Auth is not configured.");
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return toPayUser(result.user);
}

export async function signInWithApple(): Promise<PayFirebaseUser | null> {
  const auth = getFirebaseAuthInstance();
  if (!auth) throw new Error("Firebase Auth is not configured.");
  const provider = new OAuthProvider("apple.com");
  provider.addScope("email");
  provider.addScope("name");
  const result = await signInWithPopup(auth, provider);
  return toPayUser(result.user);
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<PayFirebaseUser | null> {
  const auth = getFirebaseAuthInstance();
  if (!auth) throw new Error("Firebase Auth is not configured.");
  const result = await signInWithEmailAndPassword(auth, email.trim(), password);
  return toPayUser(result.user);
}

export async function createAccountWithEmail(
  email: string,
  password: string
): Promise<PayFirebaseUser | null> {
  const auth = getFirebaseAuthInstance();
  if (!auth) throw new Error("Firebase Auth is not configured.");
  const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
  return toPayUser(result.user);
}

export async function signOutFirebase(): Promise<void> {
  const auth = getFirebaseAuthInstance();
  if (!auth) return;
  await signOut(auth);
}
