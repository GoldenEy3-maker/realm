import { Copy, Envelope } from "@gravity-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { FlexContainer } from "@/core/storybook/ui/flex-container";

import { Button } from "../button";
import { Description } from "../description";
import { ErrorMessage } from "../error-message";
import { Label } from "../label";
import { TextField } from "../textfield";
import { InputGroup } from "./input-group";

const meta = {
  title: "Core/InputGroup",
  component: InputGroup,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    isDisabled: {
      control: "boolean",
    },
    isInvalid: {
      control: "boolean",
    },
    isReadOnly: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return (
      <FlexContainer direction="column">
        <TextField>
          <Label>Email</Label>
          <InputGroup {...props} variant="primary">
            <InputGroup.Prefix>
              <Envelope />
            </InputGroup.Prefix>
            <InputGroup.Input placeholder="example@gmail.com" />
            <InputGroup.Suffix>.com</InputGroup.Suffix>
          </InputGroup>
        </TextField>
        <TextField>
          <Label>Email</Label>
          <InputGroup {...props} variant="secondary">
            <InputGroup.Prefix>
              <Envelope />
            </InputGroup.Prefix>
            <InputGroup.Input placeholder="example@gmail.com" />
            <InputGroup.Suffix>.com</InputGroup.Suffix>
          </InputGroup>
        </TextField>
      </FlexContainer>
    );
  },
};

export const Disabled: Story = {
  render: (props) => {
    return (
      <FlexContainer direction="column">
        <TextField isDisabled>
          <Label>Email</Label>
          <InputGroup {...props} variant="primary">
            <InputGroup.Prefix>
              <Envelope />
            </InputGroup.Prefix>
            <InputGroup.Input placeholder="example@gmail.com" />
            <InputGroup.Suffix>.com</InputGroup.Suffix>
          </InputGroup>
        </TextField>
        <TextField isDisabled>
          <Label>Email</Label>
          <InputGroup {...props} variant="secondary">
            <InputGroup.Prefix>
              <Envelope />
            </InputGroup.Prefix>
            <InputGroup.Input placeholder="example@gmail.com" />
            <InputGroup.Suffix>.com</InputGroup.Suffix>
          </InputGroup>
        </TextField>
      </FlexContainer>
    );
  },
};

export const ReadOnly: Story = {
  render: (props) => {
    return (
      <FlexContainer direction="column">
        <TextField defaultValue="example@gmail.com" isReadOnly>
          <Label>Email</Label>
          <InputGroup {...props} variant="primary">
            <InputGroup.Prefix>
              <Envelope />
            </InputGroup.Prefix>
            <InputGroup.Input placeholder="example@gmail.com" />
            <InputGroup.Suffix isButton>
              <Button isIconOnly variant="ghost">
                <Copy />
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>
        <TextField defaultValue="example@gmail.com" isReadOnly>
          <Label>Email</Label>
          <InputGroup {...props} variant="secondary">
            <InputGroup.Prefix>
              <Envelope />
            </InputGroup.Prefix>
            <InputGroup.Input placeholder="example@gmail.com" />
            <InputGroup.Suffix isButton>
              <Button isIconOnly variant="ghost">
                <Copy />
              </Button>
            </InputGroup.Suffix>
          </InputGroup>
        </TextField>
      </FlexContainer>
    );
  },
};

export const Invalid: Story = {
  render: (props) => {
    return (
      <FlexContainer direction="column">
        <TextField isInvalid>
          <Label>Email</Label>
          <InputGroup {...props} variant="primary">
            <InputGroup.Prefix>
              <Envelope />
            </InputGroup.Prefix>
            <InputGroup.Input placeholder="example@gmail.com" />
            <InputGroup.Suffix>.com</InputGroup.Suffix>
          </InputGroup>
        </TextField>
        <TextField isInvalid>
          <Label>Email</Label>
          <InputGroup {...props} variant="secondary">
            <InputGroup.Prefix>
              <Envelope />
            </InputGroup.Prefix>
            <InputGroup.Input placeholder="example@gmail.com" />
            <InputGroup.Suffix>.com</InputGroup.Suffix>
          </InputGroup>
          <ErrorMessage>Invalid Email</ErrorMessage>
        </TextField>
      </FlexContainer>
    );
  },
};

export const Requred: Story = {
  render: (props) => {
    return (
      <FlexContainer direction="column">
        <TextField isRequired>
          <Label>Email</Label>
          <InputGroup {...props} variant="primary">
            <InputGroup.Prefix>
              <Envelope />
            </InputGroup.Prefix>
            <InputGroup.Input placeholder="example@gmail.com" />
            <InputGroup.Suffix>.com</InputGroup.Suffix>
          </InputGroup>
          <Description>Description</Description>
        </TextField>
        <TextField isRequired>
          <Label>Email</Label>
          <InputGroup {...props} variant="secondary">
            <InputGroup.Prefix>
              <Envelope />
            </InputGroup.Prefix>
            <InputGroup.Input placeholder="example@gmail.com" />
            <InputGroup.Suffix>.com</InputGroup.Suffix>
          </InputGroup>
        </TextField>
      </FlexContainer>
    );
  },
};
