'use client';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Comment, ThumbUp } from '@mui/icons-material';
import { CardActionArea, CardMedia, Rating } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import exampleImage from '/public/ImageAsset/ExamItLogo.png';

import { createExamChat, getExamChatBy } from '@/server/firebase/ExamChat';
import {
	createExamStatus,
	getExamStatusByExamIDuserName,
} from '@/server/firebase/ExamStatus';
import { db } from '@/server/firebase/firebaseApp';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
} from 'firebase/firestore';
import { MDBSpinner } from 'mdb-react-ui-kit';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

let ExamineeExamStatus = {
	ExamID: '',
	userName: '',
	Name: '',
	ExitFullScreen: 0,
	TabChange: 0,
	NoOfTimeLookedOut: 0,
	LeftPlace: 0,
	OtherPerson: 0,
	CellPhoneDetected: 0,
	LaptopDetected: 0,
	BookDetected: 0,
	Latitude: 0.0,
	Longitude: 0.0,
	FinishedExam: false,
	Rating: 0,
	Like: false,
	ImageURL: '',
};

function secondsToDateTime(seconds) {
	const date = new Date(seconds); // Convert seconds to milliseconds

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

export default function ExamCardComponent(props) {
	if (props.examData.id == null || props.examData.id == '') {
		return <div> None </div>;
	}

	let dateTime;
	try {
		dateTime = secondsToDateTime(props.examData.Timestamp);
	} catch (err) {
		dateTime = {
			time: 'Loading...',
			date: 'Loading...',
		};
	}

	const UserData = JSON.parse(sessionStorage.getItem('UserData'));
	const ExamDocRef = props.examData.id;
	const examTableRef = collection(db, 'Exam');
	const commentBoxRef = collection(
		examTableRef,
		props.examData.id,
		'Comment'
	);

	const RatingRef = collection(examTableRef, props.examData.id, 'Rating');
	const LikeRef = collection(examTableRef, props.examData.id, 'Like');
	const router = useRouter();

	const [examRunningState, setExamRunningState] = useState('loading...');

	const [likes, setLikes] = useState(0);
	const [comments, setComments] = useState(0);
	const [rating, setRating] = useState(0);
	const [userLike, setUserLike] = useState('');
	const [userLikeRef, setUserLikeRef] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	function countComments() {
		return onSnapshot(commentBoxRef, (snapshot) => {
			setComments(snapshot.docs.length);
		});
	}

	function countLikes() {
		return onSnapshot(LikeRef, (snapshot) => {
			setUserLike('');
			snapshot.docs.forEach((doc) => {
				if (doc.data().userName == UserData.userName) {
					setUserLike('primary');
					// userLikeRef = doc.id;
					setUserLikeRef(doc.id);
				}
			});
			setLikes(snapshot.docs.length);
		});
	}

	function getRating() {
		return onSnapshot(RatingRef, (snapshot) => {
			let ratingValue = 0;
			snapshot.docs.forEach((doc) => {
				ratingValue += doc.data().Value;
			});
			ratingValue = ratingValue / snapshot.docs.length;
			setRating(ratingValue);
		});
	}

	function handleCommentBoxClick() {
		props.setCommentComponenDocref(props.examData.id);
	}

	function handleLikeButtonClick() {
		if (userLike != 'primary') {
			addDoc(LikeRef, {
				userName: UserData.userName,
			});
		} else {
			deleteDoc(doc(LikeRef, userLikeRef));
			setUserLike('');
		}
	}

	useEffect(() => {
		countComments();
		countLikes();
		getRating();

		let currentTime = Date.now();
		let validExamTime = props.examData.Timestamp;
		let runningTime = validExamTime + props.examData.Duration * 60 * 1000;
		if (validExamTime > currentTime) {
			setExamRunningState('Upcoming');
			//return;
		} else if (runningTime <= currentTime) {
			setExamRunningState('Time Over');
			return;
		} else {
			setExamRunningState('Ongoing');
		}
	});

	function GetExamCallback(state, message) {
		if (state === true) {
			let userData = JSON.parse(sessionStorage.getItem('UserData'));

			// if (message.ExamOrganizer == userData.userName) {
			// 	swal({
			// 		title: `An Examiner can't attend an exam`,
			// 		icon: 'error',
			// 		button: 'Ok',
			// 	});
			// 	setIsLoading(false);
			// 	return;
			// }

			console.log(message);

			sessionStorage.setItem(
				'UserCurrentExamData',
				JSON.stringify(message)
			);

			let input = {
				field: 'ExamID',
				value: message.ExamID,
			};
			getExamChatBy(input).then((examChats) => {
				if (examChats.length > 0) {
					sessionStorage.setItem(
						'ExamChatInfo',
						JSON.stringify(examChats[0])
					);
					getExamStatusByExamIDuserName(
						message.ExamID,
						userData.userName
					).then((examStatus) => {
						if (examStatus.length < 1) {
							ExamineeExamStatus.userName = userData.userName;
							ExamineeExamStatus.ExamID = message.ExamID;
							ExamineeExamStatus.Name = userData.Name;
							createExamStatus(ExamineeExamStatus).then(
								(docref) => {
									sessionStorage.setItem(
										'CurrentExamStatusDocRef',
										docref
									);
									sessionStorage.setItem(
										'ExamineeExamStatus',
										JSON.stringify(ExamineeExamStatus)
									);
									router.push('/Examinee/CameraCheck');
								}
							);
						} else {
							sessionStorage.setItem(
								'CurrentExamStatusDocRef',
								examStatus[0].id
							);
							Object.keys(ExamineeExamStatus).forEach((key) => {
								if (examStatus[0].hasOwnProperty(key)) {
									ExamineeExamStatus[key] =
										examStatus[0][key];
								}
							});
							sessionStorage.setItem(
								'ExamineeExamStatus',
								JSON.stringify(ExamineeExamStatus)
							);
							router.push('/Examinee/CameraCheck');
						}
					});
				} else {
					createExamChat(message.ExamID).then((examChatID) => {
						let data = {
							ExamID: message.ExamID,
							id: examChatID,
						};
						sessionStorage.setItem(
							'ExamChatInfo',
							JSON.stringify(data)
						);
						getExamStatusByExamIDuserName(
							message.ExamID,
							userData.userName
						).then((examStatus) => {
							if (examStatus.length < 1) {
								ExamineeExamStatus.userName = userData.userName;
								ExamineeExamStatus.ExamID = message.ExamID;
								ExamineeExamStatus.Name = userData.Name;
								createExamStatus(ExamineeExamStatus).then(
									(docref) => {
										sessionStorage.setItem(
											'CurrentExamStatusDocRef',
											docref
										);
										sessionStorage.setItem(
											'ExamineeExamStatus',
											JSON.stringify(ExamineeExamStatus)
										);
										router.push('/Examinee/CameraCheck');
									}
								);
							} else {
								sessionStorage.setItem(
									'CurrentExamStatusDocRef',
									examStatus[0].id
								);
								Object.keys(ExamineeExamStatus).forEach(
									(key) => {
										if (examStatus[0].hasOwnProperty(key)) {
											ExamineeExamStatus[key] =
												examStatus[0][key];
										}
									}
								);
								sessionStorage.setItem(
									'ExamineeExamStatus',
									JSON.stringify(ExamineeExamStatus)
								);
								router.push('/Examinee/CameraCheck');
							}
						});
					});
				}
			});
			// setsessionstorage
		} else {
			swal({
				title: 'Exam Do not exists',
				icon: 'error',
				button: 'Try Again',
			});
			setIsLoading(false);
		}
	}

	function handleExamAttenButtonClick() {
		if (examRunningState == 'Upcoming') {
			return;
		}
		if (examRunningState == 'Time Over') {
			swal({
				title: `Time for this exam is over`,
				icon: 'error',
				button: 'Ok',
			});
			return;
		}
		setIsLoading(true);
		// getExamByID(props.examData.ExamID, GetExamCallback);
		GetExamCallback(true, props.examData);
	}

	return (
		<Card className='shadow-lg bg-gray-300 rounded-md'>
			<CardHeader
				avatar={
					<Avatar aria-label='recipe'>
						<img src={exampleImage.src} alt='image' />
					</Avatar>
				}
				title={'Organizer: ' + props.examData.ExamOrganizer}
				subheader={'Exam Date: ' + dateTime.date}
			/>
			<CardMedia
				component='img'
				height='150'
				image={exampleImage.src}
				alt='image'
			/>
			<CardContent>
				<Typography gutterBottom variant='h5' component='div'>
					{props.examData.ExamName}
				</Typography>
				<Typography gutterBottom variant='h7' component='div'>
					Exam Time: {dateTime.time}
				</Typography>
				<Typography gutterBottom variant='h7' component='div'>
					Exam Status: {examRunningState}
				</Typography>
			</CardContent>
			<CardActions
				disableSpacing
				className='flex flex-row justify-between'
			>
				<div>
					<IconButton
						onClick={() => {
							handleLikeButtonClick();
						}}
						aria-label='Like'
					>
						<ThumbUp color={userLike} />

						<Typography variant='body2' color='text.secondary'>
							{' '}
							{likes}{' '}
						</Typography>
					</IconButton>
					<IconButton
						onClick={() => {
							handleCommentBoxClick();
						}}
						aria-label='Comment'
					>
						<Comment />
						<Typography variant='body2' color='text.secondary'>
							{' '}
							{comments}{' '}
						</Typography>
					</IconButton>
				</div>
				<Rating name='Rating' precision={0.2} value={rating} readOnly />
			</CardActions>

			<CardActionArea
				onClick={() => {
					handleExamAttenButtonClick();
				}}
				color='success'
				// style={{
				// 	textAlign: 'center',
				// 	padding: '0.75rem',
				// 	backgroundColor: 'slate',
				// 	color: 'cyan',
				// 	fontWeight: 'bold',
				// }}
				className=' text-center p-3 bg-slate-500 text-cyan-50 font-bold'
			>
				{isLoading && <MDBSpinner size='sm' role='status' tag='span' />}
				Attend The Exam
			</CardActionArea>
		</Card>
	);
}
