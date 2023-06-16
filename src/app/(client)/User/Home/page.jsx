'use client';

// import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AttendExam from '/public/ImageAsset/EffectiveExam.svg';
import TrackExamImage from '/public/ImageAsset/TrackExam.svg';
import AttendExamPublic from '/public/ImageAsset/onlinetestconcept.jpg';
import TakeExamImage from '/public/ImageAsset/professor-concept-illustration.jpg';

import {
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardHeader,
	MDBCardTitle,
} from 'mdb-react-ui-kit';

import Image from 'next/image';

function HomeOptionCard(props) {
	return (
		<MDBCard alignment='center' className='m-2 w-25 h-5 shadow-lg '>
			<MDBCardHeader>
				<Image
					src={props.image}
					// width={100}
					// height={'auto'}
					alt='option Image'
					style={{
						width: '100%',
						height: 'auto',
					}}
				/>
			</MDBCardHeader>
			<MDBCardBody>
				<MDBCardTitle>{props.optionName}</MDBCardTitle>
				<MDBBtn
					style={{ backgroundColor: '#7b49e6' }}
					href={props.link}
				>
					{props.buttonText}
				</MDBBtn>
			</MDBCardBody>
		</MDBCard>
	);
}

export default function ExamineeHome() {
	//   userSignOut();
	return (
		<div className='flex flex-col'>
			<div
				className='d-flex flex-row mt-10 align-middle justify-center flex-wrap'
				id='UserHome'
			>
				<HomeOptionCard
					image={AttendExam}
					optionName={'Attend An Private Exam'}
					buttonText={'Start'}
					link={'/Examinee/ExamLink'}
				/>

				<HomeOptionCard
					image={AttendExamPublic}
					optionName={'View Public Exams'}
					buttonText={'View'}
					link={'/Examinee/AllExams'}
				/>
			</div>
			<div
				className='d-flex flex-row mb-20 align-middle justify-center flex-wrap'
				id='UserHome2'
			>
				<HomeOptionCard
					image={TakeExamImage}
					optionName={'Create An Exam'}
					buttonText={'Proceed'}
					link={'/Examiner/CreateExam'}
				/>
				<HomeOptionCard
					image={TrackExamImage}
					optionName={'View An Ongoing Exam'}
					buttonText={'View'}
					link={'/Examiner/ExamTrack'}
				/>
			</div>
		</div>
	);
}
