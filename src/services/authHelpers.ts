import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth } from "../lib/firebase";

// ==========================================
// ১. সাইন-আপ (Register) ফাংশন
// ==========================================
export function registerUser(email: string, password: string): Promise<User | null> {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // সাইন-আপ সফল হলে
      const user = userCredential.user;
      console.log("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে:", user.email);
      alert("রেজিস্ট্রেশন সফল হয়েছে!");
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("ত্রুটি:", errorCode, errorMessage);
      alert("সমস্যা হয়েছে: " + errorMessage);
      return null;
    });
}

// ==========================================
// ২. লগইন (Login) ফাংশন
// ==========================================
export function loginUser(email: string, password: string): Promise<User | null> {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // লগইন সফল হলে
      const user = userCredential.user;
      console.log("সফলভাবে লগইন হয়েছে:", user.email);
      alert("লগইন সফল হয়েছে!");
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("লগইন ত্রুটি:", errorCode, errorMessage);
      alert("লগইন ব্যর্থ হয়েছে: " + errorMessage);
      return null;
    });
}

// ==========================================
// ৩. ইউজার লগড-ইন আছে কিনা তা চেক করা (State Observer)
// ==========================================
export function initAuthStateObserver(callback?: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // ইউজার লগইন করা অবস্থায় থাকলে
      console.log("বর্তমান ইউজার:", user.email);
    } else {
      // ইউজার লগআউট অবস্থায় থাকলে
      console.log("কোনো ইউজার লগইন করা নেই।");
    }
    if (callback) {
      callback(user);
    }
  });
}

// Global window exposure for direct access/testing in browser console
if (typeof window !== 'undefined') {
  (window as any).registerUser = registerUser;
  (window as any).loginUser = loginUser;
  (window as any).auth = auth;
}
