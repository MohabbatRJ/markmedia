import React from 'react'

function Pagination({ postsPerPage, totalPosts, paginate, previousPage, nextPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }



    return (
        <>

            <div className="row mt-4">
                <div className="col-md-12">
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            <li onClick={previousPage} className="page-number page-link cursor-pointer">
                                Prev
                            </li>
                            {pageNumbers.map((number) => (

                                <li key={number} className="page-item page-link cursor-pointer" onClick={() => paginate(number)}>{number}</li>
                            ))}
                            <li onClick={nextPage} className="page-number page-link cursor-pointer">
                                Next
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Pagination
