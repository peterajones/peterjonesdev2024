import Image from "next/legacy/image";
import Maps from './Maps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEnvelope,
	faAddressCard,
	faPhoneSquareAlt,
	faGlobe
} from '@fortawesome/free-solid-svg-icons';

const Users = ({ users, loading }) => {
	if (loading) {
		return (
			<>
				<Image
					src='/images/code/Spinner-0.7s-100px.gif'
					alt='spinner'
					width='50'
					height='50'
					className='spinner'
				/>
			</>
		);
	}

	if (!users || users.length === 0) {
		return <div>No users found</div>;
	}

	return (
		<div className='info'>
			<ul className='p-list'>
				{users.map(user => (
					<li key={user.id} className='p-card'>
						<div className='info'>
							<p className='name'>{user.name}</p>
							<div className='email'>
								<div className='email-icon'>
									<FontAwesomeIcon icon={faEnvelope} alt='email icon' />
								</div>
								<div className='email-address'>
									<a href={'mailto:' + user.email}>{user.email}</a>
								</div>
							</div>
							<div className='address'>
								<div className='address-icon'>
									<FontAwesomeIcon icon={faAddressCard} alt='address icon' />
								</div>
								<div className='address-details'>
									<p>
										{user.address.street}, {user.address.suite}
									</p>
									<p>{user.address.city}</p>
									<p>{user.address.zipcode}</p>
								</div>
							</div>
							<div className='phone'>
								<div className='phone-icon'>
									<FontAwesomeIcon icon={faPhoneSquareAlt} alt='phone icon' />
								</div>
								<div className='phone-number'>{user.phone}</div>
							</div>
							<div className='website'>
								<div className='website-icon'>
									<FontAwesomeIcon icon={faGlobe} alt='website icon' />
								</div>
								<div className='website-url'>
									<a href={user.website} target='_new'>
										{user.website}
									</a>
								</div>
							</div>
							<span style={{fontSize: '11px'}}>Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</span>
						</div>
						<div id={'map' + user.id} className='map'>
							<Maps
								lat={user.address.geo.lat}
								lng={user.address.geo.lng}
								name={user.name}
								location={user.address.city}
							/>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Users;
