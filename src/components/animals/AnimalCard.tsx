import { Edit2, Trash2, User, Phone } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AnimalTypeBadge } from './AnimalTypeBadge';
import type { Animal } from '@/types/animal';
import { useCanModifyAnimal } from '@/hooks/useAnimals';

interface AnimalCardProps {
  animal: Animal;
  onEdit?: (animal: Animal) => void;
  onDelete?: (animal: Animal) => void;
}

export function AnimalCard({ animal, onEdit, onDelete }: AnimalCardProps) {
  const canModify = useCanModifyAnimal(animal.created_by);

  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">
              {animal.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {animal.breed} • {animal.age} {animal.age === 1 ? 'ano' : 'anos'}
            </p>
          </div>
          <AnimalTypeBadge type={animal.type} />
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{animal.owner_name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{animal.owner_contact}</span>
          </div>
        </div>
      </CardContent>

      {canModify && (
        <CardFooter className="border-t border-border pt-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit?.(animal)}
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10 hover:border-destructive/50"
            onClick={() => onDelete?.(animal)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Excluir
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
