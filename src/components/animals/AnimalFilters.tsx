import { Search, Dog, Cat, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AnimalType } from '@/types/animal';

interface AnimalFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: AnimalType | 'ALL';
  onTypeFilterChange: (value: AnimalType | 'ALL') => void;
}

export function AnimalFilters({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
}: AnimalFiltersProps) {
  const hasFilters = search || typeFilter !== 'ALL';

  const clearFilters = () => {
    onSearchChange('');
    onTypeFilterChange('ALL');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome do animal ou dono..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 input-focus"
        />
      </div>

      <Select
        value={typeFilter}
        onValueChange={(value) => onTypeFilterChange(value as AnimalType | 'ALL')}
      >
        <SelectTrigger className="w-full sm:w-[180px] input-focus">
          <SelectValue placeholder="Todos os tipos" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Todos os tipos</SelectItem>
          <SelectItem value="DOG">
            <span className="flex items-center gap-2">
              <Dog className="h-4 w-4" /> Cachorros
            </span>
          </SelectItem>
          <SelectItem value="CAT">
            <span className="flex items-center gap-2">
              <Cat className="h-4 w-4" /> Gatos
            </span>
          </SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="icon" onClick={clearFilters}>
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
