import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}> {label}</label>
      <input
        {...rest}
        // rest is equal to the showing up this ;
        // onChange={onChange}
        // value={value}
        // type={type}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
