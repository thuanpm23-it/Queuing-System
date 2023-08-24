import React from "react";

interface SelectCustomProps {
  selectedValue: string;
  options: { value: string; label: string }[];
  onSelectChange: (value: string) => void;
  selectClassName?: string;
  style?: React.CSSProperties;
}

const SelectCustom: React.FC<SelectCustomProps> = ({
  selectedValue,
  options,
  onSelectChange,
  selectClassName,
  style,
}) => {
  return (
    <div className="select__custom">
      <select
        className={`device__list__select ${selectClassName}`}
        value={selectedValue}
        onChange={(e) => onSelectChange(e.target.value)}
        style={style}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="select-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9L12 15L18 9" fill="#FF7506" />
          <path
            d="M6 9L12 15L18 9H6Z"
            stroke="#FF7506"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default SelectCustom;
