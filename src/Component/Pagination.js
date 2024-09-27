import React from 'react';
import '../Style/Pagination.css'

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    const handleNext = () => {
        if (currentPage < totalPosts) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='pagination'>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                Prev
            </button>
            {
                pages.map((page, index) => {
                    return <button key={index} onClick={() => setCurrentPage(page)} className={page === currentPage ? 'active' : ''}>{page}</button>
                })
            }
            {totalPosts > 6 && currentPage < totalPosts && (
                <button onClick={handleNext} disabled={currentPage === pages.length}>
                    Next
                </button>
            )}
        </div>
    )

}

export default Pagination