import {
    addDoc,
    collection,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    where,
} from 'firebase/firestore';
import { db } from './firebaseApp';

const examChatTableRef = collection(db, 'ExamChat');

let examChatSnapshotOff = null;

function getExamChatMessages(listening, docID, newMessageCallback) {
	if (examChatSnapshotOff != null) {
		examChatSnapshotOff();
	}
	if (listening) {
		const examChatTableMessageRef = collection(
			examChatTableRef,
			docID,
			'Messages'
		);
		const q = query(examChatTableMessageRef, orderBy('Timestamp'));
		examChatSnapshotOff = onSnapshot(q, (snapshot) => {
			newMessageCallback(snapshot.docs);
		});
	} else {
		examChatSnapshotOff();
	}
}

async function addMessagesToExamChat(docRef, input) {
	const docRefToChat = collection(examChatTableRef, docRef, 'Messages');
	return addDoc(docRefToChat, {
		userName: input.userName,
		Text: input.text,
		ImageURL: input.ImageURL,
		Timestamp: serverTimestamp(),
		UserProfileImageURL: input.UserProfileImageURL,
	})
		.then((chatDocref) => {
			return chatDocref.id;
		})
		.catch((err) => {
			console.log(err.message);
			return false;
		});
}

async function createExamChat(examID) {
	return await addDoc(examChatTableRef, {
		ExamID: examID,
	})
		.then(function (docRef) {
			console.log('Document written with ID: ', docRef.id);
			// callbackFunction(true, `${uniqueExamID}`);
			return docRef.id;
		})
		.catch((err) => {
			console.log(err.message);
		});
}

async function getExamChatBy(inputs) {
	let getExamChatByInputQuery = query(
		examChatTableRef,
		where(inputs.field, '==', inputs.value)
	);
	console.log(inputs);
	let examChats = [];
	return await getDocs(getExamChatByInputQuery)
		.then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				examChats.push({ ...doc.data(), id: doc.id });
			});
			return examChats;
		})
		.catch((err) => {
			console.log(err.message);
			return examChats;
		});
}

export {
    addMessagesToExamChat,
    createExamChat,
    getExamChatBy,
    getExamChatMessages
};

