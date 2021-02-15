import axios from 'axios';

const apiUrl = 'http://ec2-54-147-129-52.compute-1.amazonaws.com:3000/v1/';
const API_ENDPOINT = 'language';

class Language {

	constructor(options = {}) {
		this.populate(options);
	}

	populate(options){

		this.id = options.id; 
		this.name = options.name; 
		this.path_flag = options.path_flag; 
		this.code = options.code; 
		this.status = options.status; 
		this.created_at = options.created_at; 
		this.updated_at = options.updated_at;	
	}

	refresh(){
		let url = apiUrl+API_ENDPOINT+'/'+this.code;
		return axios.get(url).then(response => {

	  		this.populate(response.data);
		});
	}

	static getList(){
		
		let url = apiUrl+API_ENDPOINT;
	  	return axios.get(url).then(response => {

	  		let list = response.data;
	  		let items = [];
	  		for(let index in list.results){
	  			let itemData = list.results[index];
	  			items.push(new Language(itemData));
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

export default Language;