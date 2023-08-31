import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedProps {
  Cmp: React.ElementType;
}

const Protected: React.FC<ProtectedProps> = (props) => {
  const { Cmp } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Cmp />
    </div>
  );
};

export default Protected;
