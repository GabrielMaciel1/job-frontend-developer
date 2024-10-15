import React, { memo } from 'react';
import './style.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
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

            <div className="page-numbers">
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

export default memo(Pagination);
