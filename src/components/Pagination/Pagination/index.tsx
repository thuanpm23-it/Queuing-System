import React from "react";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="pagination mt-15">
      {totalPages > 1 && (
        <>
          <div onClick={() => onPageChange(currentPage - 1)}>
            <CaretLeftOutlined />
          </div>
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
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
