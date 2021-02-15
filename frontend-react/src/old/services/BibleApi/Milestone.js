import axios from 'axios';

const apiUrl = 'http://ec2-54-147-129-52.compute-1.amazonaws.com:3000/v1/';
const API_ENDPOINT = 'bible/milestone';

class Milestone {

	constructor(options = {}) {
		this.populate(options);
	}

	populate(options){

		this.id = options.id; 
		this.code = options.code; 
		this.chapters = options.chapters;
		this.titles = options.titles;
		this.descriptions = options.descriptions;
	}

	refresh(){
		let url = apiUrl+API_ENDPOINT+'/'+this.code;
		return axios.get(url).then(response => {

	  		this.populate(response.data);
		});
	}

	getTitle(language){

		for(let index in this.titles){
			let title = this.titles[index];

			if(title.language.code === language)
				return title.title;
		}
	}

	getDescription(language){

		for(let index in this.descriptions){
			let description = this.descriptions[index];

			if(description.language.code === language)
				return description.description;
		}
	}

	static getList(book, language){
		
		let url = apiUrl+API_ENDPOINT;
	  	return axios.get(url, {
	  		params: {
		     	book: book,
		      	language: language
		    }
	  	}).then(response => {

	  		let list = response.data;
	  		let items = [];
	  		for(let index in list.results){
	  			let itemData = list.results[index];
	  			items.push(new Milestone(itemData));
	  		}

	  		list.results = items;
	  		return list;
		});
	}
}

export default Milestone;