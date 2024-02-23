const Pages = ({
	usersPerPage,
	totalUsers,
	getPage,
	isActive,
	currentPage
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className='page-numbers'>
			<ul className='page-nums'>
				{pageNumbers.map(pageNumber => {
					return (
						<li
							key={pageNumber}
							id={'page' + pageNumber}
							onClick={() => getPage(pageNumber)}
							className={
								currentPage === pageNumber && isActive
									? 'page-num active'
									: 'page-num'
							}
						>
							<span>{pageNumber}</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Pages;
