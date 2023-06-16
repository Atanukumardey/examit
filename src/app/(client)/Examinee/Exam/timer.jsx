import { useEffect, useState } from 'react';

export const Timer = ({
	start,
	duration,
	setFormLink,
	setExamtimeOver,
	router,
}) => {
	const [seconds, setSeconds] = useState(0);
	const [isActive, setIsActive] = useState(true);
	let sendNotification = true;
	let needTosetFlag = true;

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds(seconds + 1);
		}, 1000);

		return () => clearInterval(interval);
	});

	const getTimeLeft = () => {
		let time = new Date().getTime();
		if (start < time) {
			if (needTosetFlag) {
				needTosetFlag = false;
				setFormLink(true);
			}
			const difference = start + duration * 60 * 1000 - time;
			const minutes = Math.floor(difference / 60000);
			const seconds = Math.floor(Math.floor(difference % 60000) / 1000);

			if (minutes <= 0 && seconds <= 0) {
				setFormLink(false);
			}

			if (minutes == 1 && seconds == 0 && sendNotification) {
				swal(
					`Only 1 Minute Left, Please Submit or else Answers WON'T BE SAVED `
				);
				sendNotification = false;
			}
			if (minutes <= 0 && seconds <= 0) {
				return `Exam time is over`;
			}

			return `Time left to Finish the Exam: ${minutes} minutes ${seconds} seconds`;
		} else {
			const difference = start - time;
			const days = Math.floor(difference / (24 * 60 * 60 * 1000));
			const hours = Math.floor(
				(difference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
			);
			const minutes = Math.floor(
				(difference % (60 * 60 * 1000)) / (60 * 1000)
			);
			const seconds = Math.floor((difference % (60 * 1000)) / 1000);
			return `Time left to start: ${days}days ${hours}hours ${minutes}minutes ${seconds}seconds`;
		}
	};

	return (
		<div className='shadow-lg p-1 ms-2 mt-1 mb-2 bg-transparent border-2 border-primary rounded-2 fs-6 font-bold'>
			<h1>{getTimeLeft()}</h1>
		</div>
	);
};
