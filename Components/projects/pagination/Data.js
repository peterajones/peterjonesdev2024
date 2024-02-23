import { useState, useEffect } from 'react';
import axios from 'axios';
import Users from './Users';
import Pages from './Pages';
import PageInfo from './PageInfo';

const API = 'https://jsonplaceholder.typicode.com/users';

const Data = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [usersPerPage] = useState(2);
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		const googleMapScript = document.createElement('script');
		googleMapScript.setAttribute('async', '');
		googleMapScript.setAttribute('defer', '');
		window.document.body.appendChild(googleMapScript);
		window.document.body.appendChild(googleMapScript);

		const fetchUsers = async () => {
			setLoading(true);
			const res = await axios.get(API);
			setUsers(res.data);
			setLoading(false);
		};
		fetchUsers();
	}, []);

	// Get current users
	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

	// Change page
	const getPage = pageNumber => {
		return setCurrentPage(pageNumber), setIsActive(true);
	};

	return (
		<div className='PaginationContainer'>
			<Pages
				usersPerPage={usersPerPage}
				totalUsers={users.length}
				getPage={getPage}
				isActive={isActive}
				currentPage={currentPage}
			/>
			<PageInfo
				currentPage={currentPage}
				totalPages={users.length / usersPerPage}
			/>
			<Users users={currentUsers} loading={loading} />
		</div>
	);
};

export default Data;
