import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebaseApp';

const userTableRef = collection(db, 'User');

async function createUser(user, callbackFunction) {
	addDoc(userTableRef, {
		Email: user.email,
		Password: user.password,
		ImageURL: user.imageURL,
		Name: user.name,
		userName: user.username,
		Number: user.phoneNumber,
	})
		.then(function (docRef) {
			console.log('Document written with ID: ', docRef.id);
			callbackFunction(true, 'Done');
		})
		.catch((err) => {
			console.log(err.message);
			const msg = err.message == 'Encountered and error';
			callbackFunction(false, msg);
		});
}

async function getUserBy(inputs) {
	let getUserByInputQuery = query(
		userTableRef,
		where(inputs.field, '==', inputs.value)
	);
	let users = [];
	return await getDocs(getUserByInputQuery)
		.then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				users.push({ ...doc.data(), UserRefid: doc.id });
			});
			// console.log(users);
			return users;
		})
		.catch((err) => {
			console.log(err.message);
			throw err.message;
			return false;
		});
}

export { userTableRef, createUser, getUserBy };

