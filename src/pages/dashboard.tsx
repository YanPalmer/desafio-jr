import { useEffect } from "react";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import DashboardPage from "@/features/dashboard/DashboardPage";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardRoute() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      void router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return <DashboardPage />;
}

