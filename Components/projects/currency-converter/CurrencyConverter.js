"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';


const currencyData = [
		{ name: "US Dollar", abbreviation: "USD", symbol: "$", flagURL: "/images/flags/us.svg" },
		{ name: "Euro", abbreviation: "EUR", symbol: "€", flagURL: "/images/flags/eu.svg" },
		{ name: "Japanese Yen", abbreviation: "JPY", symbol: "¥", flagURL: "/images/flags/jp.svg" },
		{ name: "British Pound", abbreviation: "GBP", symbol: "£", flagURL: "/images/flags/gb.svg" },
		{ name: "Australian Dollar", abbreviation: "AUD", symbol: "$", flagURL: "/images/flags/au.svg" },
		{ name: "Canadian Dollar", abbreviation: "CAD", symbol: "$", flagURL: "/images/flags/ca.svg" },
		{ name: "Swiss Franc", abbreviation: "CHF", symbol: "CHF", flagURL: "/images/flags/ch.svg" },
		{ name: "Chinese Yuan Renminbi", abbreviation: "CNY", symbol: "¥", flagURL: "/images/flags/cn.svg" },
		{ name: "Swedish Krona", abbreviation: "SEK", symbol: "kr", flagURL: "/images/flags/se.svg" },
		{ name: "New Zealand Dollar", abbreviation: "NZD", symbol: "$", flagURL: "/images/flags/nz.svg" },
		{ name: "Mexican Peso", abbreviation: "MXN", symbol: "$", flagURL: "/images/flags/mx.svg" },
		{ name: "Singapore Dollar", abbreviation: "SGD", symbol: "$", flagURL: "/images/flags/sg.svg" },
		{ name: "Hong Kong Dollar", abbreviation: "HKD", symbol: "$", flagURL: "/images/flags/hk.svg" },
		{ name: "Norwegian Krone", abbreviation: "NOK", symbol: "kr", flagURL: "/images/flags/no.svg" },
		{ name: "South Korean Won", abbreviation: "KRW", symbol: "₩", flagURL: "/images/flags/kr.svg" },
		{ name: "Turkish Lira", abbreviation: "TRY", symbol: "₺", flagURL: "/images/flags/tr.svg" },
		{ name: "Russian Ruble", abbreviation: "RUB", symbol: "₽", flagURL: "/images/flags/ru.svg" },
		{ name: "Indian Rupee", abbreviation: "INR", symbol: "₹", flagURL: "/images/flags/in.svg" },
		{ name: "Brazilian Real", abbreviation: "BRL", symbol: "R$", flagURL: "/images/flags/br.svg" },
		{ name: "South African Rand", abbreviation: "ZAR", symbol: "R", flagURL: "/images/flags/za.svg" },
		{ name: "Philippine Peso", abbreviation: "PHP", symbol: "₱", flagURL: "/images/flags/ph.svg" },
		{ name: "Czech Koruna", abbreviation: "CZK", symbol: "Kč", flagURL: "/images/flags/cz.svg" },
		{ name: "Indonesian Rupiah", abbreviation: "IDR", symbol: "Rp", flagURL: "/images/flags/id.svg" },
		{ name: "Malaysian Ringgit", abbreviation: "MYR", symbol: "RM", flagURL: "/images/flags/my.svg" },
		{ name: "Hungarian Forint", abbreviation: "HUF", symbol: "Ft", flagURL: "/images/flags/hu.svg" },
		{ name: "Icelandic Krona", abbreviation: "ISK", symbol: "kr", flagURL: "/images/flags/is.svg" },
		{ name: "Croatian Kuna", abbreviation: "HRK", symbol: "kn", flagURL: "/images/flags/hr.svg" },
		{ name: "Bulgarian Lev", abbreviation: "BGN", symbol: "лв", flagURL: "/images/flags/bg.svg" },
		{ name: "Romanian Leu", abbreviation: "RON", symbol: "lei", flagURL: "/images/flags/ro.svg" },
		{ name: "Danish Krone", abbreviation: "DKK", symbol: "kr", flagURL: "/images/flags/dk.svg" },
		{ name: "Thai Baht", abbreviation: "THB", symbol: "฿", flagURL: "/images/flags/th.svg" },
		{ name: "Polish Zloty", abbreviation: "PLN", symbol: "zł", flagURL: "/images/flags/pl.svg" },
		{ name: "Israeli Shekel", abbreviation: "ILS", symbol: "₪", flagURL: "/images/flags/il.svg" }
	];

