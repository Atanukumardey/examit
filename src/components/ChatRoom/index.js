import React from 'react';
import ChatBox from '../ChatBox';
import '../ChatBox/chatboxdesign.css';

function detectURL(message) {
	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
	return message.replace(urlRegex, function (urlMatch) {
		return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
	});
}

class ChatRoom extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			messages: [],
			isTyping: [],
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.typing = this.typing.bind(this);
		this.resetTyping = this.resetTyping.bind(this);
	}
	/* adds a new message to the chatroom */
	sendMessage(sender, senderAvatar, message) {
		let messageFormat = detectURL(message);
		let newMessageItem = {
			id: this.state.messages.length + 1,
			sender: sender,
			senderAvatar: senderAvatar,
			message: messageFormat,
		};
		this.setState({
			messages: [...this.state.messages, newMessageItem],
		});
		this.resetTyping(sender);
	}
	/* updates the writing indicator if not already displayed */
	typing(writer) {
		if (!this.state.isTyping[writer]) {
			let stateTyping = this.state.isTyping;
			stateTyping[writer] = true;
			this.setState({ isTyping: stateTyping });
		}
	}
	/* hide the writing indicator */
	resetTyping(writer) {
		let stateTyping = this.state.isTyping;
		stateTyping[writer] = false;
		this.setState({ isTyping: stateTyping });
	}

	render() {
		let users = {};
		let chatBoxes = [];
		let messages = this.state.messages;
		let isTyping = this.state.isTyping;
		let sendMessage = this.sendMessage;
		let typing = this.typing;
		let resetTyping = this.resetTyping;

		let user = { name: 'Shun', avatar: 'https://i.pravatar.cc/150?img=32' };
		return (
			<ChatBox
				key={25}
				owner={user.name}
				ownerAvatar={user.avatar}
				sendMessage={this.sendMessage}
				typing={this.typing}
				resetTyping={this.resetTyping}
				messages={this.state.messages}
				isTyping={this.state.sTyping}
			/>
		);
	}
}

export default ChatRoom;
