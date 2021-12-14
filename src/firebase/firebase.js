import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuRBQUOL9pRCG_uAPC6c-CBibziO4f7-w",
  authDomain: "creation-2022.firebaseapp.com",
  databaseURL:
    "https://creation-2022-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "creation-2022",
  storageBucket: "creation-2022.appspot.com",
  messagingSenderId: "733411034428",
  appId: "1:733411034428:web:9e36eea51ad4f954e0ca39",
  measurementId: "G-HY5FQ3Y91Y",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
