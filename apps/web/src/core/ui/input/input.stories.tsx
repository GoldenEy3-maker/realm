import type { Meta, StoryObj } from "@storybook/react-vite";

import { FlexContainer } from "@/core/storybook/ui/flex-container";

import { Input } from "./input";

const meta = {
  title: "Core/Input",
  component: Input,
  args: {
    variant: "primary",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return (
      <FlexContainer direction="column">
        <Input {...props} placeholder="Primary placeholder" variant="primary" />
        <Input {...props} placeholder="Secondary placeholder" variant="secondary" />
      </FlexContainer>
    );
  },
};
