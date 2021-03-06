const dayMap = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function getDayName(day) {
  return dayMap[day];
};

export function getMonthName(month) {
  return monthNames[month];
};

export function buildUrl(url, parameters){
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

export function getIconForWeather(weatherId) {
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

export function getArtForTodayWeather(weatherId) {
  if (weatherId >= 200 && weatherId <= 232) {
    return 'art_storm';
  } else if (weatherId >= 300 && weatherId <= 321) {
    return 'art_light_rain';
  } else if (weatherId >= 500 && weatherId <= 504) {
    return 'art_rain';
  } else if (weatherId == 511) {
    return 'art_snow';
  } else if (weatherId >= 520 && weatherId <= 531) {
    return 'art_rain';
  } else if (weatherId >= 600 && weatherId <= 622) {
    return 'art_snow';
  } else if (weatherId >= 701 && weatherId <= 761) {
    return 'art_fog';
  } else if (weatherId == 761 || weatherId == 781) {
    return 'art_storm';
  } else if (weatherId == 800) {
    return 'art_clear';
  } else if (weatherId == 801) {
    return 'art_light_clouds';
  } else if (weatherId >= 802 && weatherId <= 804) {
    return 'art_clouds';
  }
  return -1;
}

