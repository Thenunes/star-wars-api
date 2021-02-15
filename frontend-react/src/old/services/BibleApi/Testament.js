import axios from 'axios';

const apiUrl = 'http://ec2-54-147-129-52.compute-1.amazonaws.com:3000/v1/';
const API_ENDPOINT = 'bible/testament';

class Testament {

	//https://github.com/yagop/node-telegram-bot-api/blob/master/src/telegram.js
	constructor(options = {}) {
		this.populate(options);
	}

	populate(options){
		this.id =  options.id;
		this.code =  options.code;
		this.names =  options.names;
		this.books = options.books;
	}

	refresh(){
		let url = apiUrl+API_ENDPOINT+'/'+this.code;
		return axios.get(url).then(response => {

	  		this.populate(response.data);
		});
	}

	getName(language){

		for(let index in this.names){
			let name = this.names[index];

			if(name.language.code === language)
				return name.name;
		}
	}

	static getList(){
		
		let url = apiUrl+API_ENDPOINT;
	  	return axios.get(url).then(response => {

	  		let list = response.data;
	  		let items = [];
	  		for(let index in list.results){
	  			let itemData = list.results[index];
	  			items.push(new Testament(itemData));
	  		}

	  		list.results = items;
	  		return list;
		});
	}

	static find(idOrCode){
		let url = apiUrl+API_ENDPOINT+'/'+idOrCode;
		return axios.get(url).then(response => {

	  		this.populate(response.data);
		});
	}
}
export default Testament;