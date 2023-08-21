import React, { ChangeEventHandler } from "react";
import { Input } from "antd";

interface CustomSearchInputProps {
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({
  className,
  value,
  onChange,
  style,
}) => {
  return (
    <div className="search__custom" style={style}>
      <Input
        placeholder="Nhập từ khóa"
        className={`device__list__select pe-35 ${className}`}
        value={value}
        onChange={onChange}
      />
      <span className="search__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
            stroke="#FF7506"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.5 17.5L13.875 13.875"
            stroke="#FF7506"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};

export default CustomSearchInput;
