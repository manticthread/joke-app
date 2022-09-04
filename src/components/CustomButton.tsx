import React from "react";

interface Props {
  name?: string;
  border?: string;
  color?: string;
  children?: React.ReactNode;
  height?: string;
  onClick: () => void;
  radius?: string;
  width?: string;
  className?: string;
}

const CustomButton: React.FC<Props> = ({
  name,
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
  className,
}) => {
  return (
    <button
      name={name}
      className={className}
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        height,
        width,
      }}
    >
      {children}
    </button>
  );
};

export default CustomButton;
