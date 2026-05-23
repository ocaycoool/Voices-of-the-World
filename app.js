// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBecjJG1V7PqQEq64lLkfuLaA4shzXWRyY",
    authDomain: "voices-of-the-world.firebaseapp.com",
    projectId: "voices-of-the-world",
    storageBucket: "voices-of-the-world.firebasestorage.app",
    messagingSenderId: "254197832426",
    appId: "1:254197832426:web:02f4f1a06b20ee9e51d593",
    measurementId: "G-14GY7VEB8S"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

async function getStories(db) {
  const storiesCol = collection(db, 'stories');
  const storiesSnapshot = await getDocs(storiesCol);
  const storiesList = storiesSnapshot.docs.map(doc => doc.data());
  return storiesList;
}

const stories=await getStories(db);
console.log({stories})