'use client';
import { createExam } from '@/server/firebase/ExamTable';
//import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBBtn, MDBContainer, MDBInput, MDBSpinner } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';

const ContainerUser = styled.div`
	display: flex;
	flex-direction: column;
	/*justify-content: center;*/
	align-items: center;
	/* position: relative; */
	height: 100vh;
`;

export default function ExaminerCreateExam() {

	const router = useRouter();

	const [formValue, setFromValue] = useState({
		Date: '',
		Duration: '',
		ExamName: '',
		GFormLink: '',
		Time: '',
		ExamType: 'Private',
	});

	const [submitButtonEnable, setSubmitButtonEnable] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [visibleExamID, setVisibleExamID] = useState(false);
	const[examCode, setExamCode] = useState('');

	function onChangeFromValue(e) {
		// console.log('here');
		setFromValue({ ...formValue, [e.target.name]: e.target.value });

	}

	function cerateExamCallback(state, message) {
		if (state === true) {
			swal({
				title: 'Exam Creation Successfull',
				icon: 'success',
				button: 'OK',
			}).then(() => {
				setVisibleExamID(true);
				setExamCode(message);
				setSubmitButtonEnable(true);
				setIsLoading(false);
			});
		} else {
			swal({
				title: 'Exam Creation Unsuccessfull',
				text: message,
				icon: 'error',
				button: 'Try Again',
			});
			setSubmitButtonEnable(true);
			setIsLoading(false);
		}
	}

	function handleGotExamCodeFormSubmit(e){
		e.preventDefault();
		router.push("/Examiner/AllExams")
	}

	function handleFormSubmitCreateExam(e) {
		e.preventDefault();

		setSubmitButtonEnable(false);
		setIsLoading(true);
		createExam(formValue, cerateExamCallback);
	}

	return (
		<ContainerUser>
			<MDBContainer fluid style={{ height: '75vh', width: 'auto' }}>
				{!visibleExamID?
				<form className='mt-20 ' onSubmit={handleFormSubmitCreateExam}>
					<div className='text-center mb-5 justify-content-center'>
						<h3>Please provide necessary information</h3>
					</div>
					<MDBInput
						name='ExamName'
						wrapperClass='mb-4'
						label='Exam Name'
						id='examName'
						type='text'
						onChange={onChangeFromValue}
						required
					/>

					<MDBInput
						color='red'
						wrapperClass='mb-4'
						name='GFormLink'
						onChange={onChangeFromValue}
						label='Google Form Link'
						id='examGformID'
						type='url'
						required
					/>

					<MDBInput
						color='red'
						wrapperClass='mb-4'
						name='Date'
						onChange={onChangeFromValue}
						label='Exam Date'
						id='examDate'
						type='date'
						required
					/>

					<MDBInput
						color='red'
						wrapperClass='mb-4'
						name='Time'
						onChange={onChangeFromValue}
						label='Exam Time'
						id='examTime'
						type='time'
						required
					/>

					<MDBInput
						color='red'
						wrapperClass='mb-4'
						name='Duration'
						onChange={onChangeFromValue}
						label='Duration'
						id='examDuration(in minutes)'
						type='number'
						required
					/>

					<label>Select Exam Type</label>
					<select
						className='form-select mb-4'
						name='ExamType'
						onChange={onChangeFromValue}
						label='Select exam type'
						style={{
							background: '#EEF7F9',
						}}
						required
					>
						<option value='1'>Private Exam</option>
						<option value='2'>Public Exam</option>
					</select>

					{submitButtonEnable ? (
						<MDBBtn className='mb-4 w-100' type='submit'>
							Create
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
							Create
						</MDBBtn>
					)}
				</form>:
				<form  className='mt-20 ' onSubmit={handleGotExamCodeFormSubmit}>
					<div className='text-center mb-5 justify-content-center'>
						<h3>Copy and save the exam code</h3>
					</div>
					<MDBInput
						color='red'
						wrapperClass='mb-4'
						name='ExamCode'
						label='Exam Code'
						id='examCode'
						type='text'
						value={examCode}
						readOnly
					/>
					<MDBBtn className='mb-4 w-100' type='submit'>
							Done
						</MDBBtn>
				</form>
}
				{/* Your content goes here */}
			</MDBContainer>
		</ContainerUser>
	);
}