const CurrencyConverter = () => {
	const [mounted, setMounted] = useState(false);
	const [currencies, setCurrencies] = useState([]);
	const [selectedCurrencies, setSelectedCurrencies] = useState([]);
	const [baseCurrency, setBaseCurrency] = useState('');
	const [baseCurrencyAmount, setBaseCurrencyAmount] = useState(0);
	const [exchangeRates, setExchangeRates] = useState({});
	const [addCurrencyOpen, setAddCurrencyOpen] = useState(false);
	const [dateText, setDateText] = useState('');
	const [inputValues, setInputValues] = useState({});

	useEffect(() => {
		setMounted(true);
		// Initialize with all available currencies
		setCurrencies(currencyData);
		
		// Load initial currencies from localStorage or defaults
		const storedCurrencies = localStorage.getItem('selectedCurrencies');
		const defaults = ["CAD", "USD", "EUR", "JPY"];
		const initialCurrencies = storedCurrencies ? JSON.parse(storedCurrencies) : defaults;
		
		// Check for cached exchange rates
		const cachedRates = localStorage.getItem('exchangeRates');
		if (cachedRates) {
			try {
				const { rates, timestamp, date } = JSON.parse(cachedRates);
				const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
				const isStale = (Date.now() - timestamp) > CACHE_DURATION;
				
				if (!isStale && rates) {
					setExchangeRates(rates);
					setDateText(date);
				} else {
					// Cache is stale, remove it and show instruction
					localStorage.removeItem('exchangeRates');
					setDateText('Enter amount and press Enter to get live rates');
				}
			} catch (error) {
				// Invalid cache data, remove it
				localStorage.removeItem('exchangeRates');
				setDateText('Enter amount and press Enter to get live rates');
			}
		} else {
			// No cached data, show instruction
			setDateText('Enter amount and press Enter to get live rates');
		}
		
		setSelectedCurrencies(initialCurrencies);
		
		if (initialCurrencies.length > 0) {
			setBaseCurrency(initialCurrencies[0]);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleAddCurrency = (currencyAbbr) => {
		if (!selectedCurrencies.includes(currencyAbbr)) {
			const newSelected = [...selectedCurrencies, currencyAbbr];
			setSelectedCurrencies(newSelected);
			localStorage.setItem('selectedCurrencies', JSON.stringify(newSelected));
			
			if (selectedCurrencies.length === 0) {
				setBaseCurrency(currencyAbbr);
				setBaseCurrencyAmount(0);
			}
		}
		setAddCurrencyOpen(false);
	};

	const handleRemoveCurrency = (currencyAbbr) => {
		const newSelected = selectedCurrencies.filter(c => c !== currencyAbbr);
		setSelectedCurrencies(newSelected);
		localStorage.setItem('selectedCurrencies', JSON.stringify(newSelected));
		
		if (baseCurrency === currencyAbbr && newSelected.length > 0) {
			setBaseCurrency(newSelected[0]);
		}
	};

	const handleAmountChange = (currencyAbbr, amount) => {
		// Update the input value for this currency
		setInputValues(prev => ({
			...prev,
			[currencyAbbr]: amount
		}));
		
		const numAmount = isNaN(amount) ? 0 : Number(amount);
		
		if (currencyAbbr !== baseCurrency) {
			setBaseCurrency(currencyAbbr);
			// Clear other input values when switching base currency
			setInputValues({ [currencyAbbr]: amount });
		}
		setBaseCurrencyAmount(numAmount);
	};

	const handleKeyDown = async (event, currencyAbbr, amount) => {
		if (event.key === 'Enter') {
			const numAmount = isNaN(amount) ? 0 : Number(amount);
			// Only fetch exchange rates if user entered a non-zero amount and pressed Enter
			if (numAmount > 0) {
				await fetchExchangeRates();
			}
		}
	};
	
	// Fetch exchange rates when needed
	const fetchExchangeRates = async () => {
		try {
			const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATES_API_KEY;
			const response = await fetch(`https://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}`);
			const data = await response.json();
			
			if (data.success) {
				setDateText(data.date);
				data.rates['EUR'] = 1; // Base currency
				setExchangeRates(data.rates);
				
				// Cache the successful response
				const cacheData = {
					rates: data.rates,
					timestamp: Date.now(),
					date: data.date
				};
				localStorage.setItem('exchangeRates', JSON.stringify(cacheData));
			} else {
				console.error('API returned error:', data.error);
				setDateText('API Rate Limited - Using Demo Rates');
				setExchangeRates(getDemoRates());
			}
		} catch (error) {
			console.error('Failed to fetch exchange rates:', error);
			setDateText('API Error - Using Demo Rates');
			setExchangeRates(getDemoRates());
		}
	};
	
	// Demo rates for when API fails
	const getDemoRates = () => ({
		'EUR': 1,
		'USD': 1.08,
		'CAD': 1.45,
		'JPY': 155.3,
		'GBP': 0.85,
		'AUD': 1.60,
		'CHF': 0.95,
		'CNY': 7.85,
		'SEK': 11.2,
		'NZD': 1.65
	});

	const resetAmounts = () => {
		setBaseCurrencyAmount(0);
		setInputValues({});
	};

	const clearCurrencies = () => {
		setSelectedCurrencies([]);
		setBaseCurrency('');
		setBaseCurrencyAmount(0);
		setInputValues({});
		localStorage.setItem('selectedCurrencies', JSON.stringify([]));
	};

	const getExchangeRate = (fromCurrency, toCurrency) => {
		if (fromCurrency === toCurrency) return 1;
		const fromRate = exchangeRates[fromCurrency] || 1;
		const toRate = exchangeRates[toCurrency] || 1;
		return toRate / fromRate;
	};

	const formatAmount = (amount) => {
		if (!amount || amount === 0) return '';
		return amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
	};

	if (!mounted) {
		return <div className='cc'><div className='currency-container'><h1>Loading Currency Converter...</h1></div></div>;
	}

	return (
		<div className="cc">
			<div className="currency-container">
				<div className="currency-header">
					<h1>Currency Converter</h1>
				</div>
			<div className="currency-date">
				<span className={`currency-date-text ${dateText.includes('Enter amount') ? 'enter-prompt' : ''}`}>{dateText}</span>
				<Link href="https://exchangeratesapi.io/" target="_blank" rel="noopener noreferrer">
					<Image src="/images/code/exchangeratesapi_white_logo.svg" alt="Powered by exchangeratesapi.io" width={153} height={20} className="api-logo" />
				</Link>
			</div>
			<div className="currency-fetch-error"></div>
			<ul className="currency-list">
				{selectedCurrencies.map(currencyAbbr => {
					const currency = currencies.find(c => c.abbreviation === currencyAbbr);
					if (!currency) return null;
					
					const isBase = currencyAbbr === baseCurrency;
					const exchangeRate = getExchangeRate(baseCurrency, currencyAbbr);
					const displayAmount = isBase ? baseCurrencyAmount : (baseCurrencyAmount * exchangeRate);
					const inputValue = inputValues[currencyAbbr] !== undefined ? inputValues[currencyAbbr] : formatAmount(displayAmount);
					
					return (
						<li key={currencyAbbr} className={`currency-item ${isBase ? 'currency-base' : ''}`} id={currencyAbbr}>
							<Image src={currency.flagURL} alt="flag" className="currency-flag" width={60} height={40} />
							<div className="currency-info">
								<p className="currency-input">
									<span className="currency-symbol">{currency.symbol}</span>
									<input 
										id={`currency-input`}
										name={`currency-name`}
										placeholder="" 
										value={inputValue}
										onChange={(e) => handleAmountChange(currencyAbbr, e.target.value.replace(/,/g, ''))}
										onKeyDown={(e) => handleKeyDown(e, currencyAbbr, e.target.value.replace(/,/g, ''))}
										onFocus={() => {
											// Clear formatted display when focusing
											if (inputValues[currencyAbbr] === undefined) {
												const focusValue = displayAmount === 0 ? '' : displayAmount.toString();
												setInputValues(prev => ({...prev, [currencyAbbr]: focusValue}));
											}
										}}
										onBlur={() => {
											// Clear input value to show formatted amount
											setInputValues(prev => {
												const newValues = {...prev};
												delete newValues[currencyAbbr];
												return newValues;
											});
										}}
									/>
								</p>
								<p className="currency-name">{currencyAbbr} - {currency.name}</p>
								<p className="currency-rate">
									1 {baseCurrency} = {exchangeRate.toLocaleString(undefined, {minimumFractionDigits: 4, maximumFractionDigits: 4})} {currencyAbbr}
								</p>
							</div>
							<span className="currency-close" onClick={() => handleRemoveCurrency(currencyAbbr)}>&times;</span>
						</li>
					);
				})}
			</ul>
			<div className="currency-controls">
				<button className="currency-reset-btn" onClick={resetAmounts}>Reset Amounts</button>
				<button className="currency-clear-btn" onClick={clearCurrencies}>Clear Currencies</button>
			</div>
			<button 
				className={`currency-add-btn ${addCurrencyOpen ? 'open' : ''}`}
				onClick={() => setAddCurrencyOpen(!addCurrencyOpen)}
			>
				<i className="fas fa-long-arrow-alt-left"></i>
				{addCurrencyOpen ? 'Back' : 'Add Currency'}
			</button>
			<ul className="currency-add-list">
				{currencies.map(currency => (
					<li 
						key={currency.abbreviation}
						data-currency={currency.abbreviation}
						className={selectedCurrencies.includes(currency.abbreviation) ? 'disabled' : ''}
						onClick={() => !selectedCurrencies.includes(currency.abbreviation) && handleAddCurrency(currency.abbreviation)}
					>
						<Image src={currency.flagURL} alt="flag" className="currency-flag" width={48} height={32} />
						<span>{currency.abbreviation} - {currency.name}</span>
					</li>
				))}
			</ul>
			</div>
		</div>
	);
};

export default CurrencyConverter;