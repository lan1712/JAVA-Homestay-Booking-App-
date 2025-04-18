import React from 'react'

const RoomPaginator = ({ currentPage, totalPages, onPageChange}) => {
    const pageNumbers = Array.from({ length: totalPages}, (_, i) => i +1)
    return (
        <nav>
            <ul className='pagination, justify-content-center'>
                {pageNumbers.map((pageNumbers) => (
                  <li 
                  key={pageNumbers}
                  className={'page-item ${currentPage === pageNumber ? "active" : ""}'} >
                    <button className="page-link"onClick={() => onChange(pageNumbers)}>
                      {pageNumbers}  
                    </button>
                  </li>  
                ))}
            </ul>
        </nav>
    )
}

export default RoomPaginator
