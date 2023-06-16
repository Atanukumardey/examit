'use client';

import styled from 'styled-components';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { MDBSpinner } from 'mdb-react-ui-kit';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { GlobalStyle2 } from '../../globalStyles2';

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
		link: '/User/home',
		elementID: 'UserHome',
		menuName: 'Home',
		isButton: false,
		Buttontext: '',
	},
	{
		id: '2',
		link: '/User/profile',
		elementID: 'UserProfile',
		menuName: 'Profile',
		isButton: false,
		Buttontext: '',
	},
	{
		id: '3',
		link: '/User/help',
		elementID: 'UserHelp',
		menuName: 'Help',
		isButton: false,
		Buttontext: '',
	},
	{
		id: '4',
		link: '/',
		elementID: null,
		menuName: 'Logout',
		isButton: true,
		Buttontext: 'Logout',
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
				{/* <ContainerUser> */}
				{children}
				{/* </ContainerUser> */}
			</Suspense>
			{LayoutNeedHeader && <Footer />}
		</>
	);
}
