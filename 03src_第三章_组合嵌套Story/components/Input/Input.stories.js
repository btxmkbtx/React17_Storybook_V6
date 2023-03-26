import React from "react";
import Input from "./Input";

export default {
  title: "Form/Input",
  component: Input,
};

// size中的css式样定义在 Input.css中
export const Small = () => <Input size="small" placeholder="small size" />;
export const Medium = () => <Input placeholder="medium size" />;
export const Large = () => <Input size="large" placeholder="large size" />;

// 重新定义导航栏中显示的组件名
Small.storyName = "Small Input";
