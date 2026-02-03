import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dog, Cat, Loader2 } from 'lucide-react';
import { createAnimalSchema } from '@/schemas/animal.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { Animal, CreateAnimalDTO } from '@/types/animal';

interface AnimalFormProps {
  onSubmit: (data: CreateAnimalDTO) => void;
  isLoading?: boolean;
  defaultValues?: Partial<Animal>;
  submitLabel?: string;
}

export function AnimalForm({
  onSubmit,
  isLoading = false,
  defaultValues,
  submitLabel = 'Cadastrar',
}: AnimalFormProps) {
  const form = useForm<CreateAnimalDTO>({
    resolver: zodResolver(createAnimalSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      age: defaultValues?.age || 0,
      type: defaultValues?.type || 'DOG',
      breed: defaultValues?.breed || '',
      owner_name: defaultValues?.owner_name || '',
      owner_contact: defaultValues?.owner_contact || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Animal</FormLabel>
              <FormControl>
                <Input placeholder="Rex" {...field} className="input-focus" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="input-focus">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DOG">
                      <span className="flex items-center gap-2">
                        <Dog className="h-4 w-4" /> Cachorro
                      </span>
                    </SelectItem>
                    <SelectItem value="CAT">
                      <span className="flex items-center gap-2">
                        <Cat className="h-4 w-4" /> Gato
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idade (anos)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    max={50}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    className="input-focus"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="breed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raça</FormLabel>
              <FormControl>
                <Input placeholder="Golden Retriever" {...field} className="input-focus" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Dono</FormLabel>
              <FormControl>
                <Input placeholder="João Silva" {...field} className="input-focus" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="owner_contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contato do Dono</FormLabel>
              <FormControl>
                <Input placeholder="(11) 99999-9999" {...field} className="input-focus" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary-gradient"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}
