import React from "react";
import spinner from "./spinner.gif";

//spinner loading
const Spinner = () => {
  return (
    <div>
      <img
        className="spinner-back"
        src={spinner}
        alt="Loading .. "
        style={{ width: "200px", margin: "auto", display: "block" }}
      />
    </div>
  );
};
export default Spinner;
