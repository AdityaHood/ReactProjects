import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}>
      {children}
    </button>
  );
}

export default Button;
// This is a simple Button component that can be used in various parts of the application.
// It accepts children as props, allowing you to pass any content
