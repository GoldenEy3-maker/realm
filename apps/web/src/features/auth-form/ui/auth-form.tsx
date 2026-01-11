import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { lazy, Suspense, useRef, useState } from "react";
import { useInterval } from "usehooks-ts";

import { ONE_SECOND } from "@/shared/constants/one-second";
import { AppleLogoIcon } from "@/shared/icons/apple-logo-icon";
import { ArrowLeftIcon } from "@/shared/icons/arrow-left-icon";
import { ArrowRightIcon } from "@/shared/icons/arrow-right-icon";
import { GoogleLogoIcon } from "@/shared/icons/google-logo-icon";
import { MotionLazyDomAnimationFeature } from "@/shared/lib/motion";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/shared/ui/card";
import { Heading } from "@/shared/ui/heading";
import { Separator } from "@/shared/ui/separator";
import { TextMorph } from "@/shared/ui/text-morph";

import { AUTH_CODE_RESEND_TIMEOUT_SECONDS } from "../constants/auth-code-resend-timeout-seconds";
import type { AuthEmailVerificationIntentTokenSchema } from "../model/auth-email-verification-intent-token-schema";
import { AuthFormStageMap } from "../model/auth-form-stage-map";
import { AuthCodeFormSkeleton } from "./auth-code-stage";
import { AuthEmailForm } from "./auth-email-stage";

const AuthCodeForm = lazy(() =>
  import("./auth-code-stage/auth-code-form").then((module) => ({
    default: module.AuthCodeForm,
  })),
);

interface AuthFormProps {
  emailVeirficationIntentData: AuthEmailVerificationIntentTokenSchema | null;
}

export function AuthForm({ emailVeirficationIntentData }: AuthFormProps) {
  const [stage, setStage] = useState<AuthFormStageMap>(
    emailVeirficationIntentData ? AuthFormStageMap.CODE : AuthFormStageMap.EMAIL,
  );

  const emailValueRef = useRef<string>(emailVeirficationIntentData?.email ?? "");
  const resendTimeoutRef = useRef<number>(
    emailVeirficationIntentData?.sentAt
      ? Math.max(
          0,
          AUTH_CODE_RESEND_TIMEOUT_SECONDS -
            Math.abs(Math.floor((emailVeirficationIntentData.sentAt - Date.now()) / 1000)),
        )
      : 0,
  );

  const isEmailStage = stage === AuthFormStageMap.EMAIL;
  const isCodeStage = stage === AuthFormStageMap.CODE;

  const canGoToCodeStage = isEmailStage && emailValueRef.current !== "";

  const goToCodeStage = () => {
    setStage(AuthFormStageMap.CODE);
  };

  const goToEmailStage = () => {
    setStage(AuthFormStageMap.EMAIL);
  };

  const formTitleRender = isCodeStage ? "Подтверждение" : "Добро пожаловать";

  const formDescriptionRender = isCodeStage
    ? "Введите код, который был отправлен на вашу электронную почту."
    : "Вы можете воспользоваться любым из способов входа ниже. Ваш аккаунт будет создан автоматически, если вы тут впервые.";

  const formRender = isCodeStage ? (
    <Suspense fallback={<AuthCodeFormSkeleton />}>
      <AuthCodeForm
        onUnmount={(resendTime) => {
          resendTimeoutRef.current = resendTime;
        }}
        resendTimeout={resendTimeoutRef.current}
        onSubmitWithoutEmail={goToEmailStage}
        email={emailValueRef.current}
        onResendSuccess={() => {
          resendTimeoutRef.current = AUTH_CODE_RESEND_TIMEOUT_SECONDS;
        }}
      />
    </Suspense>
  ) : (
    <AuthEmailForm
      defaultEmail={emailValueRef.current}
      onSuccess={(variables) => {
        emailValueRef.current = variables.email;
        resendTimeoutRef.current = AUTH_CODE_RESEND_TIMEOUT_SECONDS;
        goToCodeStage();
      }}
      onUnmount={(resendTime) => {
        resendTimeoutRef.current = resendTime;
      }}
      resendTimeout={resendTimeoutRef.current}
    />
  );

  useInterval(() => {
    if (resendTimeoutRef.current) {
      resendTimeoutRef.current -= 1;
    }
  }, ONE_SECOND);

  return (
    <Card className="bg-background w-full gap-5">
      <CardHeader>
        <div className="stack min-h-9 items-center">
          <MotionLazyDomAnimationFeature>
            <AnimatePresence initial={false}>
              {isCodeStage && (
                <m.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToEmailStage}
                    aria-label="Вернуться на этап ввода электронной почты"
                  >
                    <ArrowLeftIcon />
                  </Button>
                </m.span>
              )}
            </AnimatePresence>
          </MotionLazyDomAnimationFeature>
          <Heading as="h3" className="justify-self-center text-center">
            <TextMorph>{formTitleRender}</TextMorph>
          </Heading>
          <MotionLazyDomAnimationFeature>
            <AnimatePresence initial={false}>
              {canGoToCodeStage && (
                <m.span
                  className="justify-self-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToCodeStage}
                    aria-label="Перейти на этап ввода кода"
                  >
                    <ArrowRightIcon />
                  </Button>
                </m.span>
              )}
            </AnimatePresence>
          </MotionLazyDomAnimationFeature>
        </div>
        <CardDescription className="text-center">
          <MotionLazyDomAnimationFeature>
            <AnimatePresence initial={false}>
              <m.p
                key={isCodeStage ? "code-desc" : "email-desc"}
                layout
                layoutId={isCodeStage ? "code-desc" : "email-desc"}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: "hidden" }}
              >
                {formDescriptionRender}
              </m.p>
            </AnimatePresence>
          </MotionLazyDomAnimationFeature>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MotionLazyDomAnimationFeature>
          <AnimatePresence initial={false}>
            {isEmailStage && (
              <m.div
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 10, height: 0, marginBottom: 0 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  height: "auto",
                  marginBottom: 20,
                }}
                exit={{ opacity: 0, y: 10, height: 0, marginBottom: 0 }}
              >
                <Button variant="outline" className="w-full">
                  <AppleLogoIcon />
                  <span>Войти с помощью Apple</span>
                </Button>
                <Button variant="outline" className="w-full">
                  <GoogleLogoIcon />
                  <span>Войти с помощью Google</span>
                </Button>
              </m.div>
            )}
          </AnimatePresence>
        </MotionLazyDomAnimationFeature>
        <div className="bg-background relative z-10">
          <div className="stack mb-5">
            <Separator className="self-center" />
            <MotionLazyDomAnimationFeature>
              <AnimatePresence initial={false}>
                {isEmailStage && (
                  <m.span
                    className="bg-background text-muted-foreground w-fit justify-self-center px-2 text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: "hidden" }}
                  >
                    Или
                  </m.span>
                )}
              </AnimatePresence>
            </MotionLazyDomAnimationFeature>
          </div>
          {formRender}
        </div>
      </CardContent>
    </Card>
  );
}
