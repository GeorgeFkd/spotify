const { client_ID, client_secret } = require('./credentials.json');
const fetch = require('node-fetch');

const btoa = require('btoa');

const getToken = async () => {
    //gia arxh as doyme genika to API
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',

            'Authorization': 'Basic ' + btoa(client_ID + ':' + client_secret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    console.log(data);
    return data.access_token;

};
const getGenres = async (token) => {

    const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
        method: 'GET',

        headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await result.json();

    return data.categories.items;
};
async function main() {
    //auto thelei doylitsa me express
    
    const mytoken = await getToken();

    const genres = getGenres(mytoken);

}
module.exports = main;
