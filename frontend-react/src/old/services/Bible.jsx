
import axios from 'axios';

var source = 'http://ec2-54-147-129-52.compute-1.amazonaws.com:3000/v1';

//de4e12af7f28f599-01/GEN/
const getVersions = () => {

	let url = source+"/bible/version";
	
  	return axios
  		.get(url)
		.then(response => {
			return response.data;
		});
}

const getBooks = () => {

	let url = source+"/bible/book";
	
  	return axios
  		.get(url)
		.then(response => {
			return response.data;
		});
}

export default{
	getVersions,
	getBooks
}


// import axios from 'axios';


// var credential = '33b7d08a95f2c2c9dd2ba2def6e9eea6';
// var source = 'https://api.scripture.api.bible/v1';
// //de4e12af7f28f599-01/GEN/
// const getVersions = () => {

// 	let url = source+"/bibles";
	
//   	return axios
//   		.get(url, { 
//   			'api-key': credential
//   		})
// 		.then(response => {
// 			return response.data;
// 		});
// }

// const getBooks = (version) => {
// 	let url = source+"/bibles/"+version+"/books";
	
//   	return axios
//   		.get(url, { 
//   			'api-key': credential
//   		})
// 		.then(response => {
// 			return response.data;
// 		});
// }

// const getChapters = (version, book) => {
// 	let url = source+"/bibles/"+version+"/books/"+book+"/chapters";
	
//   	return axios
//   		.get(url, { 
//   			'api-key': credential
//   		})
// 		.then(response => {
// 			return response.data;
// 		});
// }

// const getVerses = (version, book, chapter) => {
// 	let url = source+"/bibles/"+version+"/books/"+book+"/chapters/"+chapter+"/verses";
	
//   	return axios
//   		.get(url, { 
//   			'api-key': credential
//   		})
// 		.then(response => {
// 			return response.data;
// 		});
// }

// const getPassages = (version, book, chapter, verse) => {
// 	let url = source+"/bibles/"+version+"/passages/"+book+"."+chapter;
	
//   	return axios
//   		.get(url, { 
//   			headers: {'api-key': credential}
//   		})
// 		.then(response => {
// 			return response.data;
// 		});
// }

// export default{
// 	getVersions,
// 	getBooks,
// 	getChapters,
// 	getVerses,
// 	getPassages
// }

