import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

const PasswordGenerator = () => {
	const [length, setLength] = useState();
	const [upper, setUpper] = useState();
	const [lower, setLower] = useState();
	const [numbers, setNumbers] = useState();
	const [symbols, setSymbols] = useState();

	function handleLengthChange(e) {
		if (localStorage.getItem('length') !== null) {
			localStorage.setItem('length', localStorage.getItem(length));
		} else {
			localStorage.setItem('length', 12);
		}
		const lengthSlider = document.getElementById('length');
		let output = document.getElementById('length_disp');
		output.innerHTML = e.target.value;
		lengthSlider.oninput = function () {
			output.innerHTML = this.value;
		};
		localStorage.setItem('length', e.target.value);
		setLength(e.target.value);
	}

	const toggleUpper = event => {
		console.log(event.target.id, event.target.checked);
		setUpper(!upper);
		localStorage.setItem(event.target.id, event.target.checked);
	};

	const toggleLower = event => {
		setLower(!lower);
		localStorage.setItem(event.target.id, event.target.checked);
	};

	const toggleNumbers = event => {
		setNumbers(!numbers);
		localStorage.setItem(event.target.id, event.target.checked);
	};

	const toggleSymbols = event => {
		setSymbols(!symbols);
		localStorage.setItem(event.target.id, event.target.checked);
	};

	useEffect(() => {
		const len = localStorage.getItem('length');
		if (len === null) {
			localStorage.setItem('length', 12);
			setLength(12);
		} else {
			setLength(JSON.parse(localStorage.getItem('length')));
		}
		const ups = localStorage.getItem('upper');
		if (ups === null) {
			localStorage.setItem('upper', true);
			setUpper(true);
		} else {
			setUpper(JSON.parse(localStorage.getItem('upper')));
		}
		const lows = localStorage.getItem('lower');
		if (lows === null) {
			localStorage.setItem('lower', true);
			setLower(true);
		} else {
			setLower(JSON.parse(localStorage.getItem('lower')));
		}
		const nums = localStorage.getItem('numbers');
		if (nums === null) {
			localStorage.setItem('numbers', true);
			setNumbers(true);
		} else {
			setNumbers(JSON.parse(localStorage.getItem('numbers')));
		}
		const syms = localStorage.getItem('symbols');
		if (syms === null) {
			localStorage.setItem('symbols', true);
			setSymbols(true);
		} else {
			setSymbols(JSON.parse(localStorage.getItem('symbols')));
		}
	}, []);

	const randomFunc = {
		upper: getRandomUpper,
		lower: getRandomLower,
		number: getRandomNumber,
		symbol: getRandomSymbol
	};

	function copyToClipboard() {
		const textarea = document.createElement('textarea');
		const resultElement = document.getElementById('pwg-result');
		const password = resultElement.innerText;
		const msg = document.getElementById('msg');

		if (!password) {
			msg.classList.add('fade-out');
			msg.innerText = 'Generate a password first!';
			setTimeout(() => {
				msg.classList.remove('fade-out');
				msg.innerText = '';
			}, 2500);
			return;
		}

		textarea.value = password;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		textarea.remove();
		msg.classList.add('fade-out');
		msg.innerText = 'Copied!';
		setTimeout(() => {
			msg.classList.remove('fade-out');
			msg.innerText = '';
		}, 2500);
	}

	function generateElement(e) {
		e.preventDefault();
		const lengthElement = document.getElementById('length_disp');
		const length = parseInt(lengthElement.innerHTML);
		const uppercaseElement = document.getElementById('upper');
		const hasUpper = uppercaseElement.checked;
		const lowercaseElement = document.getElementById('lower');
		const hasLower = lowercaseElement.checked;
		const numbersElement = document.getElementById('numbers');
		const hasNumbers = numbersElement.checked;
		const symbolsElement = document.getElementById('symbols');
		const hasSymbols = symbolsElement.checked;

		const resultElement = document.getElementById('pwg-result');
		resultElement.innerText = generatePassword(
			hasUpper,
			hasLower,
			hasNumbers,
			hasSymbols,
			length
		);
	}

	function generatePassword(upper, lower, number, symbol, length) {
		let generatedPassword = '';
		const typesCount = upper + lower + number + symbol;
		const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
			item => Object.values(item)[0]
		);
		if (typesCount === 0) {
			return '';
		}
		for (let i = 0; i < length; i += typesCount) {
			typesArr.forEach(type => {
				const funcName = Object.keys(type)[0];
				generatedPassword += randomFunc[funcName]();
			});
		}
		const finalPassword = generatedPassword.slice(0, length);
		return finalPassword;
	}

	function getRandomUpper() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
	}

	function getRandomLower() {
		return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
	}

	function getRandomNumber() {
		return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
	}

	function getRandomSymbol() {
		const symbols = '!@#$%^&*+?=£()';
		return symbols[Math.floor(Math.random() * symbols.length)];
	}

	return (
		<div>
			<div className='stage'>
				<div className='PasswordGeneratorContainer'>
					<div className='pwg-container'>
						<h2 className='pwg'>Password Generator</h2>
						<div className='pwg-result-container'>
							<span id='pwg-result' className='pwg'></span>
							<button
								id='clipboard'
								onClick={copyToClipboard}
								title='Copy to clipboard...'
							>
								<FontAwesomeIcon icon={faClipboard} />
							</button>
						</div>
						<div id='msg'></div>
						<div className='pwg-settings'>
							<div className='pwg-setting'>
								<label className='pwg'>Password length</label>
								<input
									type='range'
									min='1'
									max='20'
									step='1'
									value={length || 12}
									id='length'
									aria-label='range slider'
									onChange={handleLengthChange}
								/>
								<span id='length_disp' className='pwg'>
									{length}
								</span>
							</div>
							<div className='pwg-setting'>
								<label className='pwg'>
									<span
										id='settings-upper'
										className={upper ? '' : 'line-through'}
									>
										Include uppercase letters
									</span>
									<input
										type='checkbox'
										id='upper'
										checked={upper ? 1 : 0}
										onChange={toggleUpper}
									/>
								</label>
							</div>
							<div className='pwg-setting'>
								<label className='pwg'>
									<span
										id='settings-lower'
										className={lower ? '' : 'line-through'}
									>
										Include lowercase letters
									</span>
									<input
										type='checkbox'
										id='lower'
										checked={lower ? 1 : 0}
										onChange={toggleLower}
									/>
								</label>
							</div>
							<div className='pwg-setting'>
								<label className='pwg'>
									<span
										id='settings-numbers'
										className={numbers ? '' : 'line-through'}
									>
										Include numbers
									</span>
									<input
										type='checkbox'
										id='numbers'
										checked={numbers ? 1 : 0}
										onChange={toggleNumbers}
									/>
								</label>
							</div>
							<div className='pwg-setting'>
								<label className='pwg'>
									<span
										id='settings-symbols'
										className={symbols ? '' : 'line-through'}
									>
										Include symbols
									</span>
									<input
										type='checkbox'
										id='symbols'
										checked={symbols ? 1 : 0}
										onChange={toggleSymbols}
									/>
								</label>
							</div>
						</div>
						<button
							className='pwg-btn pwg-btn-large'
							id='generate'
							onClick={generateElement}
						>
							Generate password
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PasswordGenerator;
