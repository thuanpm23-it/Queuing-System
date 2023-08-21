import React from "react";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  style?: React.CSSProperties;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  style,
}) => {
  const displayPages = () => {
    const displayCount = 5;
    const halfDisplayCount = Math.floor(displayCount / 2);

    if (totalPages <= displayCount) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= halfDisplayCount) {
      return Array.from({ length: displayCount }, (_, index) => index + 1);
    }

    if (currentPage >= totalPages - halfDisplayCount) {
      const pages = [];
      for (let i = totalPages - displayCount + 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const pages = [];
    for (
      let i = currentPage - halfDisplayCount;
      i <= currentPage + halfDisplayCount;
      i++
    ) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination mt-15" style={style}>
      {totalPages > 1 && (
        <>
          <div onClick={() => onPageChange(currentPage - 1)}>
            <CaretLeftOutlined />
          </div>
          {displayPages().map((pageNum, index) => (
            <div
              key={index}
              className={currentPage === pageNum ? "active" : ""}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </div>
          ))}
          <div onClick={() => onPageChange(currentPage + 1)}>
            <CaretRightOutlined />
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
