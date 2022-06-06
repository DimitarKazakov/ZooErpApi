export type CreateAnimalDto = {
  cageId: number;
  description: string;
  name: string;
  imageUrl: string;
  kingdomType: number;
  age: number;
  gender: number;
  price: number;
  foodIds: number[];
};
