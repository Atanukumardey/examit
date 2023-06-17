'use client';

import { Pagination } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

import { db } from '@/server/firebase/firebaseApp';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Examineelayout from '../Examineeayout';
import CommentComponent from './CommentSection';
import ExamCardComponent from './ExamCardComponent';

function AllExamPageBody(props) {
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(10);
	const [allPubExData, setAllPubExData] = useState([]);
	const [pubExamDataToShow, setPubExamDataToShow] = useState([]);
	const [commentComponentDocRef, setCommentComponenDocref] = useState('');
	const [toggleCommentView, setToggleCommentView] = useState(false);
	const [initiatePagination, setInitiatePagination] = useState(false);
	const examTableRef = collection(db, 'Exam');
	const publicExamQuery = query(
		examTableRef,
		where('ExamType', '==', 'Public'),
		orderBy('Timestamp', 'desc')
	);

	function handleChange(event, value) {
		setPage(value);
		console.log('FromPagination: ', value);
		let currentIndex = value * 3;
		let numberOfItemToShow = 3;
		let totalItems = allPubExData.length;
		if (currentIndex > totalItems) {
			currentIndex = totalItems;
		}
		let tempExamData = [];
		let index = currentIndex - 3;
		index = index < 0 ? 0 : index;
		// console.log('total: ', totalItems);
		// console.log('index: ', index);
		// console.log('currentIndex: ', currentIndex);
		for (index = index; index < currentIndex; index++) {
			tempExamData.push(allPubExData[index]);
		}
		// console.log(allPubExData);
		console.log(pubExamDataToShow);
		setPubExamDataToShow(tempExamData);
	}

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	function listenPublicExams() {
		onSnapshot(publicExamQuery, (snapshot) => {
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
		listenPublicExams();
	}, []);

	useEffect(() => {
		// while(!allPubExData.length>0);
		handleChange(0, 1);
	}, [initiatePagination]);

	useEffect(() => {
		console.log('Comment Component: ', commentComponentDocRef);
		setToggleCommentView(!toggleCommentView);
	}, [commentComponentDocRef]);

	return (
		<div className='items-center flex flex-col w-full'>
			<div className='container mt-2 py-2 flex flex-row justify-evenly'>
				<h1>Public Exams</h1>
			</div>
			<div className='space-x-2 container mt-2 py-2 flex flex-row justify-evenly'>
				{pubExamDataToShow.map((item) => (
					<ExamCardComponent
						examData={item}
						setCommentComponenDocref={setCommentComponenDocref}
					/>
				))}
			</div>
			<Pagination
				className='mt-3 mb-3'
				count={totalPage}
				page={page}
				onChange={handleChange}
			/>
			<div className='w-full'>
				{toggleCommentView && (
					<CommentComponent docRef={commentComponentDocRef} />
				)}
				{!toggleCommentView && (
					<CommentComponent docRef={commentComponentDocRef} />
				)}
			</div>
		</div>
	);
}

export default function AllExamPage() {
	return (
		<Examineelayout
			children={<AllExamPageBody />}
			LayoutNeedHeader={true}
		/>
	);
}
