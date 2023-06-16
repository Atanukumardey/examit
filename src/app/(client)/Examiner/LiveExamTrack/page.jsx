'use client';

import ExpandableComponent from '@/components/Expandable';
import Map from '@/components/Map';
import { getExamStatusBy } from '@/server/firebase/ExamStatus';
import { useEffect, useState } from 'react';
import ChatWindow from '../../chatwindow';
import ExamTrackTable from './DataTable';
import styles from './Home.module.scss';

let ExamineeExamStatus = {
	ExamID: '',
	userName: '',
	Name: '',
	ExitFullScreen: 0,
	TabChange: 0,
	NoOfTimeLookeOut: 0,
	LeftPlace: 0,
	OtherPerson: 0,
	CellPhoneDetected: 0,
	LaptopDetected: 0,
	Bookdetected: 0,
	Latitude: 0.0,
	Longitude: 0.0,
	FinishedExam: false,
	Rating: true,
	Like: true,
};

function MapComponent(props) {
	const DEFAULT_CENTER = [23.729211164246585, 90.40874895549243];
	const examStatusData = props.examStatusData;
	// console.log(examStatusData);
	return (
		<Map
			// className={styles.homeMap}
			className='shadow-lg bg-transparent border-2 border-primary rounded-4'
			width='800'
			height='600'
			center={DEFAULT_CENTER}
			zoom={4}
		>
			{({ TileLayer, Marker, Popup }) => (
				<>
					<TileLayer
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
					{examStatusData.map((details, idx) => (
						<Marker
							position={[
								Number.parseFloat(details.Latitude),
								Number.parseFloat(details.Longitude),
							]}
							key={`project_${idx}_marker_${idx + 1}`}
						>
							<Popup className='w-[500px]'>
								<div className='w-full space-y-2'>
									<div className='w-full flex justify-center items-center font-bold text-lg'>
										Examinee Details
									</div>
									<div className='font-bold text-md w-full flex flex-row'>
										<div className='w-auto'>
											Examinee Name:{' '}
										</div>
										<div className='w-auto'>
											{details.Name}
										</div>
									</div>

									<div className='font-bold text-md w-full flex flex-row'>
										<div className='w-auto'>
											Finished Exam:
										</div>
										<div className='w-auto'>
											{details.FinishedExam
												? ' YES'
												: ' NO'}
										</div>
									</div>

									<div className='font-bold text-md w-full flex flex-row'>
										<div className='auto'>
											Number of Times Looked Out:{' '}
										</div>
										<div className='auto'>
											{details.NoOfTimeLookedOut}
										</div>
									</div>

									<div className='font-bold text-md w-full flex flex-row'>
										<div className='auto'>
											Other Person Detected:{' '}
										</div>
										<div className='auto'>
											{details.OtherPerson}
										</div>
									</div>

									<div className='font-bold text-md w-full flex flex-row'>
										<div className='auto'>
											Exited The Exam Window:{' '}
										</div>
										<div className='auto'>
											{details.ExitFullScreen}
										</div>
									</div>
								</div>
							</Popup>
						</Marker>
					))}
				</>
			)}
		</Map>
	);
}

function ExamTrack() {
	const [item, setItem] = useState(1);
	const DEFAULT_CENTER = [23.729211164246585, 90.40874895549243];
	const [examStatusData, setExamStatusData] = useState([]);

	const userCurrentExamData = JSON.parse(
		sessionStorage.getItem('UserCurrentExamData')
	);
	function getExamStatusDataCallback(examStatus) {
		return 0;
	}

	let input = {
		field: 'ExamID',
		value: userCurrentExamData.ExamID,
	};

	// const examStatusData = await getExamStatusBy(input);

	useEffect(() => {
		getExamStatusBy(input)
			.then((examStatusFromDB) => {
				console.log(examStatusFromDB);
				setExamStatusData(examStatusFromDB);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div
			// className='pt-4 space-y-4 flex flex-col justify-center w-full items-center'
			className={styles.mainContainer}
		>
			<div className='w-full mb-3'>
				<center>
					<div>
						<h1 className='fs-4'>{userCurrentExamData.ExamName}</h1>
					</div>
					<h3>Organizer:{userCurrentExamData.ExamOrganizer}</h3>
				</center>
			</div>
			<div className='flex w-72 justify-center rounded space-x-2 bg-slate-300 py-2 mb-2'>
				<button
					onClick={() => setItem(1)}
					className='w-24 bg-gray-700 text-white rounded px-2 py-1'
				>
					Map
				</button>
				<button
					onClick={() => setItem(2)}
					className='w-24 bg-gray-700 text-white rounded px-2 py-1'
				>
					Data Table
				</button>
			</div>
			<div className='w-full min-h-[600px] flex justify-center'>
				{item === 1 ? (
					<MapComponent examStatusData={examStatusData} />
				) : (
					<ExamTrackTable examStatusData={examStatusData} />
				)}
			</div>
			<ExpandableComponent>
				<ChatWindow />
			</ExpandableComponent>
		</div>
	);
}

export default ExamTrack;
