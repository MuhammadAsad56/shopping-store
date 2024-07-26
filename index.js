import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, collection,getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCT-ti647BdHebExHAIZcCxSqbRqQvpnp0",
  authDomain: "apnabazar-44ee2.firebaseapp.com",
  projectId: "apnabazar-44ee2",
  storageBucket: "apnabazar-44ee2.appspot.com",
  messagingSenderId: "891879870523",
  appId: "1:891879870523:web:9b5468e4230de56f9dcc1e",
  measurementId: "G-E9YDVRY40S"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore()
const auth = getAuth()

let signinLink = document.getElementById("signinLink")
let loginLink = document.getElementById("loginLink")
let uplodLink = document.getElementById("uplodLink")
let logoutBtn = document.getElementById("logoutBtn")

function init(){
   let userObj = localStorage.getItem("users");
   userObj = JSON.parse(userObj)
   console.log(userObj);
   if(userObj){
    signinLink.style.display = "none"
    loginLink.style.display  = "none"
    logoutBtn.style.display  = "block"
    if(userObj.userType === "user"){
        uplodLink.style.display = "none"  
    }else{
        uplodLink.style.display = "block"  
    }
   }else{
    signinLink.style.display = "block"
    loginLink.style.display = "block"
    logoutBtn.style.display = "none"
}
}
init()

window.logout = () => {
    signOut(auth)
    .then(()=> {
     localStorage.removeItem("users");
     init()
})
.catch((err)=>{
    console.log(err.message);
})
}

let product_content = document.getElementById("product_content")

let products = []
let getData = async () =>{
   const reference = collection(db, "products");
   const res = await getDocs(reference)
   console.log(res);
   res.forEach((doc)=>{
       let obj = {
        id: doc.id,
        ...doc.data()
       }
       products.push(obj)
       console.log(products);
       let {imageUrl, productCategory, productDescription, productName, productPrice,id} = obj
       product_content.innerHTML += 
       `
         <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src=${imageUrl} alt="Product Image"
                    class="w-full h-56  object-center">
                <div class="p-6">
                    <h3 class="text-xl font-semibold text-gray-800">${productName}</h3>
                    <p class="text-gray-600 mt-2">Rs: ${productPrice}</p>
                    <button class="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">Add to
                        Cart</button>
                </div>
            </div>
       `
   })
   
}
getData()

