const apiKey = '2515f78b3859747eeda6322ab87c6bca';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search-btn');
const changeTempBtn = document.querySelector('.change-temp-btn');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(cityName) {

  // defaults to imperial
  const response = await fetch(apiURL + `units=imperial&q=${cityName}` + `&appid=${apiKey}`);

  // city name is invalid (i.e. blank string)
  if (response.status == 400) {
    document.querySelector('.weather').style.display = 'none';
    return;
  }

  // city name is wrong
  if (response.status == 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
    return;
  }

  let data = await response.json();

  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '\xB0F';
  document.querySelector('.humidity span').innerHTML = data.main.humidity;
  document.querySelector('.wind').innerHTML = data.wind.speed + ' mi / h';

  // detecting weather condition to display weather image
  switch (data.weather[0].main) {
    case 'Clouds':
      weatherIcon.src = 'images/weather-icons/clouds.png';
      break;
    case 'Clear':
      weatherIcon.src = 'images/weather-icons/clear.png';
      break;
    case 'Rain':
      weatherIcon.src = 'images/weather-icons/rain.png';
      break;
    case 'Drizzle':
      weatherIcon.src = 'images/weather-icons/drizzle.png';
      break;
    case 'Mist':
      weatherIcon.src = 'images/weather-icons/mist.png';
      break;
    case 'Snow':
      weatherIcon.src = 'images/weather-icons/snow.png';
      break;
    default:
      break;
  }

  document.querySelector('.weather').style.display = 'block';
  document.querySelector('.error').style.display = 'none';
}

async function changeTemp(cityName) {
  // check for Fahrenheit
  const re = /F/;
  let isImperial = re.test(document.querySelector('.temp').innerHTML);
  let unitType = isImperial ? 'metric' : 'imperial';
  const response = await fetch(apiURL + `units=${unitType}` + `&q=${cityName}` + `&appid=${apiKey}`);

  // city name is invalid (i.e. blank string)
  if (response.status == 400) {
    document.querySelector('.weather').style.display = 'none';
    return;
  }

  // city name is wrong
  if (response.status == 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
    return;
  }

  let data = await response.json();

  console.log(data);

  if (isImperial) {
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '\xB0C';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km / h';
  }
  else {
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '\xB0F';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' mi / h';
  }

  document.querySelector('.weather').style.display = 'block';
  document.querySelector('.error').style.display = 'none';
}

// when click magnifying glass to check weather of a specific city
searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});

// when click change temp
changeTempBtn.addEventListener('click', () => {
  changeTemp(searchBox.value);
});