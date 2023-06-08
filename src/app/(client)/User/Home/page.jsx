'use client';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AttendExam from '/public/ImageAsset/EffectiveExam.svg';
import TakeExamImage from '/public/ImageAsset/TakeExam.svg';
import TrackExamImage from '/public/ImageAsset/TrackExam.svg';

import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardHeader,
	MDBCardTitle,
} from 'mdb-react-ui-kit';

import { userSignOut } from '@/server/firebase/Authentication';
import Image from 'next/image';

function HomeOptionCard(props) {
	return (
		<MDBCard alignment='center' className=' m-3 w-25 h-10'>
			<MDBCardHeader>
				<Image
					src={props.image}
					// width={100}
					// height={'auto'}
					alt='option Image'
					style={{
						width:"100%",
						height:"auto"
					}}
				/>
			</MDBCardHeader>
			<MDBCardBody>
				<MDBCardTitle>{props.optionName}</MDBCardTitle>
				<MDBBtn style={{ backgroundColor: '#7b49e6' }} href={props.link}>
					{props.buttonText}
				</MDBBtn>
			</MDBCardBody>
		</MDBCard>
	);
}

function ExamineeHome() {
  userSignOut();
	return (
		<div
			className='d-flex flex-row mt-20 mb-20 align-middle justify-between flex-wrap'
			id='UserHome'
		>
			<HomeOptionCard
				image={TakeExamImage}
				optionName={'Create An Exam'}
				buttonText={'Proceed'}
				link = {'/Examiner/CreateExam'}
			/>
			<HomeOptionCard
				image={AttendExam}
				optionName={'Attend An Exam'}
				buttonText={'Start'}
				link = {'/Examinee/ExamLink'}
			/>
			<HomeOptionCard
				image={TrackExamImage}
				optionName={'Track An Ongoing Exam'}
				buttonText={'View'}
				link = {'/Examiner/ExamTrack'}
			/>
		</div>
	);
}

export default ExamineeHome;
