'use client';
//import "@fortawesome/fontawesome-free/css/all.min.css";
import { MDBContainer } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Logout() {
	const router = useRouter();
    sessionStorage.setItem("Logout", "true");
	useEffect(() => {
		// userSignOut();
		setTimeout(() => {
			router.push('/');
		}, 500);
	});
	return (
		<MDBContainer
			fluid
			style={{ height: '75vh', width: 'auto' }}
		></MDBContainer>
	);
}
