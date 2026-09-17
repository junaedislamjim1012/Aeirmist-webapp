import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth as defaultAuth } from "../lib/firebase";

// ইউজারের ইমেল দিয়ে পাসওয়ার্ড রিসেট মেইল পাঠানোর ফাংশন
export function handleForgotPassword(userEmail: string) {
  const auth = defaultAuth || getAuth();
  return sendPasswordResetEmail(auth, userEmail)
    .then(() => {
      // সফলভাবে মেইল পাঠানো হলে নোটিফিকেশন দিন
      alert("পাসওয়ার্ড রিসেট লিংক আপনার ইমেলে পাঠানো হয়েছে। দয়া করে ইনবক্স চেক করুন।");
    })
    .catch((error: any) => {
      const errorMessage = error.message;
      alert("সমস্যা হয়েছে: " + errorMessage);
      throw error;
    });
}

// Global window exposure for direct invocation
if (typeof window !== 'undefined') {
  (window as any).handleForgotPassword = handleForgotPassword;
}
