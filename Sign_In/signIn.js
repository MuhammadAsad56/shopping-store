  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
  

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

  let name = document.getElementById("name")
  let email = document.getElementById("email")
  let password = document.getElementById("password")

 window.signIn = () => {
  let obj = {
    name: name.value,
    email: email.value,
    password: password.value
  }
  console.log(obj);

  createUserWithEmailAndPassword(auth, obj.email,obj.password)
    .then((res)=>{
      delete obj.password
      obj.id = res.user.uid 
      obj.userType = "user"

      const reference = doc(db, "users", obj.id)
      setDoc(reference, obj)
      .then((res)=> {
        let userObj = JSON.stringify(obj)
        localStorage.setItem("users", userObj)
        window.location.assign("../index.html");
      })
      .catch((err)=>{
         console.log(err);
      })
      
    })
    .catch((err)=>{
      console.log(err);
    })
  }

