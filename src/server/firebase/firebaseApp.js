// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
	apiKey: 'AIzaSyDY-BmsI9lMmArgJGPNR6XOn0Rc5MqEuh8',

	authDomain: 'examit-0.firebaseapp.com',

	projectId: 'examit-0',

	storageBucket: 'examit-0.appspot.com',

	messagingSenderId: '10734602795',

	appId: '1:10734602795:web:1636190629ae3ad1b1786e',
};

// Initialize Firebase


const firebaseApp = initializeApp(firebaseConfig)

const db =getFirestore()
const auth = getAuth();
const storage = getStorage();

export { auth, db, storage };


export const initFirebase = () => {
	return db;
};


