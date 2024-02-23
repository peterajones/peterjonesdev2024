import { useState } from 'react';

export default function Checkboxes() {
	const [newsletter1, setNewsletter1] = useState(false);
	const [notifications1, setNotifications1] = useState(true);
	const [alerts1, setAlerts1] = useState(false);
	const [newsletter2, setNewsletter2] = useState(true);
	const [notifications2, setNotifications2] = useState(false);
	const [alerts2, setAlerts2] = useState(true);

	function toggleNewsletter2() {
		setNewsletter2(!newsletter2);
	}
	function toggleNotifications2() {
		setNotifications2(!notifications2);
	}
	function toggleAlerts2() {
		setAlerts2(!alerts2);
	}
	function toggleNewsletter1() {
		setNewsletter1(!newsletter1);
	}
	function toggleNotifications1() {
		setNotifications1(!notifications1);
	}
	function toggleAlerts1() {
		setAlerts1(!alerts1);
	}

	return (
		<>
			<h2>Converting checkboxes to switches</h2>
			<div id='forms-wrapper'>
				<form action='GET' id='form1'>
					<h4 className='checkbox-group'>Conventional checkboxes</h4>
					<div id='checkboxes'>
						<label className='checkbox-label'>
							<input
								className='checkbox-input'
								id='newsletter-1'
								name='newsletter-1'
								type='checkbox'
								onChange={toggleNewsletter1}
								checked={newsletter1}
							/>
							Newsletter
						</label>
						<label className='checkbox-label'>
							<input
								className='checkbox-input'
								name='notifications-1'
								type='checkbox'
								onChange={toggleNotifications1}
								checked={notifications1}
							/>
							Notifications
						</label>
						<label className='checkbox-label'>
							<input
								className='checkbox-input'
								name='alerts-1'
								type='checkbox'
								onChange={toggleAlerts1}
								checked={alerts1}
							/>
							Email Alerts
						</label>
					</div>
				</form>
				<form action='GET' id='form2'>
					<h4 className='checkbox-group'>Styled checkboxes</h4>
					<div id='switches'>
						<label htmlFor='newsletter-2'>
							<input
								className='checkbox-input'
								type='checkbox'
								name='newsletter-2'
								id='newsletter-2'
								onChange={toggleNewsletter2}
								checked={newsletter2}
							/>
							<span />
							Newsletter
						</label>
						<label htmlFor='notifications-2'>
							<input
								className='checkbox-input'
								type='checkbox'
								name='notifications-2'
								id='notifications-2'
								onChange={toggleNotifications2}
								checked={notifications2}
							/>
							<span />
							Notifications
						</label>
						<label htmlFor='alerts-2'>
							<input
								className='checkbox-input'
								type='checkbox'
								name='alerts-2'
								id='alerts-2'
								onChange={toggleAlerts2}
								checked={alerts2}
							/>
							<span />
							Email Alerts
						</label>
					</div>
				</form>
			</div>
			<br />
		</>
	);
}
