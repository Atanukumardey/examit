'use client';

import { Box } from '@mui/material';
import {
	DataGrid,
	GridToolbar,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
export default function ExamTrackTable(props) {
	// const [examStatusData, setExamStatusData] = useState([]);
	const examStatusData = props.examStatusData;

	function getExamStatusDataCallback(examStatus) {
		return 0;
	}

	let input = {
		field: 'ExamID',
		value: 'lirfquhz',
	};

	// const examStatusData = await getExamStatusBy(input);

	// useEffect(() => {
	// 	getExamStatusBy(input).then((examStatusFromDB) => {
	// 		console.log(examStatusFromDB);
	// 		setExamStatusData(examStatusFromDB);
	// 	});
	// }, []);

	const columns = [
		{
			field: 'Name',
			headerName: 'Examinee Name',
			width: 200,
		},
		{
			field: 'TabChange',
			headerName: 'No of Tab Change',
			width: 180,
			editable: false,
		},
		{
			field: 'ExitFullScreen',
			headerName: 'Exited full Screen',
			width: 180,
		},
		{
			field: 'NoOfTimeLookedOut',
			headerName: 'Looked outside of screen',
			width: 180,
		},
		{
			field: 'LeftPlace',
			headerName: 'Left Place',
			type: 'string',
			width: 150,
		},
		{
			field: 'OtherPerson',
			headerName: 'Multiple Person Detected',
			width: 200,
		},
		{
			field: 'CellPhoneDetected',
			headerName: 'Cell Phone Detected',
			width: 200,
		},
		{
			field: 'LaptopDetected',
			headerName: 'Laptop Detected',
			width: 180,
		},
		{
			field: 'BookDetected',
			headerName: 'Book Detected',
			width: 150,
		},
		{
			field: 'FinishedExam',
			headerName: 'Finished Exam',
			width: 150,
			valueGetter: (x) => (x == true ? 'Yes' : 'No'),
		},
		// {
		// 	field: 'dob',
		// 	headerName: 'জন্ম তারিখ',
		// 	width: 110,
		// 	valueGetter: (x) => dayjs.unix(x.value).format('DD/MM/YYYY'),
		// },
		// {
		// 	field: 'courseName',
		// 	headerName: 'প্রশিক্ষন কোর্সের নাম',
		// 	width: 200,
		// 	valueGetter: (data) =>
		// 		data.row.Course ? data.row.Course.courseName : '',
		// },
		// {
		// 	field: 'startDate',
		// 	headerName: 'তারিখ',
		// 	width: 100,
		// 	valueGetter: (data) =>
		// 		data.row.Course
		// 			? dayjs(parseInt(data.row.Course.startDate)).format(
		// 					'DD/MM/YYYY'
		// 			  )
		// 			: '',
		// },
		// {
		// 	field: 'endDate',
		// 	headerName: 'মেয়াদ',
		// 	width: 100,
		// 	valueGetter: (data) =>
		// 		data.row.Course
		// 			? dayjs(parseInt(data.row.Course.endDate)).format(
		// 					'DD/MM/YYYY'
		// 			  )
		// 			: '',
		// },
		// {
		// 	field: 'action',
		// 	headerName: 'Action',
		// 	width: 70,
		// 	renderCell: (data) => {
		// 		return (
		// 			<>
		// 				<div className='w-full items-center justify-center flex'>
		// 					<Tooltip title='Edit training data' placement='top'>
		// 						<IconButton
		// 							onClick={() => {
		// 								dispatch(
		// 									updateCourseInfoModalToggle({
		// 										data: data.row,
		// 									})
		// 								);
		// 							}}
		// 						>
		// 							<EditIcon className='text-green-700' />
		// 						</IconButton>
		// 					</Tooltip>
		// 				</div>
		// 			</>
		// 		);
		// 	},
		// },
	];

	// const columnGroupingModel = [
	// 	{
	// 		groupId: 'courseInfo',
	// 		headerName: 'প্রশিক্ষন গ্রহনের তথ্যাবলী',
	// 		description: '',
	// 		children: [
	// 			{ field: 'courseName' },
	// 			{ field: 'startDate' },
	// 			{ field: 'endDate' },
	// 		],
	// 	},
	// ];

	const CustomToolbar = () => {
		return (
			<GridToolbarContainer className='flex space-x-4'>
				<GridToolbarColumnsButton className='font-bold' />
				<GridToolbarFilterButton className='font-bold' />
				<GridToolbarDensitySelector className='font-bold' />
				<GridToolbarExport
					className='font-bold'
					printOptions={{ disableToolbarButton: true }}
				/>
			</GridToolbarContainer>
		);
	};

	return (
		<Box sx={{ width: '80%' }}>
			<DataGrid
				initialState={{
					pagination: { paginationModel: { pageSize: 5 } },
				}}
				pageSizeOptions={[5, 10, 25]}
				rows={examStatusData}
				columns={columns}
				checkboxSelection
				autoHeight
				disableSelectionOnClick
				slots={{ toolbar: GridToolbar }}
				slotProps={{
					toolbar: {
						showQuickFilter: true,
						quickFilterProps: { debounceMs: 500 },
					},
				}}
			/>
		</Box>
	);
}
