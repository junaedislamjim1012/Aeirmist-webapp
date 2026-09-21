import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";

/**
 * Sends a password reset email to the given address via Firebase Auth.
 * Throws on failure — callers should catch and display their own UI feedback.
 */
export async function handleForgotPassword(userEmail: string): Promise<void> {
  await sendPasswordResetEmail(auth, userEmail);
}
