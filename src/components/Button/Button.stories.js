import React from "react";
import Button from "./Button";

export default {
  title: "Form/Button",
  component: Button,
  args: {
    variant: "primary",
    children: "Default Button",
  },
};

// 定义一个模板函数，本质上就是一个普通的箭头函数。
const Template = (props) => <Button {...props} />;

// 通过js原生函数bind返回一个新的组件函数，达到组件对象克隆的效果。
/* 为什么bind传入一个{}呢？
    因为箭头函数内部没有this，所以bind传入什么都改变不了this指向，
    这里只是传入一个空对象来占位bind的第一个参数，没有实际意义。
*/
export const SuccessWithArgs = Template.bind({});
// Args是storybook6中动态编辑组件参数的机制，我们无需在组件的底层代码中定义args，就可以像下面这样直接使用。
SuccessWithArgs.args = {
  variant: "success",
  children: "success with Args",
  style: { color: "yellow" },
};

// 当然，我们也只有跳过定义模板的环节，直接导出一个带参函数组件，并通过Args机制改变其参数。
export const ButtonWithArgs = (props) => <Button {...props} />;
ButtonWithArgs.args = {
  variant: "primary",
  children: "Primary button with args",
  style: { color: "pink" },
};

// 如果不定义args，就会使用export default中定义的args
export const DefaultButton = Template.bind({});
