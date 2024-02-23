export default function PageInfo({ currentPage, totalPages }) {
	return (
		<div className='page-info'>
			<p>
				Page {currentPage} of {Math.ceil(totalPages)}
			</p>
		</div>
	);
}
