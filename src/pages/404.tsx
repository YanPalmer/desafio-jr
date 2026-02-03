import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppLink } from "@/components/AppLink";

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    // Mantém o log que existia no Vite/React Router
    // (útil durante a migração)
    // eslint-disable-next-line no-console
    console.error("404 Error: rota inexistente:", router.asPath);
  }, [router.asPath]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          Oops! Página não encontrada
        </p>
        <AppLink href="/" className="text-primary underline hover:text-primary/90">
          Voltar para Home
        </AppLink>
      </div>
    </div>
  );
}

