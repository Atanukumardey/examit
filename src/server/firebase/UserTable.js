import axios from 'axios';
import {
	addDoc,
	collection
} from 'firebase/firestore';
import { db } from './firebaseApp';

const userTableRef = collection(db, 'User');

async function createUser(user, callbackFunction) {
	addDoc(userTableRef, {
		Email: user.email,
		Password: user.password,
		Name: user.name,
		userName: user.username,
		Number: user.phoneNumber,
		ImageURL: user.imageURL,
	})
		.then(function (response) {
			// console.log('Document written with ID: ', docRef.id);
			callbackFunction(true, 'Done');
		})
		.catch((err) => {
			console.log(err.message);
			const msg = err.message == 'Encountered and error';
			callbackFunction(false, msg);
		});
}

async function getUserBy(inputs) {
	// let getUserByInputQuery = query(
	// 	userTableRef,
	// 	where(inputs.field, '==', inputs.value)
	// );
	// let users = [];
	// return await getDocs(getUserByInputQuery)
	// 	.then((snapshot) => {
	// 		snapshot.docs.forEach((doc) => {
	// 			users.push({ ...doc.data(), UserRefid: doc.id });
	// 		});
	// 		// console.log(users);
	// 		return users;
	// 	})
	// 	.catch((err) => {
	// 		console.log(err.message);
	// 		throw err.message;
	// 		return false;
	// 	});
	try {
		const response = await axios.get(
			`/api/UserApi?field=${inputs.field}&value=${inputs.value}`
		);
		const userData = response.data;
		return userData;
	} catch (error) {
		console.log(err.message);
		return false;
	}
}

async function updateUser(docID, data, callbackFunction) {
	// let docRef = doc(userTableRef,docID);
	// updateDoc(docRef,{
	// 	Email: data.email,
	// 	Password: data.password,
	// 	Name: data.name,
	// 	userName: data.username,
	// 	Number: data.phoneNumber,
	// 	ImageURL: data.imageURL
	// }).then((response)=>{
	// 	console.log(response);
	// 	callbackFunction(true, "Done");
	// }).catch((err)=>{
	// 	console.log(err.message);
	// 	callbackFunction(false, "Encontered Some Problem");
	// })
	try {
		const response = await axios.post('/api/UserApi', {
			docID,
			data,
		});
		if (response.data.message == 'Done') {
			callbackFunction(true, 'Done');
		} else {
			callbackFunction(false, 'Encontered Some Problem');
		}
	} catch (error) {
		console.log(error);
		callbackFunction(false, 'Encontered Some Problem');
	}
}

export { createUser, getUserBy, updateUser, userTableRef };

