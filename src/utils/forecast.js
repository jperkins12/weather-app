const request = require('request');

const forecast = (long, lat, callback) => {
    const url =
        'https://api.darksky.net/forecast/78c12c3c2f08f2402f0797f66d8dfe35/' +
        lat.toString() +
        ',' +
        long.toString();

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.');
        } else if (body.error) {
            callback(body.error);
        } else {
            const temperature = body.currently.temperature;
            const precipProbability = body.currently.precipProbability;

            callback(
                undefined,
                body.daily.data[0].summary +
                    ' It is currently ' +
                    temperature +
                    ' degrees out. There is a ' +
                    precipProbability +
                    '% chance of rain.'
            );
        }
    });
};

module.exports = forecast;
