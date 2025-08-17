"use client"

import { useState, useRef, useEffect } from 'react';

const weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
const forecastURL = 'https://api.openweathermap.org/data/2.5/forecast';

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
	const [mounted, setMounted] = useState(false);
	const [address, setAddress] = useState('');
	const [coordinates, setCoordinates] = useState({
		lat: null,
		lng: null
	});
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const autocompleteService = useRef(null);
	const placesService = useRef(null);
	
	useEffect(() => {
		setMounted(true);
		setAddress('Toronto, ON, Canada');
		// Initialize Google Maps Places API when component mounts
		if (window.google?.maps?.places) {
			autocompleteService.current = new window.google.maps.places.AutocompleteService();
			placesService.current = new window.google.maps.places.PlacesService(document.createElement('div'));
		}
	}, []);
	
	if (!mounted) {
		return <div className='weatherContainer'><h1>Loading Weather App...</h1></div>;
	}

	const handleClick = () => {
		let weatherOutput = document.getElementsByClassName('weatherOutput')[0];
		let forecastOutput = document.getElementById('forecastOutput');
		weatherOutput.innerHTML = '';
		forecastOutput.innerHTML = '';
		setAddress('');
		setCoordinates({ lat: null, lng: null });
		setShowSuggestions(false);
	};

	const handleInputChange = (e) => {
		const value = e.target.value;
		setAddress(value);
		
		if (value.length > 2 && autocompleteService.current) {
			const request = {
				input: value,
				types: ['(cities)']
			};
			
			// Add timeout to detect if callback is never called
			const timeoutId = setTimeout(() => {
				console.error('Autocomplete request timed out - callback never called');
				console.error('This usually indicates:');
				console.error('1. Billing not enabled for Google Cloud project');
				console.error('2. Places API quota exceeded');
				console.error('3. API key lacks Places API permissions');
				console.error('4. Network or CORS issues');
			}, 5000);
			
			autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
				clearTimeout(timeoutId);
				
				if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
					setSuggestions(predictions);
					setShowSuggestions(true);
				} else {
					console.log('Autocomplete failed. Status:', status, 'Predictions:', predictions);
					setSuggestions([]);
					setShowSuggestions(false);
				}
			});
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	};

	const handleSelect = (placeId, description) => {
		setAddress(description);
		setShowSuggestions(false);
		
		if (placesService.current) {
			const request = { placeId: placeId };
			placesService.current.getDetails(request, (place, status) => {
				if (status === window.google.maps.places.PlacesServiceStatus.OK && place.geometry) {
					setCoordinates({
						lat: place.geometry.location.lat(),
						lng: place.geometry.location.lng()
					});
				}
			});
		}
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

	const onLoad = () => {
		if (window.google?.maps?.places) {
			autocompleteService.current = new window.google.maps.places.AutocompleteService();
			placesService.current = new window.google.maps.places.PlacesService(document.createElement('div'));
		} else {
			console.error('Google Maps Places API not available');
		}
	};

	return (
		<div className='weatherContainer'>
			<h1>
				Weather App <span className='tagline'>with 5 day forecast</span>
		</h1>
			<div className='searchSection'>
				<div className='searchInputs'>
					<input
						value={address}
						onChange={handleInputChange}
						onClick={handleClick}
						placeholder='Enter a City ...'
						className='weatherSearchInput'
						aria-label='weather-search-input'
					/>
					<input
						className='weatherGoBtn'
						type='submit'
						value='Go!'
						onClick={getData}
					/>
				</div>
				{showSuggestions && (
					<div className='autocompleteDropdownContainer'>
						{suggestions.map((suggestion) => (
							<div
								key={suggestion.place_id}
								className='suggestion-item'
								style={{
									backgroundColor: '#ffffff',
									cursor: 'pointer',
									padding: '10px 0px'
								}}
								onMouseEnter={(e) => {
									e.target.style.backgroundColor = 'rgba(51, 89, 153,0.75)';
									e.target.style.color = '#ffffff';
								}}
								onMouseLeave={(e) => {
									e.target.style.backgroundColor = '#ffffff';
									e.target.style.color = 'initial';
								}}
								onClick={() => handleSelect(suggestion.place_id, suggestion.description)}
							>
								<span>{suggestion.description}</span>
							</div>
						))}
					</div>
				)}
			</div>
			<div className='weatherOutput'></div>
			<div id='forecastOutput'></div>
		</div>
	);
};

export default SearchComponent;
