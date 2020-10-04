import React from "react";
import style from "./Filter.module.css";
import PropTypes from "prop-types";

const Filter = ({ value, onFilter }) => {
  const {container, input} = style;
  return (
    <div className={container}>
      <p>Find conctact by name</p>
      <input className={input}
        type="text"
        onChange={(e) => onFilter(e.target.value)}
        value={value}
      />
    </div>
  );
};
export default Filter;
Filter.propTypes = {
  value: PropTypes.string,
  onFilter: PropTypes.func,
};
