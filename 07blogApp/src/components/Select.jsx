import React, { useId } from "react";

function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor="{id}" className=""></label>}
      <select>
        {...props}
        id={id}
        ref={ref}
        className={" "}
        {`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        //we will loop through the options and create an option element for each
        //but if there is no value in the options it will definitely crash so do
        optional loop. Means if there is value then loop through
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
