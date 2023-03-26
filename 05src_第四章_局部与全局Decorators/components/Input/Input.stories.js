import React from "react";
import Input from "./Input";

export default {
  title: "Form/Input",
  component: Input,
};

export const Small = () => <Input size="small" placeholder="small size" />;
export const Medium = () => <Input placeholder="medium size" />;
export const Large = () => <Input size="large" placeholder="large size" />;

Small.storyName = "Small Input";
