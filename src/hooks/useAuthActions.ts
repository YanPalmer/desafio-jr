import { useState } from "react";
import { toast } from "sonner";
import type { LoginInput, RegisterInput } from "@/schemas/auth.schema";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

export function useAuthActions() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { refreshSession } = useAuth();

  const login = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        toast.error(body?.error ?? "E-mail ou senha incorretos");
        return false;
      }

      await refreshSession();
      toast.success("Login realizado com sucesso!");
      await router.push('/dashboard');
      return true;
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        toast.error(body?.error ?? "Erro ao criar conta");
        return false;
      }

      await refreshSession();
      toast.success("Conta criada com sucesso!");
      await router.push('/dashboard');
      return true;
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    register,
    isLoading,
  };
}
