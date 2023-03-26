import React from "react";
import "./Button.css";

function Button(props) {
  // variant: 按钮样式的变量。这个参数名可以按照自己的语义随便定义，如果未通过 props 参数传递该值，则默认为 "primary"。
  // children: 按钮内部的子组件或文本内容。它是通过组件标签的闭合标签和开放标签之间的内容传递给组件的。
  // ...rest: 其他未指定的 props 参数。这些参数将作为原样传递给 <button> 元素，以便允许开发人员自定义任何其他按钮特性（例如 disabled, onClick 等）。
  const { variant = "primary", children, ...rest } = props;

  return (
    <button className={`button ${variant}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
