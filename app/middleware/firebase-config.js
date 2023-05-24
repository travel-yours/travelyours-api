import firebase from "firebase/app";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAdgMdF-f0g12cqDSQ8DH7fJbYtaBqle1o",
  authDomain: "refined-vector-381300.firebaseapp.com",
  projectId: "refined-vector-381300",
  storageBucket: "refined-vector-381300.appspot.com",
  messagingSenderId: "383488807828",
  appId: "1:383488807828:web:fab86b348a1e3d94a13581",
};

const app = initializeApp(firebaseConfig);
firebase.analytics();
