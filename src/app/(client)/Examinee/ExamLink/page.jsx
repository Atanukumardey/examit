'use client';
import { getExamByID } from '@/server/firebase/ExamTable';
//import "@fortawesome/fontawesome-free/css/all.min.css";
import { createExamChat, getExamChatBy } from '@/server/firebase/ExamChat';
import {
	createExamStatus,
	getExamStatusByExamIDuserName,
} from '@/server/firebase/ExamStatus';
import { MDBBtn, MDBContainer, MDBInput, MDBSpinner } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { styled } from 'styled-components';
import swal from 'sweetalert';
import Examineelayout from '../Examineeayout';

const ContainerUser = styled.div`
	display: flex;
	flex-direction: column;
	/*justify-content: center;*/
	align-items: center;
	/* position: relative; */
	height: 100vh;
`;

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

function ExamLinkPageBody() {
	const [submitButtonEnable, setSubmitButtonEnable] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const [examID, setExamID] = useState('');

	function formValueChange(e) {
		if (e.target.name == 'examID') {
			setExamID(e.target.value);
		}
	}

	function GetExamCallback(state, message) {
		if (state === true) {
			let userData = JSON.parse(sessionStorage.getItem('UserData'));

			// if (message.ExamOrganizer == userData.userName) {
			// 	swal({
			// 		title: `An Examiner can't attend an exam`,
			// 		icon: 'error',
			// 		button: 'Ok',
			// 	});
			// 	setSubmitButtonEnable(true);
			// 	setIsLoading(false);
			// 	return;
			// }

			let currentTime = Date.now();
			let validExamTime =
				message.Timestamp + message.Duration * 60 * 1000;

			// let DateTimeStamp = Date(validExamTime)

			if (validExamTime <= currentTime) {
				swal({
					title: `Time for this exam is over`,
					icon: 'error',
					button: 'Ok',
				});
				setSubmitButtonEnable(true);
				setIsLoading(false);
				return;
			}

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
			setSubmitButtonEnable(true);
			setIsLoading(false);
		}
	}

	function handleExamCodeFromSubmit(e) {
		e.preventDefault();

		setSubmitButtonEnable(false);
		setIsLoading(true);

		getExamByID(examID, GetExamCallback);
		return;
	}

	return (
		<ContainerUser>
			<MDBContainer fluid style={{ height: '75vh', width: 'auto' }}>
				<form
					className='mt-20 text-center'
					onSubmit={handleExamCodeFromSubmit}
					id='Linkform'
				>
					<div className='text-center mb-3 justify-content-center'>
						<h3>Please enter exam ID</h3>
					</div>
					<MDBInput
						className='mb-4'
						name='examID'
						label='Exam ID'
						value={examID}
						onChange={formValueChange}
						id='form1'
						type='text'
						required
					/>
					{submitButtonEnable ? (
						<MDBBtn className='mb-4 w-100' type='submit'>
							Next
						</MDBBtn>
					) : (
						<MDBBtn className='mb-4 w-100' type='submit' disabled>
							{isLoading && (
								<MDBSpinner
									size='sm'
									role='status'
									tag='span'
								/>
							)}
							Next
						</MDBBtn>
					)}
				</form>
				{/* Your content goes here */}
			</MDBContainer>
		</ContainerUser>
	);
}

export default function ExamLink() {
	return (
		<Examineelayout
			children={<ExamLinkPageBody />}
			LayoutNeedHeader={true}
		/>
	);
}
