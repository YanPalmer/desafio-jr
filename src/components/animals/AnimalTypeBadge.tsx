import { Dog, Cat } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AnimalType } from '@/types/animal';

interface AnimalTypeBadgeProps {
  type: AnimalType;
  className?: string;
}

export function AnimalTypeBadge({ type, className }: AnimalTypeBadgeProps) {
  const isDog = type === 'DOG';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        isDog ? 'pet-badge-dog' : 'pet-badge-cat',
        className
      )}
    >
      {isDog ? (
        <Dog className="h-3.5 w-3.5" />
      ) : (
        <Cat className="h-3.5 w-3.5" />
      )}
      {isDog ? 'Cachorro' : 'Gato'}
    </span>
  );
}
