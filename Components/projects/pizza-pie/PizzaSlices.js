import { useState, useEffect } from 'react';

export default function PizzaSlices() {
	const [slices, setSlices] = useState(0);

	useEffect(() => {
		setSlices(slices);
	}, [slices]);

	function refreshStage() {
		const ddl = document.getElementById('ddl');
		ddl.selectedIndex = 0;
		const selectValue = document.getElementsByClassName('select-value');
		for (let i = 0; i <= selectValue.length - 1; i++) {
			selectValue[i].disabled = false;
		}
		for (let j = 0; j <= 7; j++) {
			let hiddenSlices = document.getElementById('slice_' + [j] + '_w');
			hiddenSlices.style.opacity = '0';
		}
		const msg = document.getElementById('eaten');
		msg.innerHTML = '';
		document.getElementById('how_many').innerHTML =
			'How many slices do you want?';
		setSlices(0);
	}

	function handleChange(val) {
		const numSlices = parseInt(val.target.value);
		setSlices(numSlices);
		let slice_num = ['0', '1', '2', '3', '4', '5', '6', '7'];

		let i = 0;
		for (i = 0; i < numSlices; i++) {
			let slice_ = 'slice_' + slice_num[i] + '_w';
			document.getElementById(slice_).style.opacity = '1';
			document.getElementById(slice_).style.transition = 'all 0.85s ease-in 0s';
			document.getElementById(i).setAttribute('disabled', 'disabled');
		}
		if (i === 0) {
			document.getElementById('eaten').innerHTML =
				'Come on dude... go on, eat a slice!';
		} else if (i === 1) {
			document.getElementById('eaten').innerHTML =
				'You have eaten ' + i + ' slice. (Eat some more...)';
			document.getElementById('how_many').innerHTML = 'More?';
		} else if (i >= 2 && i <= 3) {
			document.getElementById('eaten').innerHTML =
				'You have eaten ' + i + ' slices. (Keep eating...)';
			document.getElementById('how_many').innerHTML = 'More?';
		} else if (i === 4) {
			document.getElementById('eaten').innerHTML =
				'You have eaten ' + i + " slices. (You're halfway there...)";
			document.getElementById('how_many').innerHTML = 'More?';
		} else if (i >= 5 && i <= 6) {
			document.getElementById('eaten').innerHTML =
				'You have eaten ' + i + ' slices. (Keep eating...)';
			document.getElementById('how_many').innerHTML = 'More?';
		} else if (i === 7) {
			document.getElementById('eaten').innerHTML =
				'You have eaten ' + i + ' slices. (Only one more slice to go...)';
			document.getElementById('how_many').innerHTML =
				'Go on, have the last one...';
		} else {
			document.getElementById('how_many').innerHTML =
				'Dude, you ate the whole pizza!';
			document.getElementById('eaten').innerHTML = `Now order another one...
        <br/>`;
		}
		if (numSlices === 8) {
			let btn = document.createElement('button');
			btn.innerHTML = 'Order Now';
			btn.classList.add('btn-start-over');
			btn.classList.add('btn-hide');
			if (btn) {
				setTimeout(() => {
					btn.classList.remove('btn-hide');
					btn.classList.add('btn-show');
				}, 550);
			}

			btn.addEventListener('click', refreshStage);
			var el = document.getElementById('eaten');
			el.appendChild(btn);
		}
	}

	return (
		<>
			<h1 style={{ marginBottom: '0', fontSize: '1.6rem' }}>Grab a slice!</h1>
			<p style={{ marginTop: '0' }} id='how_many'>
				How many slices do you want?
			</p>
			<form id='pizza-form'>
				<select id='ddl' aria-label='dropdown select' onChange={handleChange}>
					<option value='0' id='0' className='select-value'>
						Choose your slices
					</option>
					<option value='1' id='1' className='select-value'>
						One
					</option>
					<option value='2' id='2' className='select-value'>
						Two
					</option>
					<option value='3' id='3' className='select-value'>
						Three
					</option>
					<option value='4' id='4' className='select-value'>
						Four
					</option>
					<option value='5' id='5' className='select-value'>
						Five
					</option>
					<option value='6' id='6' className='select-value'>
						Six
					</option>
					<option value='7' id='7' className='select-value'>
						Seven
					</option>
					<option value='8' id='8' className='select-value'>
						Eight
					</option>
				</select>
			</form>
			<div className='piechart'>
				<div className='common border' />
				<div className='common base' />
				<div className='common slice slice_1_c'>
					<div
						className='common slice slice_1_w'
						id='slice_0_w'
						style={{ opacity: 0 }}
					/>
				</div>
				<div className='common slice slice_2_c'>
					<div
						className='common slice slice_2_w'
						id='slice_1_w'
						style={{ opacity: 0 }}
					/>
				</div>
				<div className='common slice slice_3_c'>
					<div
						className='common slice slice_3_w'
						id='slice_2_w'
						style={{ opacity: 0 }}
					/>
				</div>
				<div className='common slice slice_4_c'>
					<div
						className='common slice slice_4_w'
						id='slice_3_w'
						style={{ opacity: 0 }}
					/>
				</div>
				<div className='common slice slice_5_c'>
					<div
						className='common slice slice_5_w'
						id='slice_4_w'
						style={{ opacity: 0 }}
					/>
				</div>
				<div className='common slice slice_6_c'>
					<div
						className='common slice slice_6_w'
						id='slice_5_w'
						style={{ opacity: 0 }}
					/>
				</div>
				<div className='common slice slice_7_c'>
					<div
						className='common slice slice_7_w'
						id='slice_6_w'
						style={{ opacity: 0 }}
					/>
				</div>
				<div className='common slice slice_8_c'>
					<div
						className='common slice slice_8_w'
						id='slice_7_w'
						style={{ opacity: 0 }}
					/>
				</div>
			</div>
			<div id='eaten' />
		</>
	);
}
