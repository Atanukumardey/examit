'use client';

import { Rating } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

import { db } from '@/server/firebase/firebaseApp';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
	addDoc,
	collection,
	doc,
	getDocs,
	onSnapshot,
	query,
	serverTimestamp,
	where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

let globalCommentListen = null;

function secondsToDateTime(seconds) {
	const date = new Date(seconds * 1000); // Convert seconds to milliseconds

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const amOrPm = hours >= 12 ? 'pm' : 'am';
	const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
	const formattedMinutes = minutes.toString().padStart(2, '0');

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const month = monthNames[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();

	const timeString = `${formattedHours}:${formattedMinutes} ${amOrPm}`;
	const dateString = `${month} ${day}, ${year}`;

	return { time: timeString, date: dateString };
}

function CommentTextComponent(props) {
	let dateTime;
	try {
		dateTime = secondsToDateTime(props.Comment.Timestamp.seconds);
	} catch (err) {
		dateTime = {
			time: 'Loading...',
			date: 'Loading...',
		};
	}
	return (
		<div className='card-body border-1 m-2 shadow-md border-violet-500 rounded-4'>
			<div className='flex flex-row align-items-center'>
				<div>
					<h6 className='fw-bold text-sky-600 mb-1'>
						{props.Comment.userName}
					</h6>
					<p className='text-muted small mb-0'>
						{/* {props.Comment.Timestamp} */}
						{dateTime.time}
					</p>
					<p className='text-muted small mb-0'>
						{/* {props.Comment.Timestamp} */}
						{dateTime.date}
					</p>
				</div>
			</div>
			<p className='mt-3 mb-4 pb-2'>{props.Comment.Value}</p>
		</div>
	);
}

export default function CommentComponent(props) {
	if (props.docRef == null || props.docRef == '') {
		return <div className='min-h-[600px]'>  </div>;
	}
	const UserData = JSON.parse(sessionStorage.getItem('UserData'));
	const ExamDocRef = props.docRef;
	const examTableRef = collection(db, 'Exam');
	const commentBoxRef = collection(examTableRef, props.docRef, 'Comment');
	const ratingRef = collection(examTableRef, props.docRef, 'Rating');
	const [comments, setComments] = useState([]);
	let getThisUserRatingQuery = query(
		ratingRef,
		where('userName', '==', UserData.userName)
	);
	const [currentComment, setCurrentComment] = useState('');
	const [currentRating, setCurrentRating] = useState(0);

	function addComment() {
		if (currentComment.length < 2) {
			swal('Add some more Text');
			return;
		}
		addDoc(commentBoxRef, {
			userName: UserData.userName,
			Value: currentComment,
			Timestamp: serverTimestamp(),
		});
		setCurrentComment('');
		getDocs(getThisUserRatingQuery).then((snapshot) => {
			if (snapshot.docs.length > 0) {
				let docRef = doc(ratingRef, snapshot.doc[0].id);
				updateDoc(docRef, {
					userName: UserData.userName,
					Value: currentRating,
				});
			} else {
				addDoc(ratingRef, {
					userName: UserData.userName,
					Value: currentRating,
				});
			}
		});
	}

	function ListenToComment() {
		onSnapshot(commentBoxRef, (snapshot) => {
			let commentIncoming = [];
			snapshot.docs.forEach((doc) => {
				commentIncoming.push({ ...doc.data() });
			});
			setComments(commentIncoming);
		});
	}

	useEffect(() => {
		ListenToComment();
	}, []);

	return (
		<div className='container my-5 py-5'>
			<div className='row d-flex justify-content-center'>
				<div className='col-md-12 col-lg-10 col-xl-8 shadow-lg bg-gray-300 rounded-lg'>
					<div className='card max-h-screen overflow-scroll mt-1 shadow-lg'>
						{comments.map((eachComment) => (
							<CommentTextComponent Comment={eachComment} />
						))}
					</div>
					<div className='card shadow-lg rounded-xl mt-3 mb-3'>
						<div
							className='card-footer py-3 border-0'
							style={{ backgroundColor: '#f8f9fa' }}
						>
							<div className='d-flex flex-start w-100 rounded-lg'>
								<div
									// className='form-label'
									htmlFor='textAreaExample'
								>
									Rating
								</div>
								<div className='form-outline w-100'>
									{
										<Rating
											name='Rating'
											value={currentRating}
											onChange={(event, newValue) => {
												setCurrentRating(newValue);
											}}
										/>
									}
								</div>
							</div>
							<div className='d-flex flex-start w-100'>
								<div className='form-outline w-100'>
									<label
										className='form-label'
										htmlFor='textAreaExample'
									>
										Comment
									</label>
									
									<textarea
										className='form-control'
										id='textAreaExample'
										name='CommentInputBox'
										rows={4}
										style={{ background: '#fff' }}
										value={currentComment}
										onChange={(e) =>
											setCurrentComment(e.target.value)
										}
									/>
								</div>
							</div>
							<div className='float-end mt-2 pt-1'>
								<button
									type='button'
									className='btn btn-primary btn-sm me-2'
									onClick={() => {
										addComment();
									}}
								>
									Post comment
								</button>
								<button
									type='button'
									className='btn btn-outline-primary btn-sm'
									onClick={() => {
										setCurrentComment('');
										setCurrentRating(0);
									}}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
