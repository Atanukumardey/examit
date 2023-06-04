'use client';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import facebookIcon from '/public/ImageAsset/facebooksvgrepocom.svg';
import googleIcon from '/public/ImageAsset/googlesvgrepocom.svg';
//import '../../globals.css';

// import Gmail from "/public/landingpage/envelope-open-solid.svg";
// import Instagram from "/public/landingpage/instagram-square-brands.svg";
import Image from 'next/image';

import {
  MDBBtn,
  MDBCheckbox,
  MDBContainer,
  MDBInput,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from 'mdb-react-ui-kit';
import { useState } from 'react';

function LoginSignup() {
	const [justifyActive, setJustifyActive] = useState('tab1');

	const handleJustifyClick = (value) => {
		if (value === justifyActive) {
			return;
		}

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
						onClick={() => handleJustifyClick('tab1')}
						active={justifyActive === 'tab1'}
					>
						Login
					</MDBTabsLink>
				</MDBTabsItem>
				<MDBTabsItem>
					<MDBTabsLink
						onClick={() => handleJustifyClick('tab2')}
						active={justifyActive === 'tab2'}
					>
						Register
					</MDBTabsLink>
				</MDBTabsItem>
			</MDBTabs>

			<MDBTabsContent>
				<MDBTabsPane show={justifyActive === 'tab1'}>
					<div className='text-center mb-3'>
						<p>Sign in with:</p>

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
										alt={'facebookicon'}
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
										alt={'google Icon'}
									/>
								</div>
							</MDBBtn>
						</div>

						<p className='text-center mt-3'>or:</p>
					</div>
					<form>
						<MDBInput
							wrapperClass='mb-4'
							name='email'
							label='Email address'
							id='form1'
							type='email'
						/>
						<MDBInput
							wrapperClass='mb-4'
							name='password'
							label='Password'
							id='form2'
							type='password'
						/>

						<div className='d-flex justify-content-between mx-4 mb-4'>
							<MDBCheckbox
								name='flexCheck'
								value=''
								id='flexCheckDefault'
								label='Remember me'
							/>
							<a href='/Authentication/recovery'>
								Forgot password?
							</a>
						</div>

						<MDBBtn className='mb-4 w-100'>Sign in</MDBBtn>
						<p className='text-center'>
							Not a member?{' '}
							<a
								href='#'
								onClick={() => handleJustifyClick('tab2')}
							>
								Register
							</a>
						</p>
					</form>
				</MDBTabsPane>

				<MDBTabsPane show={justifyActive === 'tab2'}>
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

					<form>
						<div className='justify-content-center mb-0'>
							<MDBInput
								wrapperClass='mb-4'
								name='name'
								label='Name'
								id='form1'
								type='text'
							/>
							<MDBInput
								wrapperClass='mb-4'
								name='username'
								label='Username'
								id='form1'
								type='text'
							/>
							<MDBInput
								wrapperClass='mb-4'
								name='email'
								label='Email'
								id='form1'
								type='email'
							/>
							<MDBInput
								wrapperClass='mb-4'
								name='password'
								label='Password'
								id='form1'
								type='password'
							/>
							<MDBInput
								wrapperClass='mb-4'
								name='cpassword'
								label='Confrim Password'
								id='form1'
								type='password'
							/>
						</div>

						<div className='d-flex justify-content-center mb-4'>
							<MDBCheckbox
								name='flexCheck'
								id='flexCheckDefault'
								label='I have read and agree to the terms'
							/>
						</div>

						<MDBBtn className='mb-4 w-100'>Sign up</MDBBtn>
					</form>
				</MDBTabsPane>
			</MDBTabsContent>
		</MDBContainer>
	);
}

export default LoginSignup;
