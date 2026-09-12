import type { Meta, StoryObj } from "@storybook/react-vite";

import { FlexContainer } from "@/core/storybook/ui/flex-container";

import { ErrorMessage } from "../error-message";
import { Label } from "../label";
import { TextField } from "../text-field";
import {
  InputOTP,
  REGEXP_ONLY_CHARS,
  REGEXP_ONLY_DIGITS,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from "./input-otp";

const meta = {
  title: "Core/InputOTP",
  component: InputOTP,
  args: {
    variant: "primary",
    maxLength: 6,
    children: undefined as unknown as React.ReactNode,
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    validationDetails: {
      table: {
        disable: true,
      },
    },
    validationErrors: {
      table: {
        disable: true,
      },
    },
    inputClassName: {
      table: {
        disable: true,
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
    },
    isInvalid: {
      control: "boolean",
    },
    isDisabled: {
      control: "boolean",
    },
    pattern: {
      control: {
        type: "select",
        labels: {
          [REGEXP_ONLY_DIGITS]: "digits",
          [REGEXP_ONLY_CHARS]: "chars",
          [REGEXP_ONLY_DIGITS_AND_CHARS]: "digits and chars",
        },
      },
      options: [REGEXP_ONLY_DIGITS, REGEXP_ONLY_CHARS, REGEXP_ONLY_DIGITS_AND_CHARS],
    },
  },
} satisfies Meta<typeof InputOTP>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return (
      <FlexContainer direction="column">
        <TextField>
          <Label>Email OTP (primary)</Label>
          <InputOTP {...props} variant="primary">
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP>
        </TextField>
        <TextField>
          <Label>Email OTP (secondary)</Label>
          <InputOTP {...props} variant="secondary">
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP>
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
          <Label>Email OTP (primary)</Label>
          <InputOTP {...props} isDisabled variant="primary">
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP>
        </TextField>
        <TextField isDisabled>
          <Label>Email OTP (secondary)</Label>
          <InputOTP {...props} isDisabled variant="secondary">
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP>
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
          <Label>Email OTP (primary)</Label>
          <InputOTP {...props} isInvalid variant="primary">
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP>
          <ErrorMessage>Error Message</ErrorMessage>
        </TextField>
        <TextField isInvalid>
          <Label>Email OTP (secondary)</Label>
          <InputOTP {...props} isInvalid variant="secondary">
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP>
          <ErrorMessage>Error Message</ErrorMessage>
        </TextField>
      </FlexContainer>
    );
  },
};

export const WithSeparator: Story = {
  render: (props) => {
    return (
      <FlexContainer direction="column">
        <TextField>
          <Label>Email OTP (primary)</Label>
          <InputOTP {...props} variant="primary">
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
            </InputOTP.Group>
            <InputOTP.Separator />
            <InputOTP.Group>
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
            <InputOTP.Separator />
            <InputOTP.Group>
              <InputOTP.Slot index={4} />
              <InputOTP.Slot index={5} />
            </InputOTP.Group>
          </InputOTP>
        </TextField>
        <TextField>
          <Label>Email OTP (secondary)</Label>
          <InputOTP {...props} variant="secondary">
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
            </InputOTP.Group>
            <InputOTP.Separator />
            <InputOTP.Group>
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
            </InputOTP.Group>
            <InputOTP.Separator />
            <InputOTP.Group>
              <InputOTP.Slot index={4} />
              <InputOTP.Slot index={5} />
            </InputOTP.Group>
          </InputOTP>
        </TextField>
      </FlexContainer>
    );
  },
};

export const Placeholder: Story = {
  render: (props) => {
    return (
      <FlexContainer direction="column">
        <TextField>
          <Label>Email OTP (primary)</Label>
          <InputOTP {...props} placeholder="123123" variant="primary">
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
            </InputOTP.Group>
            <InputOTP.Separator />
            <InputOTP.Group>
              <InputOTP.Slot index={3} />
              <InputOTP.Slot index={4} />
              <InputOTP.Slot index={5} />
            </InputOTP.Group>
          </InputOTP>
        </TextField>
        <TextField>
          <Label>Email OTP (secondary)</Label>
          <InputOTP {...props} placeholder="123123" variant="secondary">
            <InputOTP.Group>
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
            </InputOTP.Group>
            <InputOTP.Separator />
            <InputOTP.Group>
              <InputOTP.Slot index={3} />
              <InputOTP.Slot index={4} />
              <InputOTP.Slot index={5} />
            </InputOTP.Group>
          </InputOTP>
        </TextField>
      </FlexContainer>
    );
  },
};
