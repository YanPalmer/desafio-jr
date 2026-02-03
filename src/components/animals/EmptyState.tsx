import { PawPrint } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-6">
        <PawPrint className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        Nenhum animal encontrado
      </h3>
      <p className="text-muted-foreground max-w-sm">
        Não há animais cadastrados ainda ou sua busca não retornou resultados.
        Cadastre o primeiro pet!
      </p>
    </div>
  );
}
