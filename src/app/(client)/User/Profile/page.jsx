'use client';
//import "@fortawesome/fontawesome-free/css/all.min.css";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

//import '../../globals.css';

// import Gmail from "/public/landingpage/envelope-open-solid.svg";
// import Instagram from "/public/landingpage/instagram-square-brands.svg";

import 'react-phone-number-input/style.css';

import { checkUniqueUser } from '@/server/firebase/Authentication';

import {
	MDBBtn,
	MDBContainer,
	MDBInput,
	MDBInputGroup,
	MDBSpinner,
	MDBValidationItem,
} from 'mdb-react-ui-kit';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const ContainerUser = styled.div`
	display: flex;
	flex-direction: column;
	/*justify-content: center;*/
	align-items: center;
	/* position: relative; */
	height: 100vh;
`;

import { updateUser } from '@/server/firebase/UserTable';
import { getFileURLByRef, uploadImage } from '@/server/firestorage/ImageUpload';
import swal from 'sweetalert';
import profileImage from '/public/ImageAsset/dummyProfile.png';

export default function Profile() {
	let UserData = JSON.parse(sessionStorage.getItem('UserData'));
	const router = useRouter();
	const [submitButtonEnable, setSubmitButtonEnable] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [justifyActivity, setJustifyActivity] = useState(false);
	const [selectedImage, setSelectedImage] = useState(UserData.ImageURL);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		setFromValue({ ...formValue, imageURL: file });
		setSelectedImage(URL.createObjectURL(file));
	};

	const [formInputValidityLabel, setFormInputValidityLabel] = useState({
		userNameUniqueLabel: 'Username',
		validEmailLabel: 'Email address',
		validPhoneNumberLabel: 'Phone Number',
		validPasswordLabel: 'Password',
		validcPasswordLabel: 'Confrim Password',
	});

	const [formValue, setFromValue] = useState({
		name: UserData.Name,
		username: UserData.userName,
		phoneNumber: UserData.Number,
		email: UserData.Email,
		password: UserData.Password,
		cpassword: UserData.Password,
		imageURL: UserData.ImageURL,
	});

	function decideSubmitButtonState() {
		setSubmitButtonEnable(false);
		if (
			formInputValidityLabel.validEmailLabel == 'Email address' &&
			formInputValidityLabel.validPhoneNumberLabel == 'Phone Number' &&
			formInputValidityLabel.validPasswordLabel == 'Password' &&
			formInputValidityLabel.userNameUniqueLabel == 'Username' &&
			formInputValidityLabel.validcPasswordLabel == 'Confrim Password'
		) {
			setSubmitButtonEnable(true);
		} else {
			setSubmitButtonEnable(true);
		}
	}

	useEffect(() => {
		decideSubmitButtonState();
	}, [formInputValidityLabel]);

	function checkUniqueUserNameFirebaseCallback(data) {
		if (data?.length > 0) {
			setFormInputValidityLabel({
				...formInputValidityLabel,
				userNameUniqueLabel: 'Username Alredy exists',
			});
		} else {
			setFormInputValidityLabel({
				...formInputValidityLabel,
				userNameUniqueLabel: 'Username',
			});
		}
	}

	function onChangeFromValue(e) {
		setFromValue({ ...formValue, [e.target.name]: e.target.value });
		// setSubmitButtonEnable(true);
		if (e.target.name == 'username') {
			// check for unique user if registration
			if (e.target.value.length > 0 && e.target.value.length < 6) {
				setFormInputValidityLabel({
					...formInputValidityLabel,
					userNameUniqueLabel: 'Too short',
				});
			} else {
				checkUniqueUser({
					field: 'UserName',
					value: e.target.value,
					callback: checkUniqueUserNameFirebaseCallback,
				});
			}
		} else if (e.target.name == 'email') {
			// console.log(e.target.value);
			if (
				formValue.email.length > 0 &&
				!new RegExp(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				).test(e.target.value)
			) {
				setFormInputValidityLabel({
					...formInputValidityLabel,
					validEmailLabel: 'Invalid email',
				});
			} else {
				setFormInputValidityLabel({
					...formInputValidityLabel,
					validEmailLabel: 'Email address',
				});
			}
		} else if (e.target.name == 'password') {
			if (
				!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(
					e.target.value
				)
			) {
				setFormInputValidityLabel({
					...formInputValidityLabel,
					validPasswordLabel:
						'Atleast 8 charaters and containing uppercase,lowercase and numbers',
				});
			} else {
				if (e.target.value != formValue.cpassword) {
					setFormInputValidityLabel({
						...formInputValidityLabel,
						validPasswordLabel: 'Password',
						validcPasswordLabel: "Doesn't match with password",
					});
				} else {
					setFormInputValidityLabel({
						...formInputValidityLabel,
						validPasswordLabel: 'Password',
						validcPasswordLabel: 'Confrim Password',
					});
				}
			}
		} else if (e.target.name == 'cpassword') {
			if (formValue.password != e.target.value) {
				setFormInputValidityLabel({
					...formInputValidityLabel,
					validcPasswordLabel: "Doesn't match with password",
				});
			} else {
				setFormInputValidityLabel({
					...formInputValidityLabel,
					validcPasswordLabel: 'Confrim Password',
				});
			}
		} else if (e.target.name == 'phoneNumber') {
			// if(formValue.phoneNumber.length < 11|| !new RegExp(/^\+?[0-9]{1,15}$/).test(formValue.phoneNumber)){
			if (
				e.target.value.length < 13 ||
				!new RegExp(/^\+8801[0-9]{9}$/).test(e.target.value)
			) {
				//	console.log(e.target.value);
				setFormInputValidityLabel({
					...formInputValidityLabel,
					validPhoneNumberLabel: 'Invalid Phone Number',
				});
			} else {
				setFormInputValidityLabel({
					...formInputValidityLabel,
					validPhoneNumberLabel: 'Phone Number',
				});
			}
		}
		// decideSubmitButtonState();
	}

	function updateUserCallback(state, message) {
		console.log(message);
		if (state === true) {
			UserData = {
				Email: formValue.email,
				Password: formValue.password,
				Name: formValue.name,
				userName: formValue.username,
				Number: formValue.phoneNumber,
				ImageURL: formValue.imageURL,
				UserRefid: UserData.UserRefid,
			};
			sessionStorage.setItem('UserData', JSON.stringify(UserData));

			swal({
				title: 'Update Successfull',
				icon: 'success',
				button: 'OK',
			}).then(() => {
				setSubmitButtonEnable(true);
				setIsLoading(false);
			});
		} else {
			swal({
				title: 'Update Unsuccessfull',
				text: message,
				icon: 'error',
				button: 'Try Again',
			});
			setSubmitButtonEnable(true);
			setIsLoading(false);
		}
	}

	async function handleFormSubmit(e) {
		e.preventDefault();

		setSubmitButtonEnable(false);
		setIsLoading(true);

		if (formValue.imageURL != UserData.ImageURL) {
			uploadImage('profileImage', formValue.imageURL).then(
				(storageRef) => {
					getFileURLByRef(storageRef).then((url) => {
						formValue.imageURL = url;
						console.log(url);
						setSelectedImage(url);
						updateUser(
							UserData.UserRefid,
							formValue,
							updateUserCallback
						);
					});
				}
			);
		} else {
			updateUser(UserData.UserRefid, formValue, updateUserCallback);
		}
		// console.log(formValue);
	}

	return (
		<MDBContainer
			fluid
			className='flex flex-row justify-content-center'
			style={{ height: 'auto', width: 'auto' }}
		>
			<form
				className='mt-10 text-center w-50 justify-content-center'
				onSubmit={handleFormSubmit}
			>
				<div className='text-center mb-3 justify-self-center justify-content-center'>
					<h3>Profile</h3>
				</div>

				<div className=' flex flex-row mb-3 justify-center align-middle'>
					<div style={styles.imageContainer}>
						<img
							src={selectedImage || profileImage.src}
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
					// label = "Profile Image"
					id='examImage'
				/>

				<MDBValidationItem feedback='Please Provide Name.' invalid>
					<MDBInput
						wrapperClass='mb-4 justify-self-center'
						value={formValue.name}
						onChange={onChangeFromValue}
						name='name'
						label='Name'
						id='signname'
						type='text'
						required
					/>
				</MDBValidationItem>
				<MDBValidationItem feedback='Please Choose a Username.' invalid>
					<MDBInputGroup textBefore='@'>
						<MDBInput
							wrapperClass='mb-4'
							value={formValue.username}
							labelStyle={{
								color:
									formInputValidityLabel.userNameUniqueLabel ==
									'Username'
										? ''
										: 'red',
							}}
							onChange={onChangeFromValue}
							name='username'
							label={formInputValidityLabel.userNameUniqueLabel}
							id='signusername'
							type='text'
							required
						/>
					</MDBInputGroup>
				</MDBValidationItem>
				<MDBValidationItem feedback='Please Provide an Email.' invalid>
					<MDBInput
						wrapperClass='mb-4'
						value={formValue.email}
						onChange={onChangeFromValue}
						labelStyle={{
							color:
								formInputValidityLabel.validEmailLabel ==
								'Email address'
									? ''
									: 'red',
						}}
						name='email'
						label={formInputValidityLabel.validEmailLabel}
						id='signemail'
						type='email'
						required
					/>
				</MDBValidationItem>
				<MDBValidationItem feedback='Please Provide a Number.' invalid>
					<MDBInput
						wrapperClass='mb-4'
						value={formValue.phoneNumber}
						onChange={onChangeFromValue}
						labelStyle={{
							color:
								formInputValidityLabel.validPhoneNumberLabel ==
								'Phone Number'
									? ''
									: 'red',
						}}
						name='phoneNumber'
						label={formInputValidityLabel.validPhoneNumberLabel}
						id='signphone'
						type='tel'
						required
					/>
				</MDBValidationItem>
				{/* <div className='bg-bgLight2 dark:bg-white rounded-xl py-1 px-4'>
								<PhoneInput
									international
									defaultCountry='BD'
									value={mobileNumber}
									onChange={setMobileNumber}
								/>
							</div> */}
				<MDBValidationItem
					feedback='Please Provide a Password.'
					invalid
				>
					<MDBInput
						wrapperClass='mb-4'
						value={formValue.password}
						labelStyle={{
							color:
								formInputValidityLabel.validPasswordLabel ==
								'Password'
									? ''
									: 'red',
						}}
						onChange={onChangeFromValue}
						name='password'
						label={formInputValidityLabel.validPasswordLabel}
						id='signpassword'
						type='password'
						required
					/>
				</MDBValidationItem>
				<MDBValidationItem
					feedback='Please Confirm The Password.'
					invalid
				>
					<MDBInput
						wrapperClass='mb-4'
						value={formValue.cpassword}
						labelStyle={{
							color:
								formInputValidityLabel.validcPasswordLabel ==
								'Confrim Password'
									? ''
									: 'red',
						}}
						onChange={onChangeFromValue}
						name='cpassword'
						label={formInputValidityLabel.validcPasswordLabel}
						id='signcpassword'
						type='password'
						required
					/>
				</MDBValidationItem>

				{submitButtonEnable ? (
					<MDBBtn className='mb-4 w-100' type='submit'>
						Update
					</MDBBtn>
				) : (
					<MDBBtn className='mb-4 w-100' type='submit' disabled>
						{isLoading && (
							<MDBSpinner size='sm' role='status' tag='span' />
						)}
						Update
					</MDBBtn>
				)}
			</form>
			{/* Your content goes here */}
		</MDBContainer>
	);
}

const styles = {
	imageContainer: {
		width: '200px',
		height: '200px',
		borderRadius: '50%',
		overflow: 'hidden',
		margin: '10px',
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
};
