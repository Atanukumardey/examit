'use client';

import { Button } from '@mui/material';
import { MDBContainer, MDBSpinner } from 'mdb-react-ui-kit';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Examineelayout from '../Examineeayout';
import InstructionPic from '/public/ImageAsset/instruction.jpg';

const ContainerUser = styled.div`
	display: flex;
	flex-direction: column;
	/*justify-content: center;*/
	align-items: center;
	/* position: relative; */
	height: 100vh;
`;

function InstructionPageBody() {
	const router = useRouter();
	const [elem, setElem] = useState();
	const [isLoading, setIsLoading] = useState(false);

	function onAccept(setIsLoading) {
		setIsLoading(true);
		router.push('/Examinee/Exam');
	}

	//Disable Right click
	useEffect(() => {
		if (document) {
			setElem(document.documentElement); // Get the document element (HTML element)
		}
	}, []);

	if (elem?.addEventListener) {
		elem?.addEventListener(
			'contextmenu',
			function (e) {
				e.preventDefault();
			},
			false
		);
	}

	return (
		<ContainerUser>
			<MDBContainer fluid style={{ height: 'h-screen', width: 'auto' }}>
				<div
					style={{
						alignItems: 'center',
						justifyContent: 'center',
					}}
					className='bg-white mt-10 ms-3 me-3 rounded-2xl flex flex-col text-black'
				>
					<center>
						<h2>
							<b className='fs-3'>Instructions To Follow:</b>
						</h2>
					</center>
					<table align='center'>
						<tbody>
							<tr>
								<td className='text-center'>
									<div>
										<Image
											src={InstructionPic}
											width={'auto'}
											height={'auto'}
											id='instructionIcon'
										/>
									</div>
								</td>
								<td>
									<ol className='list-group list-group-light list-group-numbered fs-6'>
										<br />
										<li className='list-group-item border-0'>
											The lighting in the room must be
											bright enough to be considered
											“daylight” quality. Overhead
											lighting is preferred.
										</li>
										<li className='list-group-item border-0'>
											Recommended to have a plain white
											background, no wall hangings, photo
											frames allowed.
										</li>
										<li className='list-group-item border-0'>
											Recommended to use lastest version
											of Chrome or Edge for better
											experience throughout the exam.
										</li>
										<li className='list-group-item border-0'>
											You are advised to be at the
											location where there is a good
											internet connectivity.
										</li>
										<li className='list-group-item border-0'>
											Make sure that the gadget which you
											are using is fully charged before
											the commencement of the examination
										</li>
										<li className='list-group-item border-0'>
											Your Webcam should be on throughout
											the exam.
										</li>

										<li className='list-group-item border-0'>
											Please ask others to refrain from
											coming into the room where you are
											taking your exam as you need to be
											alone to take your exams.
										</li>
										<li className='list-group-item border-0'>
											Close all programs on your computer
											and turn off cell phones.
										</li>
										<li className='list-group-item border-0'>
											You are not allowed to leave your
											seat during complete examination
											time.
										</li>
										<li className='list-group-item border-0'>
											You must have a clear desk and clear
											workspace. No drinks or scrap paper.
										</li>
										<li className='list-group-item border-0'>
											Do not wear hoodies, sweatshirts,
											jackets, neckties,
											headphoes/earphones or hats.
										</li>
										<li className='list-group-item border-0'>
											Do not speak to anyone during the
											exam.
										</li>
										<li className='list-group-item border-0'>
											Following activities during
											examination will be treated as
											unfair means / malpractice case
											<br />
											a. Moving away from the screen.
											<br />
											b. Browsing other websites,opening
											multiple tabs and sharing the same
											with any other person or on social
											media
											<br />
											c. Running any other application on
											the gadget through which you are
											appearing for the examination
										</li>
										<li className='list-group-item border-0'>
											If any suspicious act is
											encountered, it will be counted as
											violation. After certain number of
											warnings, system will Logout your
											assessment.
										</li>
										<li className='list-group-item border-0 font-bold fs-5'>
											PLEASE DONOT ESCAPE FULLSCREEN ELSE
											ANSWERS WILL BE RESETTED !!!
										</li>
									</ol>
								</td>
							</tr>
						</tbody>
					</table>
					<center>
						<small>Accept To Proceed!!</small>
					</center>
					<Button
						variant='contained'
						className = "bg-blue-700"
						onClick={() => {
							onAccept(setIsLoading);
						}}
						className='w-25 mt-2 mb-5'
					>
                        {isLoading && (
								<MDBSpinner
									size='sm'
									role='status'
									tag='span'
								/>
							)}
						I Accept
					</Button>
				</div>
			</MDBContainer>
		</ContainerUser>
	);
}

function InstructionPage() {
	return (
		<Examineelayout
			children={<InstructionPageBody />}
			LayoutNeedHeader={false}
		/>
	);
}

export default InstructionPage;
