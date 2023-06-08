'use client';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import facebookIcon from '/public/ImageAsset/facebooksvgrepocom.svg';
import googleIcon from '/public/ImageAsset/googlesvgrepocom.svg';
//import '../../globals.css';

// import Gmail from "/public/landingpage/envelope-open-solid.svg";
// import Instagram from "/public/landingpage/instagram-square-brands.svg";

import Image from 'next/image';

import 'react-phone-number-input/style.css';

import {
	checkUniqueUser,
	signIn,
	signUp,
} from '@/server/firebase/Authentication';

import {
	MDBBtn,
	MDBCheckbox,
	MDBContainer,
	MDBInput,
	MDBInputGroup,
	MDBSpinner,
	MDBTabs,
	MDBTabsContent,
	MDBTabsItem,
	MDBTabsLink,
	MDBTabsPane,
	MDBValidationItem
} from 'mdb-react-ui-kit';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

function LoginSignup() {
	const router = useRouter();

	const [justifyActive, setJustifyActive] = useState('loginTab');
	const [submitButtonEnable, setSubmitButtonEnable] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [formInputValidityLabel, setFormInputValidityLabel] = useState({
		userNameUniqueLabel: 'Username',
		validEmailLabel: 'Email address',
		validPhoneNumberLabel: 'Phone Number',
		validPasswordLabel: 'Password',
		validcPasswordLabel: 'Confrim Password',
	});

	const [formValue, setFromValue] = useState({
		name: '',
		username: '',
		phoneNumber: '+880',
		email: '',
		password: '',
		cpassword: '',
		imageURL: '',
	});

	function decideSubmitButtonState() {
		setSubmitButtonEnable(false);
		if (
			formInputValidityLabel.validEmailLabel == 'Email address' &&
			formInputValidityLabel.validPhoneNumberLabel == 'Phone Number' &&
			formInputValidityLabel.validPasswordLabel == 'Password'
		) {
			if (
				justifyActive != 'loginTab' &&
				formInputValidityLabel.userNameUniqueLabel == 'Username' &&
				formInputValidityLabel.validcPasswordLabel == 'Confrim Password'
			) {
				setSubmitButtonEnable(true);
			} else {
				setSubmitButtonEnable(true);
			}
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

	function registerUserCallback(state, message) {
		if (state === true) {
			swal({
				title: 'Resgistration Successfull',
				text: 'Check your email and verify then try login 🙂',
				icon: 'success',
				button: 'OK',
			}).then(() => {
				handleJustifyClick('loginTab');
			});
		} else {
			swal({
				title: 'Resgistration Unsuccessfull',
				text: message,
				icon: 'error',
				button: 'Try Again',
			});
			setSubmitButtonEnable(true);
			setIsLoading(false);
		}
	}

	function signInUserCallback(state, message) {
		console.log(message);
		if (state === true) {
			swal({
				title: 'Signin Successfull',
				icon: 'success',
				button: 'OK',
			}).then(() => {
				setSubmitButtonEnable(true);
				setIsLoading(false);
				router.push('/User/Home');
			});
		} else {
			swal({
				title: 'Signin Unsuccessfull',
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

		if (justifyActive == 'loginTab') {
			console.log('LOGIN: ');
			await signIn(formValue, signInUserCallback);
		} else {
			console.log('REGISTER: ');
			await signUp(formValue, registerUserCallback);
		}
		// console.log(formValue);
	}

	const handleJustifyClick = (value) => {
		if (value === justifyActive) {
			return;
		}

		setFormInputValidityLabel({
			...formInputValidityLabel,
			userNameUniqueLabel: 'Username',
			validEmailLabel: 'Email address',
			validPhoneNumberLabel: 'Phone Number',
			validPasswordLabel: 'Password',
			validcPasswordLabel: 'Confrim Password',
		});

		setFromValue({
			...formValue,
			name: '',
			username: '',
			phoneNumber: '+880',
			email: '',
			password: '',
			cpassword: '',
		});

		setSubmitButtonEnable(false);
		setIsLoading(false);

		setJustifyActive(value);
	};

	return (
		<MDBContainer className='p-3 my-5 d-flex flex-column w-50'>
			<MDBTabs
				pills
				justify
				className='mb-3 d-flex flex-row justify-content-center'
			>
				<MDBTabsItem>
					<MDBTabsLink
						onClick={() => handleJustifyClick('loginTab')}
						active={justifyActive === 'loginTab'}
					>
						Login
					</MDBTabsLink>
				</MDBTabsItem>
				<MDBTabsItem>
					<MDBTabsLink
						onClick={() => handleJustifyClick('registerTab')}
						active={justifyActive === 'registerTab'}
					>
						Register
					</MDBTabsLink>
				</MDBTabsItem>
			</MDBTabs>

			<MDBTabsContent>
				<MDBTabsPane show={justifyActive === 'loginTab'}>
					<div className='text-center mb-3'>
						<p>Sign in with:</p>

						<div
							className='d-flex justify-content-center mx-auto'
							style={{ width: '40%' }}
						>
							{/* <MDBBtn
								tag='a'
								color='none'
								className='m-1'
								style={{ color: '#1266f1' }}
							>
								<div style={{ width: 40, height: 40 }}>
									<Image
										src={facebookIcon}
										width={2}
										height={2}
										alt={'facebookicon'}
									/>
								</div>
								{/* <MDBIcon fab icon='facebook-f' size="sm"/> */}
							{/* </MDBBtn> */} 

							<MDBBtn floating color='secondary' className='mx-1'>
								{/* <MDBIcon fab icon='google' ></MDBIcon>*/}
								<Image
										src={facebookIcon}
										width={2}
										height={2}
										alt={'google Icon'}
									/> 
							</MDBBtn>
							
							<MDBBtn floating color='secondary' className='mx-1'>
								{/* <MDBIcon fab icon='google' ></MDBIcon>*/}
								<Image
										src={googleIcon}
										width={2}
										height={2}
										alt={'google Icon'}
									/> 
							</MDBBtn>
							{/* <MDBBtn
								tag='a'
								color='none'
								className='m-1'
								style={{ color: '#1266f1' }}
							>
								<div style={{ width: 40, height: 40 }}>
									<Image
										src={googleIcon}
										width={2}
										height={2}
										alt={'google Icon'}
									/>
								</div>
							</MDBBtn> */}
						</div>

						<p className='text-center mt-3'>or:</p>
					</div>
					<form onSubmit={handleFormSubmit}>
						<MDBValidationItem
							feedback='Please Provide Email.'
							invalid
						>
							<MDBInput
								wrapperClass='mb-4 danger'
								// style={{border:"3px solid red", label:"red"}}
								labelStyle={{
									color:
										formInputValidityLabel.validEmailLabel ==
										'Email address'
											? ''
											: 'red',
								}}
								value={formValue.email}
								onChange={onChangeFromValue}
								name='email'
								label={formInputValidityLabel.validEmailLabel}
								id='logemail'
								type='email'
								required
							/>
						</MDBValidationItem>
						<MDBValidationItem
							feedback='Please Provide Phone Number.'
							invalid
						>
							<MDBInput
								wrapperClass='mb-4'
								value={formValue.phoneNumber}
								labelStyle={{
									color:
										formInputValidityLabel.validPhoneNumberLabel ==
										'Phone Number'
											? ''
											: 'red',
								}}
								onChange={onChangeFromValue}
								name='phoneNumber'
								label={
									formInputValidityLabel.validPhoneNumberLabel
								}
								id='logphone'
								type='tel'
								required
							>
								{/* <div className='bg-inherit'>
							<PhoneInput
								international
								defaultCountry='BD'
								value={mobileNumber}
								onChange={setMobileNumber}
							/>
						</div> */}
							</MDBInput>
						</MDBValidationItem>
						<MDBValidationItem
							feedback='Please Provide Password.'
							invalid
						>
							<MDBInput
								wrapperClass='mb-4'
								value={formValue.password}
								onChange={onChangeFromValue}
								name='password'
								labelStyle={{
									color:
										formInputValidityLabel.validPasswordLabel ==
										'Password'
											? ''
											: 'red',
								}}
								onChange={onChangeFromValue}
								label={
									formInputValidityLabel.validPasswordLabel
								}
								id='logpassword'
								type='password'
								required
							/>
						</MDBValidationItem>
						<div className='d-flex justify-content-between mx-4 mb-4'>
							<MDBCheckbox
								name='registerCheckbox'
								value=''
								id='registerCheckBox'
								label='Remember me'
							/>
							<a href='/Authentication/recovery'>
								Forgot password?
							</a>
						</div>

						{submitButtonEnable ? (
							<MDBBtn className='mb-4 w-100' type='submit'>
								Sign in
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
								Sign in
							</MDBBtn>
						)}

						<p className='text-center'>
							Not a member?{' '}
							<a
								href='#'
								onClick={() =>
									handleJustifyClick('registerTab')
								}
							>
								Register
							</a>
						</p>
					</form>
				</MDBTabsPane>

				<MDBTabsPane show={justifyActive === 'registerTab'}>
					<div className='text-center mb-3 justify-content-center'>
						<p>Sign up with:</p>

						<div
							className='d-flex justify-content-center mx-auto'
							style={{ width: '40%' }}
						>
							<MDBBtn
								tag='a'
								color='none'
								className='m-1'
								style={{ color: '#1266f1' }}
							>
								<div style={{ width: 40, height: 40 }}>
									<Image
										src={facebookIcon}
										width={2}
										height={2}
										alt={'facebookIcon'}
									/>
								</div>
								{/* <MDBIcon fab icon='facebook-f' size="sm"/> */}
							</MDBBtn>
							<MDBBtn
								tag='a'
								color='none'
								className='m-1'
								style={{ color: '#1266f1' }}
							>
								{/* <MDBIcon fab icon='google' size="sm"/> */}
								<div style={{ width: 40, height: 40 }}>
									<Image
										src={googleIcon}
										width={2}
										height={2}
										alt={'googleIcon'}
									/>
								</div>
							</MDBBtn>
						</div>

						<p className='text-center mt-3'>or:</p>
					</div>

					<form onSubmit={handleFormSubmit}>
						<div className='justify-content-center mb-0'>
							<MDBValidationItem
								feedback='Please Provide Name.'
								invalid
							>
								<MDBInput
									wrapperClass='mb-4'
									value={formValue.name}
									onChange={onChangeFromValue}
									name='name'
									label='Name'
									id='signname'
									type='text'
									required
								/>
							</MDBValidationItem>
							<MDBValidationItem
								feedback='Please Choose a Username.'
								invalid
							>
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
										label={
											formInputValidityLabel.userNameUniqueLabel
										}
										id='signusername'
										type='text'
										required
									/>
								</MDBInputGroup>
							</MDBValidationItem>
							<MDBValidationItem
								feedback='Please Provide an Email.'
								invalid
							>
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
									label={
										formInputValidityLabel.validEmailLabel
									}
									id='signemail'
									type='email'
									required
								/>
							</MDBValidationItem>
							<MDBValidationItem
								feedback='Please Provide a Number.'
								invalid
							>
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
									label={
										formInputValidityLabel.validPhoneNumberLabel
									}
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
									label={
										formInputValidityLabel.validPasswordLabel
									}
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
									label={
										formInputValidityLabel.validcPasswordLabel
									}
									id='signcpassword'
									type='password'
									required
								/>
							</MDBValidationItem>
						</div>

						<div className='d-flex justify-content-center mb-4'>
							<MDBCheckbox
								name='loginCheckbox'
								id='loginCheckBox'
								label='I have read and agree to the terms'
							/>
						</div>
						{submitButtonEnable ? (
							<MDBBtn className='mb-4 w-100' type='submit'>
								Sign up
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
								Sign up
							</MDBBtn>
						)}
						{/* <MDBBtn className='mb-4 w-100' type='submit' {submitButtonEnable}>Sign up</MDBBtn> */}
					</form>
				</MDBTabsPane>
			</MDBTabsContent>
		</MDBContainer>
	);
}

export default LoginSignup;
