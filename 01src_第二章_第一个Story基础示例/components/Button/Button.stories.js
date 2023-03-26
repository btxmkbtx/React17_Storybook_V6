import React from "react";
import Button from "./Button";

export default {
  // title: "Button", //title是必须设置项目，它对应的是storybook界面左侧的导航栏项目收纳包
  title: "Form/Button", //分割线可以在storybook的导航栏中完成包的分组
  component: Button,
};

// 以下named export会被渲染到Button package下，生成一个个不同样式的按钮实例
// variant中的css式样定义在Button.css中
export const Primary = () => <Button variant="primary">Primary</Button>;
export const Secondary = () => <Button variant="secondary">Secondary</Button>;
export const Success = () => <Button variant="success">Success</Button>;
export const Danger = () => <Button variant="danger">Danger</Button>;
