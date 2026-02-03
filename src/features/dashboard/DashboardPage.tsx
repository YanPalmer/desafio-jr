import { useMemo, useState } from "react";
import { Cat, Dog, Loader2, PawPrint, Plus } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimalCard } from "@/components/animals/AnimalCard";
import { AnimalFilters } from "@/components/animals/AnimalFilters";
import { AnimalFormDialog } from "@/components/animals/AnimalFormDialog";
import { DeleteAnimalDialog } from "@/components/animals/DeleteAnimalDialog";
import { EmptyState } from "@/components/animals/EmptyState";
import {
  useAnimals,
  useCreateAnimal,
  useDeleteAnimal,
  useUpdateAnimal,
} from "@/hooks/useAnimals";
import type { Animal, AnimalType, CreateAnimalDTO } from "@/types/animal";

export default function DashboardPage() {
  // Filters state
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<AnimalType | "ALL">("ALL");

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");

  // Data fetching
  const filters = useMemo(
    () => ({
      search: search || undefined,
      type: typeFilter === "ALL" ? undefined : typeFilter,
    }),
    [search, typeFilter],
  );

  const { data: animals, isLoading, isError } = useAnimals(filters);
  const createMutation = useCreateAnimal();
  const updateMutation = useUpdateAnimal();
  const deleteMutation = useDeleteAnimal();

  // Stats
  const stats = useMemo(() => {
    if (!animals) return { total: 0, dogs: 0, cats: 0 };
    return {
      total: animals.length,
      dogs: animals.filter((a) => a.type === "DOG").length,
      cats: animals.filter((a) => a.type === "CAT").length,
    };
  }, [animals]);

  // Handlers
  const handleOpenCreate = () => {
    setSelectedAnimal(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  const handleOpenEdit = (animal: Animal) => {
    setSelectedAnimal(animal);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleOpenDelete = (animal: Animal) => {
    setSelectedAnimal(animal);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (data: CreateAnimalDTO) => {
    if (formMode === "create") {
      await createMutation.mutateAsync(data);
    } else if (selectedAnimal) {
      await updateMutation.mutateAsync({ id: selectedAnimal.id, ...data });
    }
    setIsFormOpen(false);
    setSelectedAnimal(null);
  };

  const handleDelete = async () => {
    if (selectedAnimal) {
      await deleteMutation.mutateAsync(selectedAnimal.id);
      setIsDeleteOpen(false);
      setSelectedAnimal(null);
    }
  };

  const isMutating = createMutation.isPending || updateMutation.isPending;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os animais cadastrados no sistema
            </p>
          </div>
          <Button onClick={handleOpenCreate} className="btn-primary-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Novo Animal
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <PawPrint className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total de Pets</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-dog-light">
                  <Dog className="h-6 w-6 text-dog" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">{stats.dogs}</p>
                  <p className="text-sm text-muted-foreground">Cachorros</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-cat-light">
                  <Cat className="h-6 w-6 text-cat" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold">{stats.cats}</p>
                  <p className="text-sm text-muted-foreground">Gatos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <AnimalFilters
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
        />

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="text-center py-16 text-destructive">
            Erro ao carregar animais. Tente novamente.
          </div>
        ) : animals?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {animals?.map((animal) => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Dialogs */}
      <AnimalFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleSubmit}
        isLoading={isMutating}
        animal={selectedAnimal}
        mode={formMode}
      />

      <DeleteAnimalDialog
        animal={selectedAnimal}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        isLoading={deleteMutation.isPending}
      />
    </DashboardLayout>
  );
}

