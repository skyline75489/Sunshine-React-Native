import {buildUrl} from '../Utils/functions.js';

const city = 'Harbin'
const format = 'json';
const units = 'metric';
const numDays = 7;

const FORECAST_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';

const parameters = {
  'q': city,
  'mode': format,
  'units': units,
  'cnt': numDays
};

export const REQUEST_URL = buildUrl(FORECAST_BASE_URL, parameters);

export const FAKE_DATA = JSON.parse('{"cod":"200","message":0.0219,"city":{"id":6058560,"name":"London","coord":{"lon":-81.23304,"lat":42.983391},"country":"CA","population":0,"sys":{"population":0}},"cnt":7,"list":[{"dt":1431018000,"temp":{"day":15.88,"min":9.18,"max":15.88,"night":9.18,"eve":15.88,"morn":15.88},"pressure":994.67,"humidity":60,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01n"}],"speed":1.84,"deg":200,"clouds":0},{"dt":1431104400,"temp":{"day":28.7,"min":16.81,"max":28.7,"night":19.23,"eve":24.54,"morn":16.81},"pressure":993.32,"humidity":53,"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"speed":5.41,"deg":217,"clouds":20},{"dt":1431190800,"temp":{"day":28.46,"min":17.57,"max":29.06,"night":17.57,"eve":27.14,"morn":19.64},"pressure":992.84,"humidity":52,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"speed":9.36,"deg":192,"clouds":12,"rain":5.04},{"dt":1431277200,"temp":{"day":19.43,"min":12.92,"max":19.43,"night":17.08,"eve":18.64,"morn":12.92},"pressure":998.84,"humidity":0,"weather":[{"id":502,"main":"Rain","description":"heavy intensity rain","icon":"10d"}],"speed":1.79,"deg":54,"clouds":48,"rain":20.28},{"dt":1431363600,"temp":{"day":20.28,"min":10.82,"max":20.28,"night":10.82,"eve":17.88,"morn":17.55},"pressure":991.94,"humidity":0,"weather":[{"id":502,"main":"Rain","description":"heavy intensity rain","icon":"10d"}],"speed":8.35,"deg":215,"clouds":57,"rain":14.78},{"dt":1431450000,"temp":{"day":12.17,"min":4.74,"max":12.17,"night":4.74,"eve":8.77,"morn":9.8},"pressure":998.79,"humidity":0,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"speed":7.77,"deg":289,"clouds":53,"rain":1.22},{"dt":1431536400,"temp":{"day":15.34,"min":6.07,"max":15.34,"night":6.79,"eve":15.11,"morn":6.07},"pressure":1007.8,"humidity":0,"weather":[{"id":800,"main":"Clear","description":"sky is clear","icon":"01d"}],"speed":6.51,"deg":264,"clouds":0}]}');
