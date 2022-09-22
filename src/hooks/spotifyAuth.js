import React, { useEffect, useState } from 'react'

var spotifyToken = null;

function setSpotifyToken(token) {
  spotifyToken = token;
  
}

function getSpotifyToken() {
  return spotifyToken;
}

export { setSpotifyToken, getSpotifyToken };