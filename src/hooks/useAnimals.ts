import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Animal, AnimalFilters, CreateAnimalDTO } from "@/types/animal";
import { useAuth } from "@/contexts/AuthContext";

const ANIMALS_QUERY_KEY = ['animals'];

async function apiJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  const body = (await res.json().catch(() => null)) as any;
  if (!res.ok) {
    throw new Error(body?.error ?? "Erro na API");
  }
  return body as T;
}

// Fetch all animals with optional filters
async function fetchAnimals(filters?: AnimalFilters): Promise<Animal[]> {
  const qs = new URLSearchParams();
  if (filters?.search) qs.set("search", filters.search);
  if (filters?.type) qs.set("type", filters.type);

  const url = qs.toString() ? `/api/animals?${qs.toString()}` : "/api/animals";
  const { data } = await apiJson<{ data: Animal[] }>(url);
  return data;
}

// Fetch single animal by ID
async function fetchAnimalById(id: string): Promise<Animal | null> {
  const { data } = await apiJson<{ data: Animal }>(`/api/animals/${id}`);
  return data ?? null;
}

// Create animal
async function createAnimal(dto: CreateAnimalDTO): Promise<Animal> {
  const { data } = await apiJson<{ data: Animal }>("/api/animals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return data;
}

// Update animal (PUT completo)
async function updateAnimal({ id, ...dto }: { id: string } & CreateAnimalDTO): Promise<Animal> {
  const { data } = await apiJson<{ data: Animal }>(`/api/animals/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  return data;
}

// Delete animal
async function deleteAnimal(id: string): Promise<void> {
  await fetch(`/api/animals/${id}`, { method: "DELETE" }).then(async (res) => {
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as any;
      throw new Error(body?.error ?? "Erro ao excluir");
    }
  });
}

// Hook for fetching animals list
export function useAnimals(filters?: AnimalFilters) {
  const isBrowser = typeof window !== "undefined";
  return useQuery({
    queryKey: [...ANIMALS_QUERY_KEY, filters],
    queryFn: () => fetchAnimals(filters),
    enabled: isBrowser,
  });
}

// Hook for fetching single animal
export function useAnimal(id: string | undefined) {
  const isBrowser = typeof window !== "undefined";
  return useQuery({
    queryKey: [...ANIMALS_QUERY_KEY, id],
    queryFn: () => (id ? fetchAnimalById(id) : null),
    enabled: isBrowser && !!id,
  });
}

// Hook for creating animal
export function useCreateAnimal() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (dto: CreateAnimalDTO) => {
      if (!user?.id) {
        throw new Error("Usuário não autenticado");
      }
      return createAnimal(dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ANIMALS_QUERY_KEY });
      toast.success("Animal cadastrado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Hook for updating animal
export function useUpdateAnimal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ANIMALS_QUERY_KEY });
      toast.success("Animal atualizado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Hook for deleting animal
export function useDeleteAnimal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ANIMALS_QUERY_KEY });
      toast.success("Animal excluído com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Utility hook to check if current user can edit/delete an animal
export function useCanModifyAnimal(animalCreatedBy: string | undefined) {
  const { user } = useAuth();
  return user?.id === animalCreatedBy;
}
