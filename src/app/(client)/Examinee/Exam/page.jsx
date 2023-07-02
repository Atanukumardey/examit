'use client';

import * as cocossd from '@tensorflow-models/coco-ssd';
import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';
import { MDBCard, MDBCardBody, MDBSpinner } from 'mdb-react-ui-kit';
import { Suspense, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import swal from 'sweetalert';
import Examineelayout from '../Examineeayout';
// import { drawRect } from "./utilities";

import ExpandableComponent from '@/components/Expandable';
import { updateExamStatus } from '@/server/firebase/ExamStatus';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ChatWindow from '../../chatwindow';
import { Timer } from './timer';

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

let CurrentExamExamStatusDocRef = null;
let numberOfOccurance = 0;

function finishExam(router) {
	ExamineeExamStatus.finishedExam = true;

	updateExamStatus(CurrentExamExamStatusDocRef, ExamineeExamStatus);
	numberOfOccurance = 0;

	console.log('Exam Finished');

	// sessionStorage.removeItem('ExamineeExamStatus');
	// sessionStorage.removeItem('ExamineeLatitude');
	// sessionStorage.removeItem('ExamineeLongitude');

	// sessionStorage.removeItem('CurrentExamStatusDocRef');
	// sessionStorage.removeItem('UserCurrentExamData');

	swal('Thanks Fot Attending the Exam', 'success');
	document.removeEventListener(
		'fullscreenchange',
		handleFullScreenChange,
		false
	);
	document.removeEventListener(
		'contextmenu',
		function (e) {
			e.preventDefault();
		},
		false
	);
	document.removeEventListener(
		'visibilitychange',
		handleVisibilityChange,
		false
	);
	router.push('/User/Home');
}

function handleExamineeExamStatusChange(status) {
	sessionStorage.setItem(
		'ExamineeExamStatus',
		JSON.stringify(ExamineeExamStatus)
	);
	if (status) {
		numberOfOccurance = 0;
		updateExamStatus(CurrentExamExamStatusDocRef, ExamineeExamStatus);
		console.log('sending status');
		return;
	}

	numberOfOccurance += 1;

	if (numberOfOccurance > 2) {
		numberOfOccurance = 0;
		updateExamStatus(CurrentExamExamStatusDocRef, ExamineeExamStatus);
		console.log('sending status');
	}
	// updateExamStatus(CurrentExamExamStatusDocRef, ExamineeExamStatus);
	// console.log(ExamineeExamStatus);
}

function handleExitExamWindowClick(router) {
	router.push('/User/Home');
}

function getLocation() {
	var geolocation = navigator.geolocation;
	var options = {
		enableHighAccuracy: true,
		timeout: 50000,
	};

	geolocation.getCurrentPosition(
		function (position) {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			var accuracy = position.coords.accuracy;

			sessionStorage.setItem('ExamineeLatitude', latitude);
			sessionStorage.setItem('ExamineeLongitude', longitude);

			ExamineeExamStatus.Latitude = latitude;
			ExamineeExamStatus.Longitude = longitude;
			handleExamineeExamStatusChange(false);

			// console.log('Latitude: ' + latitude);
			// console.log('Longitude: ' + longitude);
			// console.log('Accuracy: ' + accuracy);
		},
		function (error) {
			console.log(error);
		},
		options
	);
}

async function DetectionWindow() {
	const absoulateFunctionFromTF = tf.Abs;

	const webcamRef = useRef(null);

	const EarsDetect = (keypoints, minConfidence) => {
		//console.log("Checked")
		const keypointEarR = keypoints[3];
		const keypointEarL = keypoints[4];

		if (keypointEarL.score < minConfidence) {
			ExamineeExamStatus.NoOfTimeLookedOut += 1;
			handleExamineeExamStatusChange(false);
			swal(
				'You looked away from the Screen (To the Right)',
				'Action has been Recorded',
				'error'
			);
		}
		if (keypointEarR.score < minConfidence) {
			ExamineeExamStatus.NoOfTimeLookedOut += 1;
			handleExamineeExamStatusChange(false);
			swal(
				'You looked away from the Screen (To the Left)',
				'Action has been Recorded',
				'error'
			);
		}
	};

	const ObjectDetect = (obj) => {
		let numberOfPeople = 0;
		let cellPhone = 0;
		let NoPerson = 0;
		let numberOfBook = 0;
		let numberOfLaptop = 0;
		// console.log(obj);
		if (obj.length == 0) {
			ExamineeExamStatus.LeftPlace += 1;
			handleExamineeExamStatusChange(false);
			swal('Face Not Visible', 'Action has been Recorded', 'error');
			NoPerson += 1;
		}
		obj.forEach((prediction) => {
			// console.log(prediction.class);
			if (prediction.class == 'person') {
				numberOfPeople += 1;
				if (numberOfPeople > 1) {
					ExamineeExamStatus.OtherPerson += 1;
					handleExamineeExamStatusChange(false);
					swal(
						'Multiple Face Detected',
						'Action has been Recorded',
						'error'
					);
				}
			} else if (prediction.class == 'cell phone') {
				cellPhone += 1;
				ExamineeExamStatus.CellPhoneDetected += 1;
				handleExamineeExamStatusChange(false);
				swal(
					'Cell Phone Detected',
					'Action has been Recorded',
					'error'
				);
			} else if (prediction.class == 'laptop') {
				numberOfLaptop += 1;

				ExamineeExamStatus.LaptopDetected += 1;
				handleExamineeExamStatusChange(false);
				swal('object Detected', 'Action has been Recorded', 'error');
			} else if (prediction.class == 'book') {
				numberOfBook += 1;

				ExamineeExamStatus.Bookdetected += 1;
				handleExamineeExamStatusChange(false);
				swal('object Detected', 'Action has been Recorded', 'error');
			} else if (prediction.class != 'person') {
				NoPerson += 1;

				ExamineeExamStatus.LeftPlace += 1;
				handleExamineeExamStatusChange(false);
				swal('Face Not Visible', 'Action has been Recorded', 'error');
			}
		});
		if (
			cellPhone == 0 &&
			numberOfBook == 0 &&
			numberOfLaptop == 0 &&
			NoPerson == 0
		) {
			return numberOfPeople;
		} else {
			return 0;
		}
	};

	// Main function
	const runDetection = async () => {
		//  Loop and detect hands
		const cocoSSD = await cocossd.load();
		const poseNet = await posenet.load({
			architecture: 'MobileNetV1', //'ResNet50',
			quantBytes: 2,
			inputResolution: { width: 480, height: 320 },
			scale: 0.6,
		});
		setInterval(() => {
			detect(cocoSSD, poseNet);
		}, 1000);
	};

	const detect = async (cocoSSD, poseNet) => {
		// Check data is available
		if (
			typeof webcamRef.current !== 'undefined' &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			// Get Video Properties
			const video = webcamRef.current.video;
			const videoWidth = webcamRef.current.video.videoWidth;
			const videoHeight = webcamRef.current.video.videoHeight;

			// Set video width
			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;

			cocoSSD
				?.detect(video)
				.then((obj) => {
					// person cellphone and other detection
					const numberOfPeople = ObjectDetect(obj);

					if (numberOfPeople > 0) {
						poseNet
							?.estimateSinglePose(video)
							.then((pose) => {
								// console.log(pose);
								// left right detection
								EarsDetect(pose['keypoints'], 0.35);
							})
							.catch((err) => {
								console.log(err);
							});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	// useEffect(() => {
	// 	console.log('Hello');
	// }, [changedFormState]);

	useEffect(() => {
		runDetection();
	}, []);

	return (
		<Webcam
			className='shadow-lg p-1 mb-2 bg-transparent border-2 border-primary rounded-4 w-full'
			ref={webcamRef}
			muted={true}
			width={480}
			height={320}
		/>
	);
}

function OptionCard(props) {
	return (
		<MDBCard alignment='center' className='m-2 w-25'>
			<MDBCardBody>{props.item}</MDBCardBody>
		</MDBCard>
	);
}

function QuestionComponent(props) {
	if (props.showquestion) {
		const ExamData = JSON.parse(
			sessionStorage.getItem('UserCurrentExamData')
		);
		const formLink = ExamData.GFormLink;
		// console.log('Show Question');
		return (
			<iframe
				className='shadow-lg min-h-[700px] p-1 mt-1 mb-2 w-full lg:w-1/2 bg-transparent border-2 border-primary rounded-4'
				// hidden={formLink ? false : true}
				src={formLink}
			>
				Loading…
			</iframe>
		);
	} else {
		return (
			<iframe
				className='shadow-lg min-h-[700px] p-1 mt-1 mb-2 w-full lg:w-1/2 bg-transparent border-2 border-primary rounded-4'
				// hidden={formLink ? false : true}
				src={''}
			>
				Loading…
			</iframe>
		);
	}
}

function ExamPageBody() {
	const [formLink, setFormLink] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	if (
		sessionStorage.getItem('ExamineeExamStatus') == null ||
		sessionStorage.getItem('ExamineeLatitude') == null ||
		sessionStorage.getItem('ExamineeLongitude') == null ||
		sessionStorage.getItem('CurrentExamStatusDocRef') == null ||
		sessionStorage.getItem('UserCurrentExamData') == null
	) {
		router.push('/User/Home');
	}

	ExamineeExamStatus = JSON.parse(
		sessionStorage.getItem('ExamineeExamStatus')
	);

	ExamineeExamStatus.Latitude = sessionStorage.getItem('ExamineeLatitude');
	ExamineeExamStatus.Longitude = sessionStorage.getItem('ExamineeLongitude');

	CurrentExamExamStatusDocRef = sessionStorage.getItem(
		'CurrentExamStatusDocRef'
	);

	let UserData = JSON.parse(sessionStorage.getItem('UserData'));
	let UserCurrentExamData = JSON.parse(
		sessionStorage.getItem('UserCurrentExamData')
	);

	// console.log(ExamineeExamStatus, CurrentExamExamStatusDocRef, UserData);

	// const [document, setElem] = useState(null);

	function handleVisibilityChange() {
		if (document.hidden) {
			ExamineeExamStatus.TabChange += 1;
			handleExamineeExamStatusChange(true);
			swal('Changed Tab Detected', 'Action has been Recorded', 'error');
			// the page is hidden
		}
	}

	function handleFullScreenChange() {
		if (!document.fullscreenElement) {
			swal('Exit Full Screen', 'Action has been Recorded', 'error');
			ExamineeExamStatus.ExitFullScreen += 1;
			handleExamineeExamStatusChange(true);
			router.push('/Examinee/Warning');
		}
	}

	// if (!document?.fullscreenElement) {
	// 	// ExamineeExamStatus.ExitFullScreen += 1;
	// 	// handleExamineeExamStatusChange(true);
	// 	// router.push('/Examinee/Warning');
	// 	console.log('Here 1');
	// }

	if (document != null) {
		if (
			document.fullscreenElement /* Standard syntax */ ||
			document.webkitFullscreenElement /* Safari and Opera syntax */ ||
			document.msFullscreenElement /* IE11 syntax */
		) {
			console.log('Full Screen');
		} else {
			// console.log('Here 1');
			ExamineeExamStatus.ExitFullScreen += 1;
			handleExamineeExamStatusChange(true);
			router.push('/Examinee/Warning');
		}
	}

	useEffect(() => {
		document.addEventListener(
			'fullscreenchange',
			handleFullScreenChange,
			false
		);
		document.addEventListener(
			'contextmenu',
			function (e) {
				e.preventDefault();
			},
			false
		);
		document.addEventListener(
			'visibilitychange',
			handleVisibilityChange,
			false
		);
		return () => {
			document.removeEventListener(
				'fullscreenchange',
				handleFullScreenChange,
				false
			);
			document.removeEventListener(
				'contextmenu',
				function (e) {
					e.preventDefault();
				},
				false
			);
			document.removeEventListener(
				'visibilitychange',
				handleVisibilityChange,
				false
			);
		};
		getLocation();
	}, []);

	// let isWebcamEnable = DetectRTC.isWebsiteHasWebcamPermissions;
	// if (!isWebcamEnable) {
	// 	console.log('no webcam');
	// 	// setFormLink(false);
	// }

	return (
		<div
			className='d-flex flex-col lg:flex-row mt-3 mb-3 align-middle space-x-2'
			id='UserHome'
		>
			<div className='w-full lg:w-1/2 flex flex-col justify-around overflow-hidden px-2'>
				{formLink && (
					<Suspense
						fallback={
							<div className='w-full h-full'>
								<MDBSpinner
									className=''
									style={{ width: '3rem', height: '3rem' }}
									role='status'
								>
									{/* <span>Loading...</span> */}
								</MDBSpinner>
							</div>
						}
					>
						<DetectionWindow />
					</Suspense>
				)}
				<div className='shadow-lg p-1 mt-1 mb-2 bg-transparent border-2 border-primary rounded-4'>
					<h3 align='left' className='ms-2 mb-1 fs-6 font-bold'>
						Exam Name :
						<span style={{ fontSize: '20px' }}>
							{' '}
							{UserCurrentExamData.ExamName}
						</span>
					</h3>
					<h3 align='left' className='ms-2 mb-1 fs-6 font-bold'>
						Exam Type :{' '}
						<span style={{ fontSize: '20px' }}>
							{' '}
							{UserCurrentExamData.ExamType}
						</span>
					</h3>
					<h3 align='left' className='ms-2 mb-1 fs-6 font-bold'>
						Examinee Name :{' '}
						<span style={{ fontSize: '20px' }}>
							{' '}
							{UserData.Name}
						</span>
					</h3>
				</div>
				<Timer
					start={UserCurrentExamData.Timestamp}
					duration={parseInt(UserCurrentExamData.Duration, 10)}
					setFormLink={setFormLink}
				/>
				<div className='button'>
					<p align='center' style={{ fontSize: '18px' }}>
						To Save Your Attendance :<br /> Kindly Click{' '}
						<strong>Exit Exam Window</strong> After Submission Of
						Google Form{' '}
					</p>
					<center>
						<Button
							style={{ fontSize: '15px' }}
							variant='contained'
							className=' bg-blue-700'
							size='medium'
							onClick={() => {
								// setIsLoading(true);
								finishExam(router);
							}}
						>
							{isLoading && (
								<MDBSpinner
									size='sm'
									role='status'
									tag='span'
								/>
							)}
							Exit Exam Window
						</Button>
					</center>
					{/* <br/> */}
					<p align='center' style={{ fontSize: '18px' }}>
						<i>
							DONOT ESCAPE THIS PAGE ELSE ANSWERS WILL BE
							UNSAVED!!
						</i>
					</p>
				</div>
			</div>
			<Suspense
				fallback={
					<div className='w-full h-full'>
						<MDBSpinner
							className=''
							style={{ width: '3rem', height: '3rem' }}
							role='status'
						>
							{/* <span>Loading...</span> */}
						</MDBSpinner>
					</div>
				}
			>
				<QuestionComponent
					className='w-full lg:w-1/2'
					showquestion={formLink}
				/>
			</Suspense>
			<Suspense
				fallback={
					<div className='w-full h-full'>
						<MDBSpinner
							className=''
							style={{ width: '3rem', height: '3rem' }}
							role='status'
						>
							{/* <span>Loading...</span> */}
						</MDBSpinner>
					</div>
				}
			>
				<ExpandableComponent>
					<ChatWindow />
				</ExpandableComponent>
			</Suspense>
		</div>
	);
}

function ExamPage() {
	return (
		<Examineelayout children={<ExamPageBody />} LayoutNeedHeader={false} />
	);
}

export default ExamPage;
