import {
	confirmPasswordReset,
	createUserWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { getDocs, query, where } from 'firebase/firestore';
import { createUser, getUserBy, userTableRef } from './UserTable';

// const ExamTableRef = collection(db, 'Exam');

// const ExamChatTableRef = collection(db, 'ExamChat');

// const ExamOrganizerTableRef = collection(db, 'ExamOrganizer');

// const ExamStatusTableRef = collection(db, 'ExamStatus');

const auth = getAuth();
let authUserInfo = auth.currentUser;
//console.log(authUserInfo);

function getFirebaseErrorMessage(string) {
	string = string.replace('Firebase: Error (auth/', '');
	string = string.replace(').', '');
	string = string.replaceAll('-', ' ');
	return string;
}

async function checkUniqueUser(inputs) {
	let getUserByUserNameQuery = query(
		userTableRef,
		where(inputs.field, '==', inputs.value)
	);
	let users = [];
	getDocs(getUserByUserNameQuery)
		.then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				users.push({ ...doc.data(), id: doc.id });
			});
			console.log(users);
			inputs.callback(users);
		})
		.catch((err) => {
			console.log(err.message);
			// return false;
		});
}

async function signUp(data, callbackFunction) {
	createUserWithEmailAndPassword(auth, data.email, data.password)
		.then((response) => {
			console.log('user created:', response.user);
			authUserInfo = auth.currentUser;
			//console.log('Current User: ' + auth.currentUser);
			sendEmailVerification(authUserInfo)
				.then((response) => {
					//console.log('Email Send: ' + response);
				})
				.catch((err) => {
					let msg = getFirebaseErrorMessage(err.message);
					console.log(msg);
					callbackFunction(false, msg);
					return;
				});
			auth.signOut();
		})
		.catch((err) => {
			let msg = getFirebaseErrorMessage(err.message);
			console.log(err.msg);
			msg =
				msg == 'email already in use'
					? 'Email already exists'
					: 'Encountered and error';
			callbackFunction(false, msg);
			return;
		});

	await createUser(data, callbackFunction);
}

async function signIn(data, callbackFunction) {
	// let moveNext = false;
	signInWithEmailAndPassword(auth, data.email, data.password)
		.then((response) => {
			// console.log('user logged in:', response.user);
			// //   loginForm.reset()
			// console.log(auth.currentUser.email);
			// console.log(auth.currentUser.emailVerified);
			if (auth?.currentUser.emailVerified == false) {
				callbackFunction(false, 'Email Not Verified');
				auth.signOut();
				return;
			}

			getUserBy({
				field: 'Email',
				value: data.email,
			})
				.then((res) => {
					// console.log(res);
					sessionStorage.setItem('UserData', JSON.stringify(res));
					// console.log(sessionStorage.getItem('UserData'));
					callbackFunction(true, 'Done');
				})
				.catch((err) => {
					console.log(err);
					callbackFunction(false, 'Encountered some error');
				});
		})
		.catch((err) => {
			let msg = getFirebaseErrorMessage(err.message);
			// console.log(err.message)
			// console.log(msg);
			callbackFunction(false, msg);
			return;
		});
}

async function userSignOut() {
	await auth?.signOut();
}

async function sendRecoveryPasswordLink(email, callbackFunction) {
	sendPasswordResetEmail(auth, email)
		.then((response) => {
			callbackFunction(true, 'Done');
		})
		.catch((err) => {
			let msg = getFirebaseErrorMessage(err.message);
			// console.log(err.message)
			// console.log(msg);
			callbackFunction(false, msg);
			return;
		});
}

async function changePassword(code, newPassword, callbackFunction) {
	confirmPasswordReset(auth, code, newPassword)
		.then((response) => {
			callbackFunction(true, 'Done');
		})
		.catch((err) => {
			let msg = getFirebaseErrorMessage(err.message);
			// console.log(err.message)
			// console.log(msg);
			callbackFunction(false, msg);
			return;
		});
}

export {
	checkUniqueUser,
	signUp,
	signIn,
	userSignOut,
	sendRecoveryPasswordLink,
	changePassword,
};

