import React from "react";
const Popup = (props) => {
  return (
    <div className="overlay">
      <div className="">
        <span className="close-icon" onClick={props.handleClose}></span>
        {props.content}
      </div>
    </div>
  );
};
export default Popup;
