const fetch = require('node-fetch');
require('dotenv').config()

const url = 'https://maps.googleapis.com/maps/api/geocode/json';
const key = process.env.GOOGLE_KEY;

parserResponse = responseBody => {
    responseJson = JSON.parse(responseBody);

    if (responseJson.status !== 'OK') {
        console.error('Error google request');
        return {
            lat: null,
            lng: null,
        }
    }

    return {
        lat: responseJson.results[0].geometry.location.lat,
        lng: responseJson.results[0].geometry.location.lng,
    }
}

google = {}

google.getLocation = (address, callback) => {
    console.log(address);
    const params = url + '?address=' + address.street + '+' + address.city + '+' + address.uf + '+' + address.neighborhood + '&key=' + key;
    const requestUrl = params;
    fetch(requestUrl)
        .then(res => res.text())
        .then(body => callback(parserResponse(body)))
}

module.exports = google;