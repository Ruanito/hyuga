const fetch = require('node-fetch');
require('dotenv').config();

parserResponse = responseBody => {
    if (responseBody.status !== 'OK') {
        return {
            lat: null,
            lng: null,
        }
    }

    return {
        lat: responseBody.results[0].geometry.location.lat,
        lng: responseBody.results[0].geometry.location.lng,
    }
}

google = {}

google.getLocation = (address, callback) => {
    const params = process.env.GOOGLE_API_URL + '/maps/api/geocode/json?address=' + encodeURIComponent(address.street + '+' + address.city + '+' + address.uf + '+' + address.neighborhood) + '&key=' + process.env.GOOGLE_KEY;
    const requestUrl = params;
    fetch(requestUrl)
        .then(res => res.json())
        .then(body => callback(parserResponse(body)))
}

module.exports = google;