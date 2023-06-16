import {
	addDoc,
	collection,
	getDocs,
	query,
	serverTimestamp,
	where,
} from 'firebase/firestore';
import { createExamChat } from './ExamChat';
import { db } from './firebaseApp';

const examTableRef = collection(db, 'Exam');

async function createExam(userData, exam, callbackFunction) {

	const dateTimeString = `${exam.Date}T${exam.Time}:00`;
	
	const timestamp = new Date(dateTimeString).getTime();

	const uniqueExamID = Date.now().toString(36);

	console.log(userData, exam,timestamp);

	addDoc(examTableRef, {
		ExamOrganizer: userData.userName,
		Timestamp: timestamp,
		Duration: exam.Duration,
		ExamName: exam.ExamName,
		GFormLink: exam.GFormLink,
		ExamType: exam.ExamType,
		ExamID: uniqueExamID.toString(),
		CreationTime: serverTimestamp(),
		ImageURL: exam.ImageURL,
		UserID: `User/${userData.id}`
	})
		.then(function (docRef) {
			console.log('Document written with ID: ', docRef.id);
			createExamChat(uniqueExamID)
				.then((chatDocRef) => {
					callbackFunction(true, `${uniqueExamID}`);
				})
				.catch((err) => {
					console.log(err.message);
					const msg = err.message == 'Encountered and error';
					callbackFunction(false, msg);
				});
		})
		.catch((err) => {
			console.log(err.message);
			const msg = err.message == 'Encountered and error';
			callbackFunction(false, msg);
		});
}

async function getExamBy(inputs) {
	const getExamByInputQuery = query(
		examTableRef,
		where(inputs.field, '==', inputs.value)
	);
	let exams = [];
	getDocs(getExamByInputQuery)
		.then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				exams.push({ ...doc.data(), id: doc.id });
			});
			return exams;
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}

async function getExamByID(input, callbackFunction) {
	const getExamByExamIDQuery = query(
		examTableRef,
		where('ExamID', '==', input)
	);
	let exams = [];
	getDocs(getExamByExamIDQuery)
		.then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				exams.push({ ...doc.data(), ExamRefid: doc.id });
			});
			if (exams.length > 0) {
				// there should be only one exam
				console.log('Here');
				callbackFunction(true, exams[0]);
			} else {
				callbackFunction(false, 'Exam do not exixts');
			}
		})
		.catch((err) => {
			console.log(err);
			return false;
		});
}

export { createExam, getExamBy, getExamByID };

