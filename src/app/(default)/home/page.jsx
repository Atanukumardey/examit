'use client';
import styled from 'styled-components';

import About from '@/app/Sections/About';
import Contact from '@/app/Sections/Contact';
import HeroSection from '@/app/Sections/Hero';
import Services from '@/app/Sections/Services';
import Testimonials from '@/app/Sections/Testimonials';
import { GlobalStyle } from '@/app/globalStyles';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* position: relative; */
`;

const menus = [
	{
		id: '1',
		link: '#home',
		elementID: 'home',
		menuName: 'Home',
		isButton: false,
		Buttontext: '',
	},
	{
		id: '2',
		link: '#about',
		elementID: 'about',
		menuName: 'About',
		isButton: false,
		Buttontext: '',
	},
	{
		id: '3',
		link: '#services',
		elementID: 'services',
		menuName: 'Services',
		isButton: false,
		Buttontext: '',
	},
	{
		id: '4',
		link: '#contact',
		elementID: 'contact',
		menuName: 'Contact',
		isButton: true,
		Buttontext: 'Contact Us',
	},
];

function Home() {
	const router = useRouter();
	const isLoggedin = localStorage.getItem('ExamITUserInfo');
	if (isLoggedin != null) {
		sessionStorage.setItem('UserData', isLoggedin);
		router.push('/User/Home');
	}
	return (
		<Suspense fallback={<div> Loading..... </div>}>
			<GlobalStyle />
			<ScrollToTop />
			<Header menus={menus} />
			<Container>
				<HeroSection location={'/Examinee/Home'} />
				<About />
				<Services />
				<Testimonials />
				<Contact />
			</Container>
			<Footer />
		</Suspense>
	);
}

export default Home;
