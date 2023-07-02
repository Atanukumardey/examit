import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebaseApp';

const getFileExtension = (filename) => {
	return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

function generateRandomString(length) {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}

	return result;
}

async function uploadImage(baseURL, file) {
	const imageId = Date.now().toString() + generateRandomString(10);
	// Retrieve the file extension from the selected image
	const fileExtension = getFileExtension(file.name);
	const storageRef = ref(storage, `${baseURL}/${imageId}.${fileExtension}`);
	console.log(file);
	return await uploadBytes(storageRef, file)
		.then((snapshot) => {
			return storageRef;
		})
		.catch((err) => {
			console.log(err.message);
		});
}

async function uploadBolb(baseURL, imageBolb) {
	const imageId = Date.now().toString() + generateRandomString(10);
	// Retrieve the file extension from the selected image
	const storageRef = ref(storage, `${baseURL}/${imageId}.jpg`);
	return await uploadBytes(storageRef, imageBolb)
		.then((snapshot) => {
			return storageRef;
		})
		.catch((err) => {
			console.log(err.message);
		});
}

async function getFileURLByRef(storageRef) {
	return await getDownloadURL(storageRef)
		.then((url) => {
			console.log(url);
			return url;
		})
		.catch((err) => {
			console.log(err.message);
		});
}

export { getFileURLByRef, uploadBolb, uploadImage };

