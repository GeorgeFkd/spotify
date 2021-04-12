
const express = require('express')
const app = express();
const path = require('path')
const spotify = require('./getToken');
const REDIRECT_URI = 'localhost:8080/spotify'
const axios = require('axios');
const { client_ID, client_secret } = require('./credentials.json');
var spotifywebapi = require('spotify-web-api-node');
var spotifyAPI = new spotifywebapi({
    clientId:client_ID,
    clientSecret:client_secret,
    redirectUri:'http://localhost:8080/about'
})







app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
app.get('/main',(req,res)=>{
    
    res.render('index.ejs')
})

app.get('/login', function(req, res) {
    var scopes = 'user-read-private user-read-email user-read-recently-played';
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + client_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent('http://localhost:8080/about'));
    });
app.get('/about',async (req,res)=>{
    const code = req.query.code
    //this returns a proper code
    console.log(code)
    const data = await spotifyAPI.authorizationCodeGrant(code)
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']);
    spotifyAPI.setAccessToken(data.body['access_token']);
    spotifyAPI.setRefreshToken(data.body['refresh_token']);
    const me = await spotifyAPI.getMe();
    console.log(me);
    const tracks = await spotifyAPI.getMyRecentlyPlayedTracks({
        limit:10
    })
    //console.log(tracks.body.items)
    const trackNames = tracks.body.items.map((tr)=>tr.track.name)
    console.log(trackNames)



    //spotifyAPI.getUser('GeonF').then((resp)=>console.log(resp)).catch(e=>console.log(e))
})


// app.get('/spotify',(req,res)=>{
//     
//     res.redirect('https://accounts.spotify.com/authorize' +
//     '?response_type=code' +
//     '&client_id=' + client_ID +
//     (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +'&redirect_uri=' + encodeURIComponent('http://localhost:8080/about'));
    
// })


// app.get('/about',(req,res)=>{
//     res.render('about.ejs')
// })
app.listen(8080,()=>{
    
})


   



