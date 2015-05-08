'use strict';

exports.buildUrl = function(url, parameters){
  var qs = "";
  for(var key in parameters) {
    var value = parameters[key];
    qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
  }
  if (qs.length > 0){
    qs = qs.substring(0, qs.length-1); //chop off last "&"
    url = url + "?" + qs;
  }
  return url;
}

exports.getIconForWeather = function(weatherId) {
  if (weatherId >= 200 && weatherId <= 232) {
    return 'ic_storm';
  } else if (weatherId >= 300 && weatherId <= 321) {
    return 'ic_light_rain';
  } else if (weatherId >= 500 && weatherId <= 504) {
    return 'ic_rain';
  } else if (weatherId == 511) {
    return 'ic_snow';
  } else if (weatherId >= 520 && weatherId <= 531) {
    return 'ic_rain';
  } else if (weatherId >= 600 && weatherId <= 622) {
    return 'ic_snow';
  } else if (weatherId >= 701 && weatherId <= 761) {
    return 'ic_fog';
  } else if (weatherId == 761 || weatherId == 781) {
    return 'ic_storm';
  } else if (weatherId == 800) {
    return 'ic_clear';
  } else if (weatherId == 801) {
    return 'ic_light_clouds';
  } else if (weatherId >= 802 && weatherId <= 804) {
    return 'ic_cloudy';
  }
    return -1;
}