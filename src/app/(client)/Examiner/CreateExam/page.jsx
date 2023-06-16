'use client';
import { createExam } from '@/server/firebase/ExamTable';
//import "@fortawesome/fontawesome-free/css/all.min.css";
import { getFileURLByRef, uploadImage } from '@/server/firestorage/ImageUpload';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { MDBBtn, MDBContainer, MDBInput, MDBSpinner } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import emptyImage from '/public/ImageAsset/emptyimage.png';

const ContainerUser = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	height: auto;
`;

export default function ExaminerCreateExam() {
	const router = useRouter();

	const [formValue, setFromValue] = useState({
		Date: '',
		Duration: '',
		ExamName: '',
		GFormLink: '',
		Time: '',
		ExamType: '',
		ImageURL: '',
	});

	const [submitButtonEnable, setSubmitButtonEnable] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [visibleExamID, setVisibleExamID] = useState(false);
	const [examCode, setExamCode] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		setFromValue({ ...formValue, ImageURL: file });
		setSelectedImage(URL.createObjectURL(file));
	};

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

	function handleGotExamCodeFormSubmit(e) {
		e.preventDefault();
		router.push('/Examiner/ExamTrack');
	}

	function handleFormSubmitCreateExam(e) {
		e.preventDefault();
		setSubmitButtonEnable(false);
		setIsLoading(true);

		const tempuserData = JSON.parse(sessionStorage.getItem('UserData'));

		if (formValue.ImageURL != '') {
			uploadImage('ExamImageFiles', formValue.ImageURL).then(
				(storageRef) => {
					getFileURLByRef(storageRef).then((url) => {
						formValue.ImageURL = url;
						setSelectedImage(url);
						createExam(
							tempuserData,
							formValue,
							cerateExamCallback
						);
					});
				}
			);
		} else {
			createExam(tempuserData, formValue, cerateExamCallback);
		}
	}

	return (
		<ContainerUser>
			<MDBContainer fluid className=' min-h-[600px] w-auto'>
				{!visibleExamID ? (
					<form
						className='mt-20 '
						onSubmit={handleFormSubmitCreateExam}
					>
						<div className='text-center mb-5 justify-content-center'>
							<h3>Please provide necessary information</h3>
						</div>

						<div className=' flex flex-col text-center mb-3 justify-center align-middle'>
							<div style={styles.imageContainer}>
								<img
									src={selectedImage || emptyImage.src}
									alt='Selected'
									style={styles.image}
								/>
							</div>
						</div>

						<MDBInput
							name='imageURL'
							wrapperClass='mb-4'
							type='file'
							accept='image/*'
							onChange={handleImageChange}
							id='examImage'
						/>
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

						<FormControl className='form-select mb-4' size='small'>
							<InputLabel id='demo-select-small-label'>
								Select Exam Type
							</InputLabel>
							<Select
								name='ExamType'
								labelId='demo-select-small-label'
								id='demo-select-small'
								label='Select Exam Type'
								value={formValue.ExamType}
								onChange={onChangeFromValue}
								required
							>
								<MenuItem value='Private'>Private</MenuItem>
								<MenuItem value='Public'>Public</MenuItem>
							</Select>
						</FormControl>

						{submitButtonEnable ? (
							<MDBBtn className='mb-4 w-100' type='submit'>
								Create
							</MDBBtn>
						) : (
							<MDBBtn
								className='mb-4 w-100'
								type='submit'
								disabled
							>
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
					</form>
				) : (
					<form
						className='mt-20 '
						onSubmit={handleGotExamCodeFormSubmit}
					>
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
				)}
				{/* Your content goes here */}
			</MDBContainer>
		</ContainerUser>
	);
}

const styles = {
	imageContainer: {
		width: '480px',
		height: '200px',
		borderRadius: '10%',
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
};
