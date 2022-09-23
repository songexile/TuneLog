import React, { useEffect, useState } from 'react'

//Initially setting the token to null
var spotifyToken = null;

//Function to set the token
function setSpotifyToken(token) {
  spotifyToken = token;
  
}
//Function to get the token
function getSpotifyToken() {
  return spotifyToken;
}

export { setSpotifyToken, getSpotifyToken };