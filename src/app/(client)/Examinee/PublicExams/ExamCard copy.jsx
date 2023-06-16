import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import { Comment, ThumbUp } from '@mui/icons-material';
import { Button, Rating } from '@mui/material';
import exampleImage from '/public/ImageAsset/ExamItLogo.png';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default function PublicExamCard() {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
						R
					</Avatar>
				}
				action={
					<IconButton aria-label='settings'>
						<MoreVertIcon />
					</IconButton>
				}
				title='Shrimp and Chorizo Paella'
				subheader='September 14, 2016'
			/>
			<CardMedia
				component='img'
				height='194'
				image={exampleImage.src}
				alt='Paella dish'
			/>
			<CardContent>
				<Typography variant='body2' color='text.secondary'>
					This impressive paella is a perfect party dish and a fun
					meal to cook together with your guests. Add 1 cup of frozen
					peas along with the mussels, if you like.
				</Typography>
				<Rating
					name='simple-controlled'
					// value={value}
					// onChange={(event, newValue) => {
					// 	setValue(newValue);
					// }}
				/>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label='add to favorites'>
					<ThumbUp />
				</IconButton>
				<IconButton aria-label='share'>
					<Comment />
				</IconButton>
				<Button size='small' color='primary'>
					Attend The Exam
				</Button>
			</CardActions>
		</Card>
	);
}
