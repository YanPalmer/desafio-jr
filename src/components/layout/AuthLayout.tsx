import { ReactNode } from 'react';
import { Dog } from 'lucide-react';
import { AppLink } from '@/components/AppLink';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-center py-6">
        <AppLink href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md group-hover:shadow-glow transition-all duration-300">
            <Dog className="h-6 w-6" />
          </div>
          <span className="text-2xl font-display font-bold text-foreground">
            PetShop
          </span>
        </AppLink>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md animate-slide-up">
          <div className="rounded-2xl bg-card p-8 shadow-lg border border-border">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-display font-bold text-foreground">
                {title}
              </h1>
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} PetShop Dashboard
      </footer>
    </div>
  );
}
