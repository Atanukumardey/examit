import { db } from '@/server/firebase/firebaseApp';
import axios from 'axios';
import { collection, doc, updateDoc } from 'firebase/firestore';

const userTableRef = collection(db, 'User');

export default async function apiHandler(req, res) {
	try {
		if (req.method === 'GET') {
			await handleGetRequest(req, res);
		} else if (req.method === 'POST') {
			await handlePostRequest(req, res);
		} else {
			res.status(405).json({ error: 'Method Not Allowed' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

const graphqlURL = 'http://localhost:4000/';

async function handleGetRequest(req, res) {
	try {
		const { field, value } = req.query;

		// Query the Firestore collection for the given username
		// let getUserByInputQuery = query(
		// 	userTableRef,
		// 	where(field, '==', value)
		// );

		// const userDataRes = await getDocs(getUserByInputQuery);

		// let users = [];
		// userDataRes.docs.forEach((doc) => {
		// 	users.push({ ...doc.data(), UserRefid: doc.id });
		// });

		// res.status(200).json(users);

		const query = `
		query GetUser($fields: String!, $values: String!) {
			getUser(field: $fields, value: $values) {
			ImageURL
			Email
			Number
			Name
			userName
			Password
			id
		  }
		}`;

		const variables = {
			fields: field,
			values: value,
		};

		try {
			const response = await axios.post(graphqlURL, {
				query,
				variables,
			});
			console.log()

			const user = response.data.data.getUser;
			console.log(user);
			res.status(200).json(user);
			// Handle the user data
		} catch (error) {
			console.error('Error:', error);
			res.status(500).json({ error: 'Internal Server Error' });
			// Handle the error
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}

async function handlePostRequest(req, res) {
	try {
		const { docID, data } = req.body;
		// Update the user data in Firestore
		let docRef = doc(userTableRef, docID);
		updateDoc(docRef, {
			Email: data.email,
			Password: data.password,
			Name: data.name,
			userName: data.username,
			Number: data.phoneNumber,
			ImageURL: data.imageURL,
		})
			.then((response) => {
				console.log(response);
				res.status(200).json({ message: 'Done' });
			})
			.catch((err) => {
				console.log(err.message);
				res.status(500).json({ message: 'Encountered Some Problem' });
			});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
}
