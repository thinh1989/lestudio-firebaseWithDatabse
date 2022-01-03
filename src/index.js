//bundle : npm run build
import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc
} from 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNtRDXSLTxkeNHQuQ8uHGf6q0wVi72gMQ",
    authDomain: "lestudiodatabase.firebaseapp.com",
    projectId: "lestudiodatabase",
    storageBucket: "lestudiodatabase.appspot.com",
    messagingSenderId: "289513496945",
    appId: "1:289513496945:web:6d5b7983b9c1d8da3d56d0",
    measurementId: "G-Q6V0CK9LE8"
};

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

//collection ref
const colRef = collection(db, 'Nails')

//get collection date
onSnapshot(colRef,(snapshot) => {
    snapshot.docs.forEach((doc) => {
        renderNail(doc);
    })
    /*
        let nails =[]
        snapshot.docs.forEach((doc) => {
            nails.push({ ...doc.data(), id: doc.id })
        })
        console.log(nails)

     */
    })

//adding documents
const addNailForm = document.querySelector('.add')
addNailForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        name: addNailForm.name.value,
        info: addNailForm.info.value,
        price: addNailForm.price.value,
    })
        .then(() => {
            addNailForm.reset()
        })
})

//deleting documents
/*
const deleteNailForm = document.querySelector('.delete')
deleteNailForm.addEventListener('submit', (e) => {
    e.preventDefault()
})
 */

//create element and render services
const nailList = document.querySelector('#nail-list');
function renderNail(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let info = document.createElement('span');
    let price = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    info.textContent = doc.data().info;
    price.textContent = doc.data().price;

    li.appendChild(name);
    li.appendChild(info);
    li.appendChild(price);

    nailList.appendChild(li);
}