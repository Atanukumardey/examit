'use client';

import { Send } from '@mui/icons-material';
import { Box, Button, LinearProgress } from '@mui/material';
import DetectRTC from 'detectrtc';
import { MDBContainer } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import NetworkSpeedCheck from 'network-speed';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import swal from 'sweetalert';
import Examineelayout from '../Examineeayout';
import icon from '/public/ImageAsset/icon.png';

// const NetworkSpeed = require('network-speed');
// const testNetworkSpeed = new NetworkSpeed();
const detectRTC = require('detectrtc');

const ContainerUser = styled.div`
	display: flex;
	flex-direction: column;
	/*justify-content: center;*/
	align-items: center;
	/* position: relative; */
	height: 100vh;
`;

var proceedButtonVisible = false;

function getLocation() {
	var geolocation = navigator.geolocation;
	var options = {
		enableHighAccuracy: true,
		timeout: 50000,
	};

	geolocation.getCurrentPosition(
		function (position) {
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;
			var accuracy = position.coords.accuracy;

			sessionStorage.setItem('ExamineeLatitude', latitude);
			sessionStorage.setItem('ExamineeLongitude', longitude);
		},
		function (error) {
			console.log(error);
		},
		options
	);
}

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

function goToCameraCheckPage(router) {
	router.push('/Examinee/CameraCheck');
}

async function getNetworkDownloadSpeed() {
	const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
	const fileSizeInBytes = 500000;
	return await NetworkSpeedCheck.checkDownloadSpeed(baseUrl, fileSizeInBytes)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			swal(err.message);
		});
}

function validateSystemCheck(netSpeed, setProceedButtonVisible) {
	let isAllowed = false;
	// Network Check
	// var netSpeedVar = sessionStorage.getItem('netspeed');

	if (netSpeed > 0) {
		isAllowed = true;
	} else {
		swal('Low Internet Speed');
	}

	// Browser Check
	if (DetectRTC.browser.isChrome) {
		//.................................Chrome
		// If Browser is Chrome
		if (DetectRTC.browser.version > 80) {
			// If the Browser is updated
			isAllowed = true;
		} else {
			// If browser is not Updated
			swal('Please Update Browser or Try a Different Browser');
			isAllowed = false;
			return;
		}
	}
	if (DetectRTC.browser.isFirefox) {
		//.................................Firefox
		// If Browser is Chrome
		if (DetectRTC.browser.version > 60) {
			// If the Browser is updated
			isAllowed = true;
		} else {
			// If browser is not Updated
			swal('Please Update Browser or Try a Different Browser');
			isAllowed = false;
			return;
		}
	}
	if (DetectRTC.browser.isSafari) {
		//.................................Safari
		// If Browser is Chrome
		if (DetectRTC.browser.version > 12) {
			// If the Browser is updated
			isAllowed = true;
		} else {
			// If browser is not Updated
			swal('Please Update Browser or Try a Different Browser');
			isAllowed = false;
			return;
		}
	}
	if (DetectRTC.browser.isOpera) {
		//.................................Opera
		// If Browser is Chrome
		if (DetectRTC.browser.version > 60) {
			// If the Browser is updated
			isAllowed = true;
		} else {
			// If browser is not Updated
			swal('Please Update Browser or Try a Different Browser');
			isAllowed = false;
			return;
		}
	}
	if (DetectRTC.browser.isEdge) {
		//.................................Edge
		// If Browser is Chrome
		if (DetectRTC.browser.version > 80) {
			// If the Browser is updated
			isAllowed = true;
		} else {
			// If browser is not Updated
			swal('Please Update Browser or Try a Different Browser');
			isAllowed = false;
			return;
		}
	}

	DetectRTC.load(function () {
		const webcam = DetectRTC.isWebsiteHasWebcamPermissions;
		if (!webcam) {
			navigator.getUserMedia =
				navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia;

			var video = document.querySelector('#videoElement');
			if (navigator.getUserMedia) {
				navigator.mediaDevices
					.getUserMedia({ video: true })
					.then(function (stream) {
						video.srcObject = stream;
					})

					.catch(function (err0r) {
						//console.log("Something went wrong!");
					});
			}
		}
	});

	const webcam = DetectRTC.isWebsiteHasWebcamPermissions;
	//console.log(webcam);
	if (webcam) {
		isAllowed = true;
	} else {
		isAllowed = false;
	}

	// Final Approval
	if (isAllowed) {
		setProceedButtonVisible(true);
	} else {
		setProceedButtonVisible(false);
	}
}

