// Animal entity types for the PetShop Dashboard

export type AnimalType = 'DOG' | 'CAT';

export interface Animal {
  id: string;
  name: string;
  age: number;
  type: AnimalType;
  breed: string;
  owner_name: string;
  owner_contact: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAnimalDTO {
  name: string;
  age: number;
  type: AnimalType;
  breed: string;
  owner_name: string;
  owner_contact: string;
}

export interface UpdateAnimalDTO extends Partial<CreateAnimalDTO> {
  id: string;
}

export interface AnimalFilters {
  search?: string; // Search by animal name OR owner name
  type?: AnimalType;
}
