'use client';

import { Button, Container, TableCell, TableRow } from '@mui/material';
import { MDBContainer } from 'mdb-react-ui-kit';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import Examineelayout from '../Examineeayout';



function ExamineeCameraCheckPageBody() {
    
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

    
	const webcamRef = React.useRef(null);
	const [imgSrc, setImgSrc] = React.useState(null);
    const [proceedToNextPageButton, setProceedToNextPageButton] = useState(false);
    const router = useRouter();

    const [elem, setElem] = useState(false);

 

    function clickedNext(){
        fullScreen(elem);
        router.push('/Examinee/Validation');
    }

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImgSrc(imageSrc);
        setProceedToNextPageButton(true);
		sessionStorage.setItem('ExamineeImageSrc', imageSrc);
	}, [webcamRef, setImgSrc]);

	useEffect(() => {
		if (document) {
			setElem(document.documentElement); // Get the document element (HTML element)
		}
	}, []);

    if (document.addEventListener) {
		document.addEventListener(
			'contextmenu',
			function (e) {
				e.preventDefault();
			},
			false
		);
	}
    
	return (
		<MDBContainer
			fluid
			style={{
				height: '90%',
				width: 'auto',
				background: '',
			}}
		>
			<center>
				{/* <div className='shadow-lg w-25 p-1 mt-5 mb-5 bg-body rounded'> */}
				<div className='shadow-lg p-0 mt-2 w-auto rounded'>
					<h1 className='fs-2'>Instructions to Follow</h1>
					<p className='fs-5'>
						The lighting in the room must be bright enough to be
						considered “daylight” quality. Overhead lighting is
						preferred.
					</p>
				</div>
				<Container fluid>
					<TableRow>
						<TableCell
							sm={6}
							style={{ paddingLeft: 0, paddingRight: 0 }}
						>
							<Webcam
								className='shadow-lg p-1 mt-2 mb-2 bg-transparent border-2 border-primary rounded-4'
								audio={false}
								ref={webcamRef}
								width={480}
								height={320}
								screenshotFormat='image/jpeg'
							/>
						</TableCell>
						<TableCell sm={6}>
							{imgSrc && (
								<img
									className='shadow-lg p-1 mt-2 mb-2 bg-transparent border-2 border-primary rounded-4'
									src={imgSrc}
								/>
							)}
						</TableCell>
					</TableRow>
				</Container>
				{/* </div> */}
				<div>
					<Button
						id='validateButtons'
						variant='contained'
						onClick={capture}
					>
						Capture Photo
					</Button>
				</div>
				<div>
					{proceedToNextPageButton ? (
						<Button  className='mt-2' variant='contained'  color='success' onClick={clickedNext}>
							Next
						</Button>
					) : (
						<Button className='mt-2' variant='contained' color='success' disabled>
							Next
						</Button>
					)}
				</div>
			</center>
		</MDBContainer>
	);
}

function ExamineeCameraCheck() {
	return (
		<Examineelayout
			children={<ExamineeCameraCheckPageBody />}
			LayoutNeedHeader={true}
		/>
	);
}

export default ExamineeCameraCheck;
