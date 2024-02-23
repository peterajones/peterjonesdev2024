import { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import './rollup-counter.css';

export default function Counter() {
	const [counter, setCounter] = useState(0);

	const handleIncrement = () => {
		setCounter(counter + 1);
	};

	const handleReset = () => {
		setCounter(0);
	};

	const count = counter;
	return (
		<>
			<h1>Rollup Counter</h1>
			<span className='count'>
				<TransitionGroup component='span' className='count'>
					<CSSTransition
						classNames='count'
						key={count}
						timeout={{ enter: 2000, exit: 2000 }}
					>
						<span>{counter}</span>
					</CSSTransition>
				</TransitionGroup>
			</span>
			<div className='buttons'>
				<button id='reset' onClick={handleReset}>
					Reset
				</button>
				<button id='increment' onClick={handleIncrement}>
					Increment
				</button>
			</div>
		</>
	);
}
