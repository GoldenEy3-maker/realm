import { Link } from "@tanstack/react-router";

import { AuthForm } from "@/features/auth-form";
import { cn } from "@/shared/lib/cn";
import { AnimatedGridPattern } from "@/shared/magicui/animated-grid-pattern";
import { Heading } from "@/shared/ui/heading";
import { Logo } from "@/shared/ui/logo";

interface AuthPageProps {
  sendedEmail: string | null;
}

export function AuthPage({ sendedEmail }: AuthPageProps) {
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
        <AuthForm sendedEmail={sendedEmail} />
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          Продолжая, вы соглашаетесь с нашими{" "}
          <a href="#">Условиями использования</a> и{" "}
          <a href="#">Политикой конфиденциальности</a>.
        </div>
      </div>
    </main>
  );
}
