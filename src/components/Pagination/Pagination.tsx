import React from 'react';
import './Pagination.css'; 

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className="pagination">
            <button
                onClick={() => {
                    if (currentPage > 1) {
                        onPageChange(currentPage - 1);
                        scrollToTop();
                    }
                }}
                disabled={currentPage === 1}
            >
                Anterior
            </button>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 10px',
                }}
            >
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => {
                            onPageChange(index + 1);
                            scrollToTop();
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <button
                onClick={() => {
                    if (currentPage < totalPages) {
                        onPageChange(currentPage + 1);
                        scrollToTop();
                    }
                }}
                disabled={currentPage === totalPages}
            >
                Próxima
            </button>
        </div>
    );
};

export default Pagination;
