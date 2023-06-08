import Examineelayout from '../Examineeayout';

function WarningPageBody() {
	return <div>WarningPageBody</div>;
}

function WarningPage() {
	return (
		<Examineelayout
			children={<WarningPageBody />}
			LayoutNeedHeader={true}
		/>
	);
}

export default WarningPage;
