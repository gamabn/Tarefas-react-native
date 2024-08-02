import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import { getAuth } from "firebase/auth"; 


let firebaseConfig = {
  apiKey: "AIzaSyAxc4q4SLGaiLHqkIy5jAG2BxZ4T1r95bY",
  authDomain: "tarefas-android.firebaseapp.com",
  databaseURL: "https://tarefas-android-default-rtdb.firebaseio.com",
  projectId: "tarefas-android",
  storageBucket: "tarefas-android.appspot.com",
  messagingSenderId: "812529833772",
  appId: "1:812529833772:web:6a47939a47a5af9fb93e89",
  measurementId: "G-Y3CTR6J517"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); 

export  {database, auth}
