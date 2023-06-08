// 'use client';

// import DetectRTC from 'detectrtc';
// import { useEffect, useState } from 'react';
// import swal from 'sweetalert';
// import Examineelayout from '../Examineeayout';

// const NetworkSpeed = require('network-speed');
// const testNetworkSpeed = new NetworkSpeed();
// const detectRTC = require('detectrtc');

// const ContainerUser = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	/*justify-content: center;*/
// 	align-items: center;
// 	/* position: relative; */
// 	height: 100vh;
// `;

// function fullScreen(elem) {
// 	//  Check for browser compatibility
// 	const requestFullscreen =
// 		elem.requestFullscreen || // Standard API
// 		elem.mozRequestFullScreen || // Firefox
// 		elem.webkitRequestFullscreen || // Chrome, Safari and Opera
// 		elem.msRequestFullscreen; // Internet Explorer

// 	if (requestFullscreen) {
// 		requestFullscreen.call(elem);
// 	}
// }

// async function getCameraPermission() {
// 	navigator.getUserMedia =
// 		navigator.getUserMedia ||
// 		navigator.webkitGetUserMedia ||
// 		navigator.mozGetUserMedia;

// 	var video = document.querySelector('#videoElement');
// 	if (navigator.getUserMedia) {
// 		return await navigator.mediaDevices
// 			.getUserMedia({ video: true })
// 			.then(function (stream) {
// 				video.srcObject = stream;
// 				return true;
// 			})

// 			.catch(function (err0r) {
// 				//console.log("Something went wrong!");
// 				return false;
// 			});
// 	} else {
// 		return false;
// 	}
// }

// function systemCheckCallback(isAllowed) {}

// function validateSystemCheck() {
// 	let isAllowed = false;

// 	// Network Check
// 	var netSpeedVar = sessionStorage.getItem('netspeed');
// 	if (netSpeedVar > 2) {
// 		isAllowed = true;
// 	} else {
// 		swal('Low Internet Speed');
// 	}

// 	// Browser Check
// 	if (DetectRTC.browser.isChrome) {
// 		//.................................Chrome
// 		// If Browser is Chrome
// 		if (DetectRTC.browser.version > 80) {
// 			// If the Browser is updated
// 			isAllowed = true;
// 		} else {
// 			// If browser is not Updated
// 			swal('Please Update Browser or Try a Different Browser');
// 			isAllowed = false;
// 			return;
// 		}
// 	}
// 	if (DetectRTC.browser.isFirefox) {
// 		//.................................Firefox
// 		// If Browser is Chrome
// 		if (DetectRTC.browser.version > 60) {
// 			// If the Browser is updated
// 			isAllowed = true;
// 		} else {
// 			// If browser is not Updated
// 			swal('Please Update Browser or Try a Different Browser');
// 			isAllowed = false;
// 			return;
// 		}
// 	}
// 	if (DetectRTC.browser.isSafari) {
// 		//.................................Safari
// 		// If Browser is Chrome
// 		if (DetectRTC.browser.version > 12) {
// 			// If the Browser is updated
// 			isAllowed = true;
// 		} else {
// 			// If browser is not Updated
// 			swal('Please Update Browser or Try a Different Browser');
// 			isAllowed = false;
// 			return;
// 		}
// 	}
// 	if (DetectRTC.browser.isOpera) {
// 		//.................................Opera
// 		// If Browser is Chrome
// 		if (DetectRTC.browser.version > 60) {
// 			// If the Browser is updated
// 			isAllowed = true;
// 		} else {
// 			// If browser is not Updated
// 			swal('Please Update Browser or Try a Different Browser');
// 			isAllowed = false;
// 			return;
// 		}
// 	}
// 	if (DetectRTC.browser.isEdge) {
// 		//.................................Edge
// 		// If Browser is Chrome
// 		if (DetectRTC.browser.version > 80) {
// 			// If the Browser is updated
// 			isAllowed = true;
// 		} else {
// 			// If browser is not Updated
// 			swal('Please Update Browser or Try a Different Browser');
// 			isAllowed = false;
// 			return;
// 		}
// 	}

// 	DetectRTC.load(() => {
// 		const webcam = DetectRTC.isWebsiteHasWebcamPermissions;
// 		if (!webcam) {
// 			getCameraPermission().then((response) => {
// 				if (response == true) {
// 					systemCheckCallback(isAllowed);
// 				} else {
// 					isAllowed = false;
// 					swal(`Couldn't detect a camera`);
// 					return;
// 				}
// 			});
// 		} else {
// 			isAllowed = false;
// 			swal(`Couldn't detect a camera`);
// 			return;
// 		}
// 	});
// }

// function ExamineeSystemCheckPageBody() {
// 	const [elem, setElem] = useState(false);
// 	useEffect(() => {
// 		if (document) {
// 			setElem(document.documentElement); // Get the document element (HTML element)
// 		}
// 	}, []);

// 	async function getNetworkDownloadSpeed() {
// 		const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
// 		const fileSizeInBytes = 500000;
// 		const speed = await testNetworkSpeed.checkDownloadSpeed(
// 			baseUrl,
// 			fileSizeInBytes
// 		);
// 		return speed;
// 	}

// 	getNetworkDownloadSpeed().then((value) => {
// 		sessionStorage.setItem('netspeed', value['mbps']);
// 		// validateSystemCheck();
// 	});

// 	return (
// 		<ContainerUser>
// 			<MDBContainer fluid style={{ height: '75vh', width: 'auto' }}>
// 				<div className=' bg-white m-5 rounded-lg shadow-lg'>
// 					Hello World
// 				</div>
// 			</MDBContainer>
// 		</ContainerUser>
// 	);
// }

// export default function ExamineeSystemCheckPage() {
// 	return (
// 		<Examineelayout
// 			children={<ExamineeSystemCheckPageBody />}
// 			LayoutNeedHeader={false}
// 		/>
// 	);
// }



function testingPage() {
  return (
	<div>testingPage</div>
  )
}

export default testingPage