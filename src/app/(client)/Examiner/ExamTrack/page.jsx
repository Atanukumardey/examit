'use client';

import Map from '@/components/Map';
import styles from './Home.module.scss';
import MapDataHandler from './MapDataHandler';

async function page() {
	const DEFAULT_CENTER = [23.729211164246585, 90.40874895549243];
	// const[data, setData] = userState({})
	const data = await MapDataHandler();
	console.log(data);
	// useEffect(() => {
	// 	setData(props.data);
	// }, []);
	return (
		<div className='p-5'>
			<Map
				className={styles.homeMap}
				width='800'
				height='400'
				center={DEFAULT_CENTER}
				zoom={4}
			>
				{({ TileLayer, Marker, Popup }) => (
					<>
						<TileLayer
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
							attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
						/>

						{data?.map((item, idx) =>
							item.location_coordinates.map((pos, id) => (
								
								<Marker
									position={[pos.lat, pos.long]}
									key={`project_${idx}_marker_${id + 1}`}
								>
									{console.log(pos.lat)}
									<Popup className='w-[400px]'>
										<div className='w-full space-y-2'>
											<div className='w-full flex justify-center items-center font-bold text-lg'>
												Student Details
											</div>
											<div className='font-bold text-md w-full flex flex-row'>
												<div className='w-4/12'>
													Student Name:
												</div>
												<div className='w-9/12'>
													{item.student_name}
												</div>
											</div>

											<div className='font-bold text-md w-full flex flex-row'>
												<div className='w-3/12'>
													Student Id:
												</div>
												<div className='w-9/12'>
													{item.student_id}
												</div>
											</div>

											<div className='font-bold text-md w-full flex flex-row'>
												<div className='w-3/12'>
													Institution:
												</div>
												<div className='w-9/12'>
													{item.Institution}
												</div>
											</div>
										</div>
									</Popup>
								</Marker>
							))
						)}
						{/* <Marker position={DEFAULT_CENTER}>
							<Popup>
								A pretty CSS3 popup. <br /> Easily customizable.
							</Popup>
						</Marker> */}
					</>
				)}
			</Map>
		</div>
	);
}

export default page;
