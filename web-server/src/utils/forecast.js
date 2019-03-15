const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/069f38fffb26f4875da65fdb4cce20c1/${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined);
        } else {
            const dataString = `${body.daily.data[0].summary} It is currently ${body.currently.temperature}. There is a ${body.currently.precipProbability}% chance of rain.`;
            callback(undefined, dataString);
        };
    });
};

module.exports = forecast;