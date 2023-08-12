import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  paths: Array<{ label: string; link?: string }>;
}
const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <>
      <div>
        {paths.map((path: any, index: any) => (
          <span
            key={index}
            className={
              index === paths.length - 1 ? "readcrumb" : "breadcrumb__text"
            }
          >
            {index > 0 && (
              <span className="breadcrumb__img">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M12.3583 9.40825L8.82501 5.87492C8.74754 5.79681 8.65538 5.73481 8.55383 5.69251C8.45228 5.6502 8.34336 5.62842 8.23335 5.62842C8.12334 5.62842 8.01442 5.6502 7.91287 5.69251C7.81132 5.73481 7.71915 5.79681 7.64168 5.87492C7.48647 6.03105 7.39935 6.24226 7.39935 6.46242C7.39935 6.68257 7.48647 6.89378 7.64168 7.04992L10.5917 9.99992L7.64168 12.9499C7.48647 13.1061 7.39935 13.3173 7.39935 13.5374C7.39935 13.7576 7.48647 13.9688 7.64168 14.1249C7.71955 14.2022 7.81189 14.2633 7.91342 14.3047C8.01496 14.3462 8.12367 14.3672 8.23335 14.3666C8.34302 14.3672 8.45174 14.3462 8.55327 14.3047C8.6548 14.2633 8.74715 14.2022 8.82501 14.1249L12.3583 10.5916C12.4365 10.5141 12.4984 10.4219 12.5408 10.3204C12.5831 10.2188 12.6048 10.1099 12.6048 9.99992C12.6048 9.88991 12.5831 9.78098 12.5408 9.67944C12.4984 9.57789 12.4365 9.48572 12.3583 9.40825Z"
                    fill="#7E7D88"
                  />
                </svg>
              </span>
            )}
            {path.link ? <Link to={path.link}>{path.label}</Link> : path.label}
          </span>
        ))}
      </div>
    </>
  );
};

export default Breadcrumb;
