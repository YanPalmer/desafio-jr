import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AnimalForm } from './AnimalForm';
import type { Animal, CreateAnimalDTO } from '@/types/animal';

interface AnimalFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateAnimalDTO) => void;
  isLoading?: boolean;
  animal?: Animal | null;
  mode: 'create' | 'edit';
}

export function AnimalFormDialog({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  animal,
  mode,
}: AnimalFormDialogProps) {
  const title = mode === 'create' ? 'Cadastrar Animal' : 'Editar Animal';
  const submitLabel = mode === 'create' ? 'Cadastrar' : 'Salvar';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">{title}</DialogTitle>
        </DialogHeader>
        <AnimalForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          defaultValues={animal || undefined}
          submitLabel={submitLabel}
        />
      </DialogContent>
    </Dialog>
  );
}
