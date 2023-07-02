'use client';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { CardActionArea, CardMedia } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import exampleImage from '/public/ImageAsset/ExamItLogo.png';

import { createExamChat, getExamChatBy } from '@/server/firebase/ExamChat';
import { db } from '@/server/firebase/firebaseApp';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

export default function ExaminerExamCardComponent(props) {
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
	const router = useRouter();

	const [examRunningState, setExamRunningState] = useState('loading...');

	function GoToLiveExamTRackPage(state, message) {
		let userData = JSON.parse(sessionStorage.getItem('UserData'));
		sessionStorage.setItem('UserCurrentExamData', JSON.stringify(message));

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
				router.push('/Examiner/LiveExamTrack');
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
					router.push('/Examiner/LiveExamTrack');
				});
			}
		});
		// setsessionstorage
	}

	function handleTrackExamClick() {
		GoToLiveExamTRackPage(true, props.examData);
	}

	useEffect(() => {
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

	return (
		<Card
			sx={{ maxWidth: 400 }}
			className='shadow-lg bg-gray-300 rounded-md'
		>
			<CardHeader
				avatar={
					<Avatar aria-label='recipe'>
						<img src={exampleImage.src} alt='image' />
					</Avatar>
				}
				title={'Organizer: ' + props.examData.ExamOrganizer}
				subheader={'Exam Date: ' + dateTime.date}
			/>

{props.examData.ImageURL != null ? (
				props.examData.ImageURL != '' ? (
					<CardMedia
						component='img'
						height='200'
						image={props.examData.ImageURL}
						alt='image'
						sx={{ maxHeight: 200 }}
					/>
				) : (
					<CardMedia
						component='img'
						height='200'
						image={exampleImage.src}
						alt='image'
						sx={{ maxHeight: 200 }}
					/>
				)
			) : (
				<CardMedia
					component='img'
					height='200'
					image={exampleImage.src}
					alt='image'
					sx={{ maxHeight: 200 }}
				/>
			)}
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
				<Typography gutterBottom variant='h7' component='div'>
					Exam Code: {props.examData.ExamID}
				</Typography>
			</CardContent>
			<CardActionArea
				className='text-center p-3 bg-slate-500 text-cyan-50 font-bold'
				color='success'
				onClick={() => {
					handleTrackExamClick();
				}}
			>
				Track The Exam
			</CardActionArea>
		</Card>
	);
}
