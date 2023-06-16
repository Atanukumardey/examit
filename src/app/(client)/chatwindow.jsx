const { default: ChatBox } = require('@/components/ChatBox');
const { useState } = require('react');
import {
    addMessagesToExamChat,
    getExamChatMessages,
} from '@/server/firebase/ExamChat';
import { useEffect } from 'react';
import userProfileImage from '/public/ImageAsset/dummyProfile.png';

function detectURL(message) {
	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
	return message.replace(urlRegex, function (urlMatch) {
		return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
	});
}

export default function ChatWindow() {
	const [messages, setMessages] = useState([]);
	const [isTyping, setisTyping] = useState([]);

	let UserData = JSON.parse(sessionStorage.getItem('UserData'));
	let UserCurrentExamData = JSON.parse(
		sessionStorage.getItem('UserCurrentExamData')
	);
	let CurrentExamChatDocID = JSON.parse(
		sessionStorage.getItem('ExamChatInfo')
	).id;

	const ownerName = UserData.userName;
	const ownerAvatar =
		UserData.ImageURL == '' ? userProfileImage.src : UserData.ImageURL;

	useEffect(() => {
		getExamChatMessages(
			true,
			CurrentExamChatDocID,
			receiveChatMessageFromDatabaseCallback
		);
	}, []);

	function receiveChatMessageFromDatabaseCallback(docs) {
		let newMessages = [];
		let message;
		let newMessageItem;
		for (let i = 0; i < docs.length; i++) {
			message = docs[i].data();
			if (message.Text.length < 1) {
				message.Text = ' ';
			}
			let messageFormat = detectURL(message.Text);
			newMessageItem = {
				id: i + 1,
				sender: message.userName,
				senderAvatar: message.UserProfileImageURL,
				message: messageFormat,
			};
			newMessages.push(newMessageItem);
		}
		// setMessages((oldArray) => [...oldArray, ...newMessages]);
		setMessages(newMessages);
	}

	function sendMessage(sender, senderAvatar, message) {
		if (message.length < 1) {
			return;
		}
		console.log(message);
		let input = {
			userName: UserData.userName,
			text: message,
			ImageURL: '',
			UserProfileImageURL: UserData.ImageURL,
		};
		console.log(input);
		addMessagesToExamChat(CurrentExamChatDocID, input);
		resetTyping(sender);
	}
	/* updates the writing indicator if not already displayed */
	function typing(writer) {
		if (!isTyping[writer]) {
			let stateTyping = isTyping;
			stateTyping[writer] = true;
			setisTyping(stateTyping);
		}
	}
	/* hide the writing indicator */
	function resetTyping(writer) {
		let stateTyping = isTyping;
		stateTyping[writer] = false;
		setisTyping(stateTyping);
	}

	return (
		<div>
			<ChatBox
				key={123}
				chatBoxName='ExamIT'
				owner={ownerName}
				ownerAvatar={ownerAvatar}
				sendMessage={sendMessage}
				typing={typing}
				resetTyping={resetTyping}
				messages={messages}
				isTyping={isTyping}
			/>
		</div>
	);
}
