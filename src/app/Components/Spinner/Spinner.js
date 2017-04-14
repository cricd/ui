import React from "react";
import "./Spinner.scss";
import { observer } from "mobx-react";
import classNames from "classnames";

const Spinner = observer(({ children }) => {
  return (
    <div className="spinners">
      <div className="spinner-1" />
      <div className="spinner-2" />
      <div className="spinner-3" />
    </div>
  );
});

Spinner.propTypes = {};

Spinner.defaultProps = {};

export default Spinner;
