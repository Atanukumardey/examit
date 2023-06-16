import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';

import { db } from './firebaseApp';

const examStatusTableRef = collection(db, 'ExamStatus');
let examStatusSnapshotOff = null;

async function createExamStatus(examStatus) {
	return await addDoc(examStatusTableRef, { ...examStatus })
		.then(function (docRef) {
			// console.log('Document written with ID: ', docRef.id);
			return docRef;
		})
		.catch((err) => {
			console.log(err.message);
			return false;
		});
}

async function getExamStatusByExamIDuserName(ExamID, userName) {
	let getExamStatusByInputQuery = query(
		examStatusTableRef,
		where('ExamID', '==', ExamID),
		where('userName', '==', userName)
	);
	let examsStatus = [];
	return await getDocs(getExamStatusByInputQuery)
		.then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				examsStatus.push({ ...doc.data(), id: doc.id });
			});
			return examsStatus;
		})
		.catch((err) => {
			console.log(err.message);
			return false;
		});
}

async function getExamStatusBy(inputs) {
	let getExamStatusByInputQuery = query(
		examStatusTableRef,
		where(inputs.field, '==', inputs.value)
	);
	let examsStatus = [];
	return await getDocs(getExamStatusByInputQuery)
		.then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				examsStatus.push({ ...doc.data(), id: doc.id });
			});
			return examsStatus;
		})
		.catch((err) => {
			console.log(err.message);
			return false;
		});
}

async function updateExamStatus(docID, ExamStatus) {
	let docRef = doc(examStatusTableRef, docID);
	console.log(docID)
	console.log(ExamStatus);
	updateDoc(docRef, { ...ExamStatus });
		// .then((response) => {
		// 	console.log(response);
		// })
		// .catch((err) => {
		// 	console.log(err.message);
		// });
}

function ListenToExamStatus(listening, ExamID) {
	if (examStatusSnapshotOff != null) {
		examStatusSnapshotOff();
	}
	if (listening) {
		const query = query(examStatusTableRef, where('ExamID', '==', ExamID));
		examStatusSnapshotOff = onSnapshot(query, (snapshot) => {
			newStatusCallback(snapshot.docs);
		});
	} else {
		examStatusSnapshotOff();
	}
}

const deleteExamStatusDocuments = async () => {
	try {
		let getExamStatusByInputQuery = query(
			examStatusTableRef,
			where('ExamID', '==', 'lirfquhz'),
			where('userName', '!=', 'atanu123')
		);
		let examsStatus = [];
		const querySnapshot = await getDocs(getExamStatusByInputQuery);
		// const batch = db.batch();

		querySnapshot.forEach((docs) => {
			deleteDoc(doc(examStatusTableRef, docs.ref));
			console.log(docs.ref);
		});

		// await batch.commit();
		console.log('Documents deleted successfully.');
	} catch (error) {
		console.error('Error deleting documents:', error);
	}
};

export {
	ListenToExamStatus,
	createExamStatus,
	deleteExamStatusDocuments,
	getExamStatusBy,
	getExamStatusByExamIDuserName,
	updateExamStatus
};

