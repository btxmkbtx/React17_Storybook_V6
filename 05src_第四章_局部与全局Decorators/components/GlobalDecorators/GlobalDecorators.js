import React from "react";
import "./GlobalDecorators.css";

function GlobalDecorators(props) {
  return <div className="globalDecorators">{props.children}</div>;
}

export default GlobalDecorators;
