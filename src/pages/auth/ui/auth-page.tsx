import { Link } from "@tanstack/react-router";

import { AppleLogoIcon } from "@/shared/icons/apple-logo-icon";
import { GoogleLogoIcon } from "@/shared/icons/google-logo-icon";
import { cn } from "@/shared/lib/cn";
import { AnimatedGridPattern } from "@/shared/magicui/animated-grid-pattern";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/shared/ui/card";
import { Heading } from "@/shared/ui/heading";
import { Logo } from "@/shared/ui/logo";
import { Separator } from "@/shared/ui/separator";

import { AuthForm } from "./auth-form";

export function AuthPage() {
  return (
    <main className="bg-sidebar relative flex flex-1 flex-col items-center justify-center overflow-hidden">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "skew-y-12",
        )}
      />
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-5 py-6">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <Heading as="h4" className="font-medium">
            Realm
          </Heading>
        </Link>
        <Card className="w-full gap-5">
          <CardHeader>
            <Heading as="h3" className="text-center">
              Добро пожаловать
            </Heading>
            <CardDescription className="text-center">
              Вы можете воспользоваться любым из способов входа ниже. Даже если
              вы тут впервые, ваш аккаунт будет создан автоматически.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-5 flex flex-col gap-2">
              <Button variant="outline" className="w-full">
                <AppleLogoIcon />
                <span>Войти с помощью Apple</span>
              </Button>
              <Button variant="outline" className="w-full">
                <GoogleLogoIcon />
                <span>Войти с помощью Google</span>
              </Button>
            </div>
            <div className="stack mb-5">
              <Separator className="self-center" />
              <span className="bg-card text-muted-foreground w-fit justify-self-center px-2 text-sm">
                Или
              </span>
            </div>
            <AuthForm />
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          Продолжая, вы соглашаетесь с нашими{" "}
          <a href="#">Условиями использования</a> и{" "}
          <a href="#">Политикой конфиденциальности</a>.
        </div>
      </div>
    </main>
  );
}
