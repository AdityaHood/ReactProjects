import React from "react";
import { useParams } from "react-router-dom";

function User() {
  const { userid } = useParams();
  return (
    <div className="  m-4items-center justify-center  bg-gray-600 text-white">
      <h2>User Details</h2>
      <div>User : {userid}</div>
    </div>
  );
}

export default User;
