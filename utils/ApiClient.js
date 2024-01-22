const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://deezerdevs-deezer.p.rapidapi.com/infos',
  headers: {
    'X-RapidAPI-Key': '271fb487dcmsh91bcf83188abbb8p19e2b1jsnc9e61a802b0e',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}