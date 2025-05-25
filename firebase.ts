// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDWIliMpkCtorkNxcr3GD10R4BOtBmdcDE",
  authDomain: "khanh-s-blog.firebaseapp.com",
  projectId: "khanh-s-blog",
  storageBucket: "khanh-s-blog.appspot.com",
  messagingSenderId: "140255046031",
  appId: "1:140255046031:web:cbd1ff9d6d61cbbea603fa",
  measurementId: "G-KYMS1GQE1J",
  databaseURL:
    "https://khanh-s-blog-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database };
