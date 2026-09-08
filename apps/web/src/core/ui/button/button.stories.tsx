import { ArrowRotateRight, Ellipsis, Pencil, TrashBin, Xmark } from "@gravity-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { FlexContainer } from "@/core/storybook/ui/flex-container";

import { Button } from "./button";

const meta = {
  title: "Core/Button",
  component: Button,
  args: {
    children: "Button",
    size: "md",
    variant: "primary",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "danger", "danger-soft"],
    },
    isDisabled: {
      control: "boolean",
    },
    isPending: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (props) => {
    return (
      <FlexContainer>
        <Button {...props} variant="primary">
          Primary
        </Button>
        <Button {...props} variant="secondary">
          Secondary
        </Button>
        <Button {...props} variant="outline">
          Outline
        </Button>
        <Button {...props} variant="ghost">
          Ghost
        </Button>
        <Button {...props} variant="danger">
          Danger
        </Button>
        <Button {...props} variant="danger-soft">
          Danger Soft
        </Button>
      </FlexContainer>
    );
  },
};

export const WithIcon: Story = {
  render: (props) => {
    return (
      <FlexContainer>
        <Button {...props} variant="primary">
          <Pencil />
          <span>Edit</span>
        </Button>
        <Button {...props} variant="secondary">
          <Pencil />
          <span>Edit</span>
        </Button>
        <Button {...props} variant="outline">
          <Ellipsis />
          <span>More Options</span>
        </Button>
        <Button {...props} variant="ghost">
          <Xmark />
          <span>Close</span>
        </Button>
        <Button {...props} variant="danger">
          <TrashBin />
          <span>Delete</span>
        </Button>
        <Button {...props} variant="danger-soft">
          <TrashBin />
          <span>Delete</span>
        </Button>
      </FlexContainer>
    );
  },
};

export const IconOnly: Story = {
  render: (props) => {
    return (
      <FlexContainer>
        <Button {...props} variant="primary" aria-label="Edit" isIconOnly>
          <Pencil />
        </Button>
        <Button {...props} variant="secondary" aria-label="Edit" isIconOnly>
          <Pencil />
        </Button>
        <Button {...props} variant="outline" aria-label="More Options" isIconOnly>
          <Ellipsis />
        </Button>
        <Button {...props} variant="ghost" aria-label="Close" isIconOnly>
          <Xmark />
        </Button>
        <Button {...props} variant="danger" aria-label="Delete" isIconOnly>
          <TrashBin />
        </Button>
        <Button {...props} variant="danger-soft" aria-label="Delete" isIconOnly>
          <TrashBin />
        </Button>
      </FlexContainer>
    );
  },
};

export const Sizes: Story = {
  render: (props) => {
    return (
      <FlexContainer>
        <Button {...props} size="sm">
          Small
        </Button>
        <Button {...props} size="md">
          Medium
        </Button>
        <Button {...props} size="lg">
          Large
        </Button>
      </FlexContainer>
    );
  },
};

export const States: Story = {
  render: (props) => {
    return (
      <FlexContainer>
        <Button {...props} isDisabled>
          Disabled
        </Button>
        <Button {...props} isPending>
          <ArrowRotateRight />
          <span>Loading...</span>
        </Button>
      </FlexContainer>
    );
  },
};
