export type CageDto = {
  id: number;
  createdOn: string;
  lastModifiedOn: string;
  createdBy: string;
  lastModifiedBy: string;
  animals: CageAnimalDto[];
  events: CageEventDto[];
  capacity: number;
  area: number;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  rating: number;
  type: string;
};

type CageEventDto = {
  id: number;
  createdOn: string;
  lastModifiedOn: string;
  createdBy: string;
  lastModifiedBy: string;
  cageId: number;
  cage: string;
  type: string;
  description: string;
};

type CageAnimalDto = {
  id: number;
  createdOn: string;
  lastModifiedOn: string;
  createdBy: string;
  lastModifiedBy: string;
  description: string;
  name: string;
  imageUrl: string;
  kingdomType: string;
  age: number;
  gender: string;
  price: number;
  cageId: number;
  cage: string;
  numberOfFoods: number;
  foods: string[];
};
