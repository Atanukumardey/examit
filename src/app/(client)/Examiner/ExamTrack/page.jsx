// 'use client';

'use client';

import { Pagination } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

import { db } from '@/server/firebase/firebaseApp';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import ExaminerExamCardComponent from './ExamCard';

function ExamsComponent(props) {
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(10);

	const [allPubExData, setAllPubExData] = useState([]);
	const [pubExamDataToShow, setPubExamDataToShow] = useState([]);

	const [initiatePagination, setInitiatePagination] = useState(false);
	const [snapShotFunctioOff, setSnapShotFunctionOff] = useState();

	const examTableRef = collection(db, 'Exam');
	const ExamQuery = query(
		examTableRef,
		where('ExamType', '==', props.ExamType),
		where('ExamOrganizer', '==', props.userName),
		orderBy('Timestamp', 'desc')
	);

	function handleChange(event, value) {
		setPage(value);
		//console.log('FromPagination: ', value);
		let currentIndex = value * 3;
		let numberOfItemToShow = 3;
		let totalItems = allPubExData.length;
		if (currentIndex > totalItems) {
			currentIndex = totalItems;
		}
		let tempExamData = [];
		let index = currentIndex - 3;
		index = index < 0 ? 0 : index;
		// //console.log('total: ', totalItems);
		// //console.log('index: ', index);
		// //console.log('currentIndex: ', currentIndex);
		for (index = index; index < currentIndex; index++) {
			tempExamData.push(allPubExData[index]);
		}
		// //console.log(allPubExData);
		//console.log(pubExamDataToShow);
		setPubExamDataToShow(tempExamData);
	}

	function getExamsData() {
		getDocs(ExamQuery).then((snapshot) => {
			let exams = [];
			snapshot.docs.forEach((doc) => {
				exams.push({ ...doc.data(), id: doc.id });
			});
			setTotalPage(Math.ceil(exams.length / 3));
			setAllPubExData(exams);
			if (!initiatePagination && exams.length > 0) {
				setInitiatePagination(true);
			}
		});
	}

	useEffect(() => {
		getExamsData();
	}, []);

	useEffect(() => {
		// while(!allPubExData.length>0);
		handleChange(0, 1);
	}, [initiatePagination]);

	return (
		<div className='items-center flex flex-col w-full'>
			<div className='container mt-2 py-2 flex flex-row justify-evenly'>
				<h1>{props.ExamType} Exams</h1>
			</div>
			<div className='space-x-2 container mt-2 py-2 flex flex-row justify-evenly'>
				{pubExamDataToShow.map((item) => (
					<ExaminerExamCardComponent examData={item} />
				))}
			</div>
			<Pagination count={totalPage} page={page} onChange={handleChange} />
		</div>
	);
}

export default function ExamTrackPage() {
	const UserData = JSON.parse(sessionStorage.getItem('UserData'));
	return (
		<div className='items-center flex flex-col min-h-[600px]'>
			<ExamsComponent ExamType={'Private'} userName={UserData.userName} />
			<ExamsComponent ExamType={'Public'} userName={UserData.userName} />
		</div>
	);
}
