'use client';

import { Button } from '@mui/material';
import { MDBContainer } from 'mdb-react-ui-kit';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Examineelayout from '../Examineeayout';
import warningImage from '/public/ImageAsset/warning.jpg';

const ContainerUser = styled.div`
	display: flex;
	flex-direction: column;
	/*justify-content: center;*/
	align-items: center;
	/* position: relative; */
	height: 100vh;
`;


function fullScreen(elem) {
	//  Check for browser compatibility
	const requestFullscreen =
		elem.requestFullscreen || // Standard API
		elem.mozRequestFullScreen || // Firefox
		elem.webkitRequestFullscreen || // Chrome, Safari and Opera
		elem.msRequestFullscreen; // Internet Explorer

	if (requestFullscreen) {
		requestFullscreen.call(elem);
	}
}


function getBackToExamPage(router, elem){
	fullScreen(elem);
	router.push('/Examinee/Exam');
}

function WarningPageBody() {
	const router = useRouter();
	const [elem, setElem] = useState(null);

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
			<MDBContainer
				fluid
				style={{ height: 'h-screen', width: 'w-screen' }}
			>
				<center className=' p-1 mb-2 mt-20 bg-inherit'>
					<div>
						<Image src={warningImage} width={640} height={480} />
					</div>
					<br />
					<h3>
						SINCE YOU ESCAPED FULLSCREEN, YOUR ANSWERS ARE LOST!!
					</h3>
					<br />
					<small>Action has been Recorded!</small>
					<br />
					<br />
					<p>
						<i>
							Another Atempt to do so will get you Debared from
							the Test
						</i>
					</p>

					<Button
						variant='contained'
						onClick={() => {
							getBackToExamPage(router, elem);
						}}
					>
						I Understand, get me back to Exam
					</Button>
				</center>
			</MDBContainer>
		</ContainerUser>
	);
}

function WarningPage() {
	return (
		<Examineelayout
			children={<WarningPageBody />}
			LayoutNeedHeader={false}
		/>
	);
}

export default WarningPage;
