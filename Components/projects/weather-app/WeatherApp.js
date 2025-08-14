"use client"

import { useState } from 'react';
// import Script from 'next/script';
// import GoogleMap from '../GoogleMaps';
import {LoadScript} from '@react-google-maps/api';
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng
} from 'react-places-autocomplete';

const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast';
// const apikey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const days = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
];

const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
];

const SearchComponent = () => {
	const [address, setAddress] = useState('Toronto, ON, Canada');
	const [coordinates, setCoordinates] = useState({
		lat: null,
		lng: null
	});
	console.log(address);

	const searchOptions = {
		types: ['(cities)']
	};

	const handleClick = () => {
		let weatherOutput = document.getElementsByClassName('weatherOutput')[0];
		let forecastOutput = document.getElementById('forecastOutput');
		weatherOutput.innerHTML = '';
		forecastOutput.innerHTML = '';
		setAddress('');
		setCoordinates({ lat: null, lng: null });
	};

	const handleSelect = async address => {
		const results = await geocodeByAddress(address);
		const latLng = await getLatLng(results[0]);
		const searchTerm = results[0].formatted_address;
		setAddress(searchTerm);
		setCoordinates(latLng);
	};

	const getData = () => {
		setAddress(''); // clear the input field

		// get the chosen city's current weather
		fetch(
			coordinates.lat === null && coordinates.lng === null
				? `${weatherURL}?q=${address}&APPID=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
				: `${weatherURL}?lat=${coordinates.lat}&lon=${coordinates.lng}&APPID=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
		).then(response => {
			if (response.status !== 200) {
				console.log(
					`Looks like there was a problem... STATUS CODE: ${response.status}`
				);
				const weatherOutput = document.getElementById('weatherOutput');
				weatherOutput.innerHTML = `
          <p class="errorMsg">Looks like there was a problem... Please try again.</p>
        `;
				const forecastOutput = document.getElementById('forecastOutput');
				forecastOutput.innerHTML = '';
				return;
			}
			response
				.json()
				.then(data => {
					appendWeather(data);
				})
				.catch(err => {
					console.log(err);
				});
		});

		const appendWeather = data => {
			let icon = data.weather[0].icon;
			let date = new Date();
			const weatherOutput = document.getElementsByClassName('weatherOutput')[0];
			weatherOutput.innerHTML += `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p class="dateTime">
      ${days[date.getDay()]} 
      ${date.getDate()} 
      ${months[date.getMonth()]}. 
      ${(date.getHours() + 24) % 12 || 12}:${
				date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
			} 
      ${date.getHours() > 12 ? 'PM' : 'AM'}, 
      <span class="weatherConditions">${data.weather[0].description}</span>
    </p>
    <div class="currentWeatherWrapper">
      <div class="row1">
        <span class="currentTemp">${parseFloat(data.main.temp - 273.15).toFixed(
					1
				)}&#8451;</span>  
        <span className="weatherIcon"><img src="https://openweathermap.org/img/wn/${icon}@2x.png" /></span>
      </div>
      
      <div class="row2">
        <span class="windSpeed">Wind: ${Math.round(
					data.wind.speed * 3.6
				)} Km/h</span>
        <span class="humidity">Humidity: ${data.main.humidity}%</span>
      </div>
    </div> 
    `;
		};

		// get the chosen city's 5 day forecast
		fetch(
			coordinates.lat === null && coordinates.lng === null
				? `${forecastURL}?q=${address}&APPID=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
				: `${forecastURL}?lat=${coordinates.lat}&lon=${coordinates.lng}&APPID=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
		).then(response => {
			if (response.status !== 200) {
				console.log(
					`Looks like there was a problem... STATUS CODE: ${response.status}`
				);
				return;
			}
			response
				.json()
				.then(forecast => {
					appendForecast(forecast);
				})
				.catch(err => {
					console.log(err);
				});
		});
		const appendForecast = forecast => {
			const forecastOutput = document.getElementById('forecastOutput');
			forecastOutput.innerHTML += `
    <h4>5 day forecast</h4>
    <div class="forecast">`;
			for (let i = 1; i < forecast.list.length; i++) {
				let day = new Date(forecast.list[i].dt * 1000).getDay();
				let date = new Date(forecast.list[i].dt * 1000).getDate();
				if (forecast.list[i].dt_txt.includes('12:00:00')) {
					forecastOutput.innerHTML += `
      <div class="dayData">
        <div class='day'>
            ${shortDays[day]} 
            ${date < 10 ? '0' + date : date}
          </div>
          <div class="icon">
            <img src="https://openweathermap.org/img/wn/${
							forecast.list[i].weather[0].icon
						}@2x.png" />
          </div>
          <div class="temps">${parseFloat(
						forecast.list[i].main.temp - 273.15
					).toFixed(1)}&#8451;
          </div>
        </div>
      </div>
      `;
				}
			}
			forecastOutput.innerHTML += `
    <footer class="weatherFooter">
      <div class="widgetLeftMenu__links"><span>Powered by </span><a href="https://openweathermap.org/" target="_blank" class="widgetLeftMenu__link">OpenWeatherMap</a></div>
    </footer>`;
		};
	};

	return (
		<LoadScript
			googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
			libraries={['places']}
		>
			<div className='weatherContainer'>
				<h1>
					Weather App <span className='tagline'>with 5 day forecast</span>
			</h1>
				<PlacesAutocomplete
					value={address}
					onChange={setAddress}
					onSelect={handleSelect}
					searchOptions={searchOptions}
				>
					{({ getInputProps, suggestions, getSuggestionItemProps }) => (
						<div className='searchSection'>
							<div className='searchInputs'>
								<input
									{...getInputProps({
										placeholder: 'Enter a City ...',
										className: 'weatherSearchInput'
									})}
									onClick={handleClick}
									aria-label='weather-search-input'
								/>
								<input
									className='weatherGoBtn'
									type='submit'
									value='Go!'
									onClick={getData}
								/>
							</div>
							<div className='autocompleteDropdownContainer'>
								{/* {loading && <div className="loading">Loading...</div>} */}
								{suggestions.map(suggestion => {
									const className = suggestion.active
										? 'suggestion-item--active'
										: 'suggestion-item';
									// inline style for demonstration purpose
									const style = suggestion.active
										? {
												backgroundColor: 'rgba(51, 89, 153,0.75)',
												cursor: 'pointer',
												padding: '10px 0px',
												color: '#ffffff'
										}
										: {
												backgroundColor: '#ffffff',
												cursor: 'pointer',
												padding: '10px 0px'
										};
									return (
										<div
											{...getSuggestionItemProps(suggestion, {
												className,
												style
											})}
										>
											<span>{suggestion.description}</span>
										</div>
									);
								})}
							</div>
						</div>
					)}
				</PlacesAutocomplete>
				<div className='weatherOutput'></div>
				<div id='forecastOutput'></div>
			</div>
		</LoadScript>
	);
};

export default SearchComponent;
