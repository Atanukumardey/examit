import { Chat, ChatBubble } from '@mui/icons-material';
import { useState } from 'react';

const ExpandableComponent = ({ children }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div>
			<button onClick={toggleExpand} style={styles.button}>
				{isExpanded ? (
					<Chat sx={{ fontSize: 40 }} />
				) : (
					<ChatBubble sx={{ fontSize: 40 }} />
				)}
			</button>
			<div
				style={
					isExpanded
						? styles.expandedContainer
						: styles.closeContainer
				}
			>
				{children}
			</div>
		</div>
	);
};

const styles = {
	button: {
		position: 'fixed',
		bottom: '20px',
		right: '20px',
		borderRadius: '50%',
		width: '65px',
		height: '65px',
		background: '#007bff',
		color: '#fff',
		border: 'none',
		boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
		cursor: 'pointer',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: '999',
		animation: 'fadeChatApp 0.6s ease-in-out',
		animationFillMode: 'backwards',
	},
	expandedContainer: {
		position: 'fixed',
		bottom: '90px',
		right: '20px',
		width: 'auto',
		background: '#fff',
		borderRadius: '10px',
		boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
		zIndex: '999',
		animation: 'fadeChatApp 0.6s ease-in-out',
		animationFillMode: 'forwards',
	},
	closeContainer: {
		position: 'fixed',
		bottom: '90px',
		right: '20px',
		width: '0px',
		background: '#fff',
		borderRadius: '10px',
		boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
		zIndex: '999',
	},
	chatIcon: {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
		background: '#007bff',
		padding: '10px',
		margin: '10px',
	},
	content: {
		padding: '10px',
	},
	chatAppRoom: {
		display: 'flex',
		alignContent: 'flex-start',
		justifyContent: 'center',
		/* padding: '5rem 20rem', */
		paddingBottom: '3vh',
		animation: 'fadeChatApp 0.6s ease-in-out',
		animationFillMode: 'forwards',
	}
};

export default ExpandableComponent;
