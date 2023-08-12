import React from "react";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckBox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <>
      <input
        className="checkbox__custom"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div className="ms-10 d-flex items-center">
        <div className="role__text__2">{label}</div>
      </div>
    </>
  );
};

export default CheckBox;
