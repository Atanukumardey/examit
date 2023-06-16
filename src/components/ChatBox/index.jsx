/* detect url in a message and add a link tag */
import { Send } from '@mui/icons-material';
import React from 'react';
import './chatboxdesign.css';

function detectURL(message) {
	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
	return message.replace(urlRegex, function (urlMatch) {
		return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
	});
}

/* ========== */
/* Title component */
class Title extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className={'chatApp__convTitle'}>
				{this.props.chatBoxName}
			</div>
		);
	}
}
/* end Title component */
/* ========== */

/* ========== */
/* InputMessage component - used to type the message */
class InputMessage extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleSendMessage = this.handleSendMessage.bind(this);
		this.handleTyping = this.handleTyping.bind(this);
	}
	handleSendMessage(event) {
		event.preventDefault();
		/* Disable sendMessage if the message is empty */
		if (this.messageInput.value.length > 0) {
			this.props.sendMessageLoading(
				this.ownerInput.value,
				this.ownerAvatarInput.value,
				this.messageInput.value
			);
			/* Reset input after send*/
			this.messageInput.value = '';
		}
	}
	handleTyping(event) {
		/* Tell users when another user has at least started to write */
		if (this.messageInput.value.length > 0) {
			this.props.typing(this.ownerInput.value);
		} else {
			/* When there is no more character, the user no longer writes */
			this.props.resetTyping(this.ownerInput.value);
		}
	}
	render() {
		/* If the chatbox state is loading, loading class for display */
		var loadingClass = this.props.isLoading
			? 'chatApp__convButton--loading'
			: '';
		let sendButtonIcon = <i className={'material-icons'}>send</i>;
		return (
			<form onSubmit={this.handleSendMessage}>
				<input
					type='hidden'
					ref={(owner) => (this.ownerInput = owner)}
					value={this.props.owner}
				/>
				<input
					type='hidden'
					ref={(ownerAvatar) => (this.ownerAvatarInput = ownerAvatar)}
					value={this.props.ownerAvatar}
				/>
				<input
					type='text'
					ref={(message) => (this.messageInput = message)}
					className={'chatApp__convInput'}
					placeholder='Text message'
					onKeyDown={this.handleTyping}
					onKeyUp={this.handleTyping}
					tabIndex='0'
				/>
				<div
					className={'chatApp__convButton ' + loadingClass}
					onClick={this.handleSendMessage}
				>
					<Send />
					{/* {sendButtonIcon} */}
				</div>
			</form>
		);
	}
}
/* end InputMessage component */
/* ========== */

/* ========== */
/* TypingIndicator component */
class TypingIndicator extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		let typersDisplay = '';
		let countTypers = 0;
		/* for each user writing messages in chatroom */
		for (var key in this.props.isTyping) {
			/* retrieve the name if it isn't the owner of the chatbox */
			if (key != this.props.owner && this.props.isTyping[key]) {
				typersDisplay += ', ' + key;
				countTypers++;
			}
		}
		/* formatting text */
		typersDisplay = typersDisplay.substr(1);
		typersDisplay += countTypers > 1 ? ' are ' : ' is ';
		/* if at least one other person writes */
		if (countTypers > 0) {
			return (
				<div className={'chatApp__convTyping'}>
					{typersDisplay} writing
					<span className={'chatApp__convTypingDot'}></span>
				</div>
			);
		}
		return <div className={'chatApp__convTyping'}></div>;
	}
}
/* end TypingIndicator component */
/* ========== */

/* ========== */
/* MessageList component - contains all messages */
class MessageList extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className={'chatApp__convTimeline'}>
				{this.props.messages
					.slice(0)
					.reverse()
					.map((messageItem) => (
						<MessageItem
							key={messageItem.id}
							owner={this.props.owner}
							sender={messageItem.sender}
							senderAvatar={messageItem.senderAvatar}
							message={messageItem.message}
						/>
					))}
			</div>
		);
	}
}
/* end MessageList component */
/* ========== */

/* ========== */
/* MessageItem component - composed of a message and the sender's avatar */
class MessageItem extends React.Component {
	render() {
		/* message position formatting - right if I'm the author */
		let messagePosition =
			this.props.owner == this.props.sender
				? 'chatApp__convMessageItem--right'
				: 'chatApp__convMessageItem--left';
		return (
			<div
				className={
					'chatApp__convMessageItem ' + messagePosition + ' clearfix'
				}
			>
				<img
					src={this.props.senderAvatar}
					alt={this.props.sender}
					className='chatApp__convMessageAvatar'
				/>
				{/* <div
					className='.chatApp__convMessageSenderName'
					dangerouslySetInnerHTML={{ __html: this.props.sender }}
				></div> */}
				<div
					className='chatApp__convMessageValue'
					dangerouslySetInnerHTML={{ __html: this.props.message }}
				></div>
			</div>
		);
	}
}
/* end MessageItem component */
/* ========== */

/* ========== */
/* ChatBox component - composed of Title, MessageList, TypingIndicator, InputMessage */
class ChatBox extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isLoading: false,
		};
		this.sendMessageLoading = this.sendMessageLoading.bind(this);
		var timeout = null;
	}
	/* catch the sendMessage signal and update the loading state then continues the sending instruction */
	sendMessageLoading(sender, senderAvatar, message) {
		this.setState({ isLoading: true });
		this.props.sendMessage(sender, senderAvatar, message);
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 400);
	}
	render() {
		return (
			<div className={'chatApp__conv'}>
				<Title chatBoxName={this.props.chatBoxName} />
				<MessageList
					owner={this.props.owner}
					messages={this.props.messages}
				/>
				<div className={'chatApp__convSendMessage clearfix'}>
					<TypingIndicator
						owner={this.props.owner}
						isTyping={this.props.isTyping}
					/>
					<InputMessage
						isLoading={this.state.isLoading}
						owner={this.props.owner}
						ownerAvatar={this.props.ownerAvatar}
						sendMessage={this.props.sendMessage}
						sendMessageLoading={this.sendMessageLoading}
						typing={this.props.typing}
						resetTyping={this.props.resetTyping}
					/>
				</div>
			</div>
		);
	}
}
/* end ChatBox component */
/* ========== */

/* ========== */
/* ChatRoom component - composed of multiple ChatBoxes */

export default ChatBox;
/* end ChatRoom component */
/* ========== */

/* render the chatroom */
// setTimeout(() => {
// 	ReactDOM.render(<ChatRoom />, document.getElementById('chatApp'));
// }, 400);
