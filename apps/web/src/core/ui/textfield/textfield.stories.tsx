import type { Meta, StoryObj } from "@storybook/react-vite";

import { Description } from "../description";
import { ErrorMessage } from "../error-message";
import { Input } from "../input";
import { Label } from "../label";
import { TextField } from "./textfield";

const meta = {
  title: "Core/TextField",
  component: TextField,
  argTypes: {
    isDisabled: {
      control: "boolean",
    },
    isRequired: {
      control: "boolean",
    },
    isInvalid: {
      control: "boolean",
    },
    isReadOnly: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return (
      <TextField {...props}>
        <Label>Label</Label>
        <Input placeholder="Placeholder" />
      </TextField>
    );
  },
};

export const Disabled: Story = {
  render: (props) => {
    return (
      <TextField {...props} isDisabled>
        <Label>Label</Label>
        <Input placeholder="Placeholder" />
      </TextField>
    );
  },
};

export const ReadOnly: Story = {
  render: (props) => {
    return (
      <TextField {...props} isReadOnly>
        <Label>Label</Label>
        <Input placeholder="Placeholder" />
      </TextField>
    );
  },
};

export const Required: Story = {
  render: (props) => {
    return (
      <TextField {...props} isRequired>
        <Label>Label</Label>
        <Input placeholder="Placeholder" />
      </TextField>
    );
  },
};

export const Invalid: Story = {
  render: (props) => {
    return (
      <TextField {...props} isInvalid>
        <Label>Label</Label>
        <Input placeholder="Placeholder" />
        <ErrorMessage>Error Message</ErrorMessage>
      </TextField>
    );
  },
};

export const WithDiscription: Story = {
  render: (props) => {
    return (
      <TextField {...props}>
        <Label>Label</Label>
        <Input placeholder="Placeholder" />
        <Description>Description</Description>
      </TextField>
    );
  },
};
