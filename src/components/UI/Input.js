import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  // const inputRef = useRef();
  // const activate = () => {
  //   inputRef.current.focus();
  // };
  // useImperativeHandle(ref, () => {
  //   return {
  //     focus: activate,
  //   };
  // });
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input
        {...props.input}
        className={props.isBlue ? classes.blueInput : classes.redInput}
        // ref={inputRef}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
