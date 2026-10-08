import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";

const firebaseConfig = {
  projectId: "gen-lang-client-0459127194",
  appId: "1:502551850440:web:e03faaee0744fae75724fd",
  apiKey: "AIzaSyDZJcWcNpwpT4qIwrCTwovrtaL-9vV187A",
  authDomain: "gen-lang-client-0459127194.firebaseapp.com",
  storageBucket: "gen-lang-client-0459127194.firebasestorage.app",
  messagingSenderId: "502551850440"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function clearDriveAccessToken() {
  sessionStorage.removeItem("noub_drive_token");
}

export async function requestDriveAccessToken(forcePrompt = false): Promise<string | null> {
  // Check if token already cached in sessionStorage unless forced
  if (!forcePrompt) {
    const cached = sessionStorage.getItem("noub_drive_token");
    if (cached) return cached;
  } else {
    clearDriveAccessToken();
  }

  const provider = new GoogleAuthProvider();
  // Request standard app file scope authorized in OAuth setup
  provider.addScope("https://www.googleapis.com/auth/drive.file");
  provider.setCustomParameters({ prompt: "consent" });

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential && credential.accessToken) {
      sessionStorage.setItem("noub_drive_token", credential.accessToken);
      return credential.accessToken;
    }
  } catch (error: any) {
    console.error("Firebase Google Auth Error:", error);
    throw error;
  }
  return null;
}
