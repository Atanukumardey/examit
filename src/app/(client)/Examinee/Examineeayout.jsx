'use client';

import styled from 'styled-components';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { MDBSpinner } from 'mdb-react-ui-kit';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { GlobalStyle2 } from '../../globalStyles2';

// import pageBackgroundImage from '/public/ImageAsset/science-doodle-pattern2_blur.jpg';
// import pageBackgroundImage from '/public/ImageAsset/BackgepundImage2.jpg';
import { userSignOut } from '@/server/firebase/Authentication';
import pageBackgroundImage from '/public/ImageAsset/seamless-pattern-doodles-business-theme_2.jpg';


// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// position: relative;
// padding: 0.75rem;

const ContainerUser = styled.div`
	background-image: url(${pageBackgroundImage.src});
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	text-color: white;
`;

const loadingContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	background: rgba(0, 0, 0, 0.834);
	z-index: 1;
`;

const menus = [
	{
		id: '1',
		link: '/User/Home',
		elementID: null,
		menuName: 'Home',
		isButton: false,
		Buttontext: '',
	},
	{
		id: '2',
		link: '/User/Profile',
		elementID: null,
		menuName: 'Profile',
		isButton: false,
		Buttontext: '',
	},
	{
		id: '3',
		link: '/User/Help',
		elementID: null,
		menuName: 'Help',
		isButton: false,
		Buttontext: '',
	},
	{
		id: '4',
		link: '/Authentication/logout',
		elementID: null,
		menuName: 'Logout',
		isButton: true,
		Buttontext: 'Logout',
		ButtonClick: userSignOut
	},
];

// const [clientLayoutNeedHeader,setClientLayoutNeedHeader] = useState(true);
export default function Examineelayout({ children, LayoutNeedHeader }) {
	// console.log(LayoutNeedHeader);
	const router = useRouter();
	const layoutuserData = JSON.parse(sessionStorage.getItem('UserData'));

	if (layoutuserData == null || !layoutuserData.userName) {
		router.push('/Authentication');
	}
	return (
		<>
			{<GlobalStyle2 />}
			{/* <ScrollToTop /> */}

			{LayoutNeedHeader && <Header menus={menus} />}
			<Suspense
				fallback={
					<div className=' w-screen h-screen flex flex-col justify-center align-middle'>
						<MDBSpinner
							className=''
							style={{ width: '3rem', height: '3rem' }}
							role='status'
						>
							{/* <span>Loading...</span> */}
						</MDBSpinner>
					</div>
				}
			>
				<ContainerUser>
				
				{children}
				</ContainerUser>
			</Suspense>
			{LayoutNeedHeader && <Footer />}
		</>
	);
}
