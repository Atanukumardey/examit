'use client';

import * as cocossd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
// import { drawRect } from "./utilities";



function DetectionWindow() {
	const absoulateFunctionFromTF = tf.Abs;
	const webcamRef = useRef(null);
	const canvasRef = useRef(null);

	// Main function
	const runCoco = async () => {
		const net = await cocossd.load();
		//  Loop and detect hands
		setInterval(() => {
			detect(net);
		}, 2000);
	};

	const detect = async (net) => {
		// Check data is available
		if (
			typeof webcamRef.current !== 'undefined' &&
			webcamRef.current !== null &&
			webcamRef.current.video.readyState === 4
		) {
			// Get Video Properties
			const video = webcamRef.current.video;
			const videoWidth = webcamRef.current.video.videoWidth;
			const videoHeight = webcamRef.current.video.videoHeight;

			// Set video width
			webcamRef.current.video.width = videoWidth;
			webcamRef.current.video.height = videoHeight;

			// Set canvas height and width
			canvasRef.current.width = videoWidth;
			canvasRef.current.height = videoHeight;

			// Make Detections
			const obj = await net.detect(video);

			// Draw mesh
			const ctx = canvasRef.current.getContext('2d');
			// drawRect(obj, ctx);
			obj.forEach(prediction => {
  
				// Extract boxes and classes
				const [x, y, width, height] = prediction['bbox']; 
				const text = prediction['class']; 
				console.log(prediction['class']);
				// Set styling
				const color = Math.floor(Math.random()*16777215).toString(16);
				ctx.strokeStyle = '#' + color
				ctx.font = '18px Arial';
			
				// Draw rectangles and text
				ctx.beginPath();   
				ctx.fillStyle = '#' + color
				ctx.fillText(text, x, y);
				ctx.rect(x, y, width, height); 
				ctx.stroke();
			  });
		}
	};

	useEffect(() => {
		runCoco();
	}, []);

	return (
		// <div className='flex flex-col justify-items-between bg-slate-200 h-screen p-20'>
		<div>

			<canvas
				ref={canvasRef}
				style={{
					position:'absolute',
					// textAlign: 'center',
					zindex: 2,
					width: 480,
					height: 320,
				}}
			/>
			
			<Webcam
				ref={webcamRef}
				muted={true}
				style={{
					// textAlign: 'center',
					zindex: 1,
					// position:'absolute',
					width: 480,
					height: 320,
				}}
			/>
		</div>
		// </div>
	);
}

function OptionCard(props) {
	return (
	  <MDBCard alignment='center' className="m-2 w-25">
		<MDBCardBody>
		{props.item}
		</MDBCardBody>
	  </MDBCard>
	);
  }

function ExamPage(){
	return (
		// <MDBContainer fluid className='h-screen'>
		//   <MDBRow>
		// 	<MDBCol size='md'>
		// 	  <DetectionWindow/>
		// 	</MDBCol>
		// 	<MDBCol size='md'>
		// 	  One of three columns
		// 	</MDBCol>
		//   </MDBRow>
		// </MDBContainer>
		<div className="d-flex flex-col mt-10 mb-3 align-middle justify-between flex-wrap h-screen" id="UserHome">
			<div className='d-flex flex-row ustify-between flex-wrap'>
			<DetectionWindow/>
			<div>
				<h1>Hrllo world</h1>
			</div>
			</div>
			{/* <OptionCard item = {DetectionWindow}/> */}
		</div>
	  );
	
}

export default ExamPage;
