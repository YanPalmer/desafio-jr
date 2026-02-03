import { Dog, ArrowRight, Shield, Zap, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AppLink } from "@/components/AppLink";

export default function IndexPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/3 -right-1/4 w-[900px] h-[900px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="container flex h-20 items-center justify-between">
          <AppLink href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md group-hover:shadow-glow transition-all duration-300">
              <Dog className="h-6 w-6" />
            </div>
            <span className="text-2xl font-display font-bold text-foreground">
              PetShop
            </span>
          </AppLink>

          <nav className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button asChild className="btn-primary-gradient">
                <AppLink href="/dashboard">
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </AppLink>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <AppLink href="/login">Entrar</AppLink>
                </Button>
                <Button asChild className="btn-primary-gradient">
                  <AppLink href="/register">Cadastrar</AppLink>
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 animate-fade-in">
            <PawPrint className="h-4 w-4" />
            Sistema de Gerenciamento de Pets
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Gerencie seus <span className="text-primary">pets</span> com
            facilidade
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Dashboard completo para cadastrar, editar e gerenciar todos os
            animais do seu petshop. Simples, rápido e seguro.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button
              asChild
              size="lg"
              className="btn-primary-gradient text-lg px-8"
            >
              <AppLink href={isAuthenticated ? "/dashboard" : "/register"}>
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </AppLink>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8"
            >
              <AppLink href="/login">Já tenho conta</AppLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container pb-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-card border border-border card-hover text-center">
            <div className="mx-auto w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Rápido</h3>
            <p className="text-sm text-muted-foreground">
              Interface otimizada para cadastros rápidos e gestão eficiente
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border card-hover text-center">
            <div className="mx-auto w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Shield className="h-7 w-7 text-accent" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Seguro</h3>
            <p className="text-sm text-muted-foreground">
              Autenticação robusta e controle de acesso por usuário
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border card-hover text-center">
            <div className="mx-auto w-14 h-14 rounded-xl bg-dog/10 flex items-center justify-center mb-4">
              <PawPrint className="h-7 w-7 text-dog" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">Simples</h3>
            <p className="text-sm text-muted-foreground">
              Design intuitivo focado na experiência do usuário
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PetShop Dashboard. Todos os direitos
          reservados.
        </div>
      </footer>
    </div>
  );
}

