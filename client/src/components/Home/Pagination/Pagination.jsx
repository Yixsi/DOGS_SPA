import style from './Pagination.module.css'

const Pagination = ({ currentPage, totalPages, onChangePage }) => {
    let pages = [];

    const renderPage = (pageNumber) => (
        <span
            key={pageNumber}
            onClick={() => onChangePage(pageNumber)}
            className={currentPage === pageNumber ? style.activePage : style.inactivePage}
        >
            {pageNumber}
        </span>
    );

    const renderEllipsis = () => <span>...</span>;

    const renderFirstPage = () => renderPage(1);
    const renderLastPage = () => renderPage(totalPages);

    const shouldRenderEllipsis = totalPages > 3;

    if (shouldRenderEllipsis) {
        if (currentPage > 2) {
            pages.push(renderFirstPage());
            if (currentPage > 3) {
                pages.push(renderEllipsis());
            }
        }

        if (currentPage > 1 && currentPage < totalPages) {
            pages.push(renderPage(currentPage - 1));
            pages.push(renderPage(currentPage));
            if (currentPage < totalPages - 1) {
                pages.push(renderPage(currentPage + 1));
            }
        }

        if (currentPage < totalPages - 1) {
            if (currentPage < totalPages - 2) {
                pages.push(renderEllipsis());
            }
            pages.push(renderLastPage());
        }
    } else {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(renderPage(i));
        }
    }

    return <div>{pages}</div>;
};

export default Pagination;