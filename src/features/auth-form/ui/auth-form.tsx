import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { lazy, Suspense, useCallback, useMemo, useRef, useState } from "react";

import { AppleLogoIcon } from "@/shared/icons/apple-logo-icon";
import { ArrowLeftIcon } from "@/shared/icons/arrow-left-icon";
import { ArrowRightIcon } from "@/shared/icons/arrow-right-icon";
import { GoogleLogoIcon } from "@/shared/icons/google-logo-icon";
import { MotionLazyDomAnimationFeature } from "@/shared/lib/motion";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/shared/ui/card";
import { Heading } from "@/shared/ui/heading";
import { Separator } from "@/shared/ui/separator";
import { TextMorph } from "@/shared/ui/text-morph";

import { AuthFormStageMap } from "../model/auth-form-stage-map";

const AuthEmailForm = lazy(() =>
  import("./auth-email-form").then((module) => ({
    default: module.AuthEmailForm,
  })),
);

const AuthCodeForm = lazy(() =>
  import("./auth-code-form").then((module) => ({
    default: module.AuthCodeForm,
  })),
);

interface AuthFormProps {
  sendedEmail: string | null;
}

export function AuthForm({ sendedEmail }: AuthFormProps) {
  const [stage, setStage] = useState<AuthFormStageMap>(
    sendedEmail ? AuthFormStageMap.CODE : AuthFormStageMap.EMAIL,
  );

  const isCodeStageVisitedRef = useRef(stage === AuthFormStageMap.CODE);
  const emailValueRef = useRef<string>(sendedEmail ?? "");
  const stoppedResendTimeoutRef = useRef<number | null>(null);

  const isEmailStage = stage === AuthFormStageMap.EMAIL;
  const isCodeStage = stage === AuthFormStageMap.CODE;

  const canGoToCodeStage = isEmailStage && emailValueRef.current !== "";

  const goToCodeStage = useCallback(() => {
    setStage(AuthFormStageMap.CODE);
    isCodeStageVisitedRef.current = true;
  }, [setStage]);

  const goToEmailStage = useCallback(() => {
    setStage(AuthFormStageMap.EMAIL);
  }, [setStage]);

  const formTitleRender = useMemo(() => {
    if (stage === AuthFormStageMap.CODE) {
      return "Подтверждение";
    }

    return "Добро пожаловать";
  }, [stage]);

  const formDescriptionRender = useMemo(() => {
    if (stage === AuthFormStageMap.CODE) {
      return "Введите код, который был отправлен на вашу электронную почту.";
    }

    return "Вы можете воспользоваться любым из способов входа ниже. Даже если вы тут впервые, ваш аккаунт будет создан автоматически.";
  }, [stage]);

  const formRender = useMemo(() => {
    if (isCodeStage) {
      return (
        <AuthCodeForm
          onUnmount={(resendTime) => {
            stoppedResendTimeoutRef.current = resendTime;
          }}
          stoppedResendTimeout={stoppedResendTimeoutRef.current}
          onSubmitWithoutEmail={goToEmailStage}
          email={emailValueRef.current}
        />
      );
    }

    return (
      <AuthEmailForm
        defaultEmail={emailValueRef.current}
        onSuccess={(variables) => {
          emailValueRef.current = variables.email;
          stoppedResendTimeoutRef.current = null;
          goToCodeStage();
        }}
      />
    );
  }, [isCodeStage, goToCodeStage, goToEmailStage]);

  return (
    <Card className="w-full gap-5">
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
          {formDescriptionRender}
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
        <div className="bg-card relative z-10">
          <div className="stack mb-5">
            <Separator className="self-center" />
            <MotionLazyDomAnimationFeature>
              <AnimatePresence initial={false}>
                {isEmailStage && (
                  <m.span
                    className="bg-card text-muted-foreground w-fit justify-self-center px-2 text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    Или
                  </m.span>
                )}
              </AnimatePresence>
            </MotionLazyDomAnimationFeature>
          </div>
          <Suspense>{formRender}</Suspense>
        </div>
      </CardContent>
    </Card>
  );
}
