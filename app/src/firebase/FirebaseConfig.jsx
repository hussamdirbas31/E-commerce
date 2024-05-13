import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCu4Vie0NPdD0QgRTtXH5mmQHAvBlsxf0s",
    authDomain: "artizia-miniclone.firebaseapp.com",
    projectId: "artizia-miniclone",
    storageBucket: "artizia-miniclone.appspot.com",
    messagingSenderId: "1095346601944",
    appId: "1:1095346601944:web:403bcaf36efe84ea077cad"
  };
  const app = initializeApp(firebaseConfig);
  const fireDB = getFirestore(app);
  const auth = getAuth(app)
  export {fireDB,auth } 