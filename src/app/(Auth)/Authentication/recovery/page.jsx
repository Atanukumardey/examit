'use client';
import {
	changePassword,
	sendRecoveryPasswordLink,
} from '@/server/firebase/Authentication';
//import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBBtn, MDBContainer, MDBInput, MDBSpinner } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';

export default function Recovery() {
	const router = useRouter();
	const [submitButtonEnable, setSubmitButtonEnable] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [justifyActivity, setJustifyActivity] = useState(false);

	const [formInputValidityLabel, setFormInputValidityLabel] = useState({
		validEmailLabel: 'Email address',
		validPasswordLabel: 'Password',
		validcPasswordLabel: 'Confrim Password',
	});

	const [formValue, setFromValue] = useState({
		code: '',
		email: '',
		password: '',
		cpassword: '',
	});

	function decideSubmitButtonState() {
		setSubmitButtonEnable(false);
		if (formInputValidityLabel.validEmailLabel == 'Email address') {
			if (
				justifyActivity &&
				formInputValidityLabel.validPasswordLabel == 'Password' &&
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

	function onChangeFromValue(e) {
		setFromValue({ ...formValue, [e.target.name]: e.target.value });
		// setSubmitButtonEnable(true);
		if (e.target.name == 'email') {
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
		}
		// decideSubmitButtonState();
	}

	function sendCodeCallback(state, message) {
		if (state === true) {
			swal({
				title: 'Please Check Email',
				text: 'Reset password and Login using new password',
				icon: 'success',
				button: 'OK',
			}).then(() => {
				//setJustifyActivity(true);
				setSubmitButtonEnable(true);
				setIsLoading(false);
				router.push('/Authentication');
			});
		} else {
			swal({
				title: 'Process Unsuccessfull',
				text: message,
				icon: 'error',
				button: 'Try Again',
			});
			setSubmitButtonEnable(true);
			setIsLoading(false);
		}
	}

	function resetPasswordCallback(state, message) {
		if (state === true) {
			swal({
				title: 'Successfully Changed Password',
				text: 'Now use new password to login',
				icon: 'success',
				button: 'OK',
			}).then(() => {
				setJustifyActivity(false);
				// setSubmitButtonEnable(true);
				// setIsLoading(false);
				router.push('/Authentication');
			});
		} else {
			swal({
				title: 'Process Unsuccessfull',
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

		if (justifyActivity == false) {
			//send email
			sendRecoveryPasswordLink(formValue.email, sendCodeCallback);
			//swal("Here")
		} else {
			// reset password
			changePassword(
				formValue.code,
				formValue.password,
				resetPasswordCallback
			);
		}
		// console.log(formValue);
	}

	return (
		<MDBContainer fluid style={{ height: '75vh', width: 'auto' }}>
			<form className='mt-20 ' onSubmit={handleFormSubmit}>
				<div className='text-center mb-3 justify-content-center'>
					<h3>Please enter your email</h3>
				</div>
				<MDBInput
					value={formValue.email}
					onChange={onChangeFromValue}
					name='email'
					label={formInputValidityLabel.validEmailLabel}
					labelStyle={{
						color:
							formInputValidityLabel.validEmailLabel ==
							'Email address'
								? ''
								: 'red',
					}}
					className='mb-4'
					id='emailInput'
					type='email'
					required
				/>
				{justifyActivity ? (
					<>
						<MDBInput
							name='code'
							wrapperClass='mb-4'
							label='Reset Code'
							id='code'
							type='text'
							required
						/>
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
							label={formInputValidityLabel.validPasswordLabel}
							id='password'
							type='password'
							required
						/>
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
							id='cpassword'
							type='password'
							required
						/>
					</>
				) : (
					<></>
				)}

				{submitButtonEnable ? (
					<MDBBtn className='mb-4 w-100' type='submit'>
						{!justifyActivity ? 'Send Code' : 'Reset Password'}
					</MDBBtn>
				) : (
					<MDBBtn className='mb-4 w-100' type='submit' disabled>
						{isLoading && (
							<MDBSpinner size='sm' role='status' tag='span' />
						)}
						{!justifyActivity ? 'Send Code' : 'Reset Password'}
					</MDBBtn>
				)}
				{/* <MDBBtn className='mb-4 w-100' >Send Link</MDBBtn> */}
			</form>
			{/* Your content goes here */}
		</MDBContainer>
	);
}
