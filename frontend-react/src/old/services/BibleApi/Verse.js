import axios from 'axios';

const apiUrl = 'http://ec2-54-147-129-52.compute-1.amazonaws.com:3000/v1/';
const API_ENDPOINT = 'bible/verse';

class Verse {

	constructor(options = {}) {
		this.populate(options);
	}

	populate(options){

		this.id = options.id; 
		this.text = options.text; 
		this.number = options.number;
		this.paragraph = options.paragraph;
	}

	refresh(){
		let url = apiUrl+API_ENDPOINT+'/'+this.code;
		return axios.get(url).then(response => {

	  		this.populate(response.data);
		});
	}

	static getList(bible, book, chapter){
		
		let url = apiUrl+API_ENDPOINT;
	  	return axios.get(url, {
	  		params: {
	  			bible: bible,
		     	book: book,
		      	chapter: chapter
		    }
	  	}).then(response => {

	  		let list = response.data;
	  		let items = [];
	  		for(let index in list.results){
	  			let itemData = list.results[index];
	  			items.push(new Verse(itemData));
	  		}

	  		list.results = items;
	  		return list;
		});
	}
}

export default Verse;