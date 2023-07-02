'use client';
//import "@fortawesome/fontawesome-free/css/all.min.css";

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

//import '../../globals.css';

// import Gmail from "/public/landingpage/envelope-open-solid.svg";
// import Instagram from "/public/landingpage/instagram-square-brands.svg";

import 'react-phone-number-input/style.css';

import { MDBContainer } from 'mdb-react-ui-kit';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';

const ContainerUser = styled.div`
	display: flex;
	flex-direction: column;
	/*justify-content: center;*/
	align-items: center;
	/* position: relative; */
	height: 100vh;
`;

export default function Profile() {
	let UserData = JSON.parse(sessionStorage.getItem('UserData'));
	const router = useRouter();
	return (
		<MDBContainer
			fluid
			className='flex flex-col justify-between w-full space-y-4 align pt-10 pb-10 min-h-[600px]'
			style={{ height: 'auto', width: 'auto' }}
		>
			<center>
				<iframe
					width='640'
					height='420'
					src='https://www.youtube.com/embed/ukLnPbIffxE'
				></iframe>
			</center>

			<center>
				<iframe
					width='640'
					height='380'
					src='https://www.youtube.com/embed/SvkwnADcLP8'
				></iframe>
			</center>
		</MDBContainer>
	);
}

const styles = {
	imageContainer: {
		width: '200px',
		height: '200px',
		borderRadius: '50%',
		overflow: 'hidden',
		margin: '10px',
	},
	image: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
};
