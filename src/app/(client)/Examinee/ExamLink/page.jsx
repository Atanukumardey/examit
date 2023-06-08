'use client';
import { getExamByID } from '@/server/firebase/ExamTable';
//import "@fortawesome/fontawesome-free/css/all.min.css";
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
			setSubmitButtonEnable(true);
			setIsLoading(false);
			let userData = JSON.parse(sessionStorage.getItem('UserData'))[0];

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

			sessionStorage.setItem('ExamDuration', message.Duration);
			sessionStorage.setItem('ExamID', message.ExamID);
			sessionStorage.setItem('ExamName', message.ExamName);
			sessionStorage.setItem('ExamOrganizer', message.ExamOrganizer);
			sessionStorage.setItem('ExamGoogleFormLink', message.GFormLink);
			sessionStorage.setItem('ExamTimeStamp', message.Timestamp);

			// setsessionstorage
			router.push('/Examinee/CameraCheck');
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
