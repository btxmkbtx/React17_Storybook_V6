import React from "react";
import Button from "./Button";
import Center from "../ComponentDecorators/Center";

export default {
  title: "Form/Button",
  component: Button,
  decorators: [
    (Story) => (
      <Center>
        <Story />
      </Center>
    ),
  ],
};

export const Primary = () => <Button variant="primary">Primary</Button>;
export const Secondary = () => <Button variant="secondary">Secondary</Button>;
export const Success = () => <Button variant="success">Success</Button>;
export const Danger = () => <Button variant="danger">Danger</Button>;
