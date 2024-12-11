import "../styles/pagination.css";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        let startPage = 1;
        let endPage = totalPages;

        // Determine start and end pages dynamically, centering around the current page
        if (totalPages > maxPagesToShow) {
            const middlePage = Math.floor(maxPagesToShow / 2);
            startPage = Math.max(1, currentPage - middlePage);
            endPage = Math.min(totalPages, currentPage + middlePage);

            // Adjust start and end if near the first or last page
            if (currentPage <= middlePage) {
                startPage = 1;
                endPage = maxPagesToShow;
            } else if (currentPage + middlePage >= totalPages) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${i === currentPage ? 'active text-white' : ''}`}>
                    <button className="page-link" onClick={() => handlePageClick(i)}>
                        {i}
                    </button>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <nav className="custom-page-nav">
            <ul className="custom-pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageClick(currentPage - 1)}>
                        Previous
                    </button>
                </li>
                {renderPageNumbers()}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageClick(currentPage + 1)}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
