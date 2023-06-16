const TimeLeftToStartExam = () => {
	//Disable Right click
	if (document.addEventListener) {
		document.addEventListener(
			'contextmenu',
			function (e) {
				e.preventDefault();
			},
			false
		);
	}

	return (
		<div>
			<center>
				<h3>Exam Has not Started Yet</h3>
			</center>
		</div>
	);
};

export default TimeLeftToStartExam;