function gotoInstructionPage(elem, router, setshowSpineer) {
	fullScreen(elem);
	setshowSpineer(true);
	router.push('/Examinee/Instruction');
}

function ExamineeSystemCheckPageBody() {
	const [elem, setElem] = useState(false);
	const [cameraPermission, setCameraPermission] = useState(null);
	const [netSpeed, setNetSpeed] = useState(null);
	const router = useRouter();
	const [proceedButtonVisible, setProceedButtonVisible] = useState(false);
	const [showSpineer, setshowSpineer] = useState(false);

	useEffect(() => {
		if (document) {
			setElem(document.documentElement); // Get the document element (HTML element)
		}
		validateSystemCheck(netSpeed, setProceedButtonVisible);
		getLocation();
	}, [netSpeed, setCameraPermission, netSpeed]);

	getNetworkDownloadSpeed()
		.then((value) => {
			sessionStorage.setItem('netspeed', value['mbps']);
			setNetSpeed(value['mbps']);
		})
		.catch((err) => {
			swal('Encountered some network Error');
		});

	return (
		<ContainerUser>
			<MDBContainer fluid style={{ height: 'h-screen', width: 'auto' }}>
				<div className=' bg-white m-5 rounded-2xl shadow-2xl'>
					{showSpineer ? (
						<p className=' pt-3 font-bold fs-4' align='center'>
							Wait we are getting everything ready
						</p>
					) : (
						<p className=' pt-3 font-bold fs-4' align='center'>
							System Compatibility Check
						</p>
					)}
					<div className=' items-center'>
						{showSpineer && (
							<Box sx={{ width: '100%' }}>
								<LinearProgress />
							</Box>
						)}
						<table className='fs-5' align='center'>
							<tbody>
								<tr>
									<td className='text-center'>
										<div>
											<Image
												width={480}
												height={320}
												src={icon}
												id='classIcon'
											/>
										</div>
									</td>
									<td>
										<ul>
											<li>
												<span>
													<b>OS:</b>
													{'- ' +
														JSON.stringify(
															DetectRTC.osName,
															null,
															2
														).slice(1, -1) +
														' ' +
														JSON.stringify(
															DetectRTC.osVersion,
															null,
															0
														).slice(1, -1)}
												</span>
											</li>
											<li>
												<span>
													<b>Browser:</b>
													{'- ' +
														JSON.stringify(
															DetectRTC.browser
																.name
														).slice(1, -1) +
														' ' +
														JSON.stringify(
															DetectRTC.browser
																.version
														)}
												</span>
											</li>
											<li>
												<span>
													<b>Internet Speed:</b>
													{'- ' + netSpeed + ' mbps'}
												</span>
											</li>
											<li>
												<span>
													<b>Webcam:</b>
													{'- ' +
														JSON.stringify(
															DetectRTC.isWebsiteHasWebcamPermissions
														)}
												</span>
											</li>
										</ul>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<center>
						<Button
							className='mb-3 bg-violet-800'
							variant='contained'
							onClick={() => {
								goToCameraCheckPage(router);
							}}
						>
							Activate Your WebCam and Network Check
						</Button>
					</center>
					<center>
						{!proceedButtonVisible ? (
							<Button
								className='mb-3 bg-blue-700'
								size='large'
								variant='contained'
								disabled
							>
								Next
							</Button>
						) : (
							<Button
								className='mb-3 bg-blue-700'
								size='large'
								variant='contained'
								endIcon={<Send />}
								onClick={() => {
									gotoInstructionPage(
										elem,
										router,
										setshowSpineer
									);
								}}
							>
								Next
							</Button>
						)}
					</center>
				</div>
			</MDBContainer>
		</ContainerUser>
	);
}

export default function ExamineeSystemCheckPage() {
	return (
		<Examineelayout
			children={<ExamineeSystemCheckPageBody />}
			LayoutNeedHeader={false}
		/>
	);
}
