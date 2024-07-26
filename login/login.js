import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore,doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCT-ti647BdHebExHAIZcCxSqbRqQvpnp0",
  authDomain: "apnabazar-44ee2.firebaseapp.com",
  projectId: "apnabazar-44ee2",
  storageBucket: "apnabazar-44ee2.appspot.com",
  messagingSenderId: "891879870523",
  appId: "1:891879870523:web:9b5468e4230de56f9dcc1e",
  measurementId: "G-E9YDVRY40S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth()
const db = getFirestore()

let email = document.getElementById("email")
let password = document.getElementById("password")

window.login = () => {
    let obj = {
      email: email.value,
      password: password.value  
    }

    signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(async (res)=>{
        const id = res.user.uid;
        const reference = doc(db, "users", id)
        const snap = await getDoc(reference)
        console.log(snap);
        if(snap.exists()){
          localStorage.setItem("users", JSON.stringify(snap.data()));
          window.location.assign("../index.html");
        }else{
            alert("data not found")
        }

    })
    .catch((err)=>{
        console.log(err.message);

    })

}