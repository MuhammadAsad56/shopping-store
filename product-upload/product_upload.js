import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";


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
const db = getFirestore()
const storage = getStorage()

let productName = document.getElementById("productName")
let productDescription = document.getElementById("productDescription")
let productPrice = document.getElementById("productPrice")
let productCategory = document.getElementById("productCategory")
let productImage = document.getElementById("productImage")

let upload = () => {
    return new Promise((resolve, reject) => {
        let files = productImage.files[0]
        console.log(files);
        const ranodomNum = Math.random().toString().slice(2)
        const storageRef = ref(storage, `images/${ranodomNum}`);
        const uploadTask = uploadBytesResumable(storageRef, files);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error.message);
                reject(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        );
    })
}

  window.uploadPro = () => {
    let obj = {
        productName: productName.value,
        productDescription: productDescription.value,
        productPrice: productPrice.value,
        productCategory: productCategory.value,
    }
    console.log(obj);
  upload()
  .then(async res=>{
    console.log(res);
    obj.imageUrl = res;
    console.log(obj);
    let reference = collection(db, "products")
    let result = await addDoc(reference, obj)
    window.location.assign("../index.html")
  })
  .catch(err=>{
    console.log(err);
  })
  }
