using System;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ZooErp.Data;
using ZooErp.Data.Entities;
using ZooErp.Models.Enums;
using ZooErp.SeedData.Models;

namespace ZooErp.Services
{
	public class SeedService
	{
		private readonly ApplicationDbContext context;

		public SeedService(ApplicationDbContext context)
		{
			this.context = context;
		}

		public async Task<bool> ResetDb()
        {
			await this.context.Database.EnsureDeletedAsync();
			await this.context.Database.EnsureCreatedAsync();
			return true;
        }

		public async Task<int> SeedCagesAsync()
		{
			var count = 0;
			var currentDir = Directory.GetCurrentDirectory();
			using var reader = new StreamReader($"{currentDir}/SeedData/Cages.json");
			string jsonString = reader.ReadToEnd();
			if (jsonString is null)
			{
				return count;
			}

			var cages = JsonConvert.DeserializeObject<CageSeedModel[]>(jsonString);
			foreach (var cage in cages)
			{
				if (this.context.Cages.Any(x => x.Name == cage.Name))
				{
					continue;
				}

				await this.context.Cages.AddAsync(new Cage
				{
					Area = cage.Area,
					Capacity = cage.Capacity,
					Description = cage.Description,
					ImageUrl = cage.ImageUrl,
					Location = cage.Location,
					Name = cage.Name,
					Rating = cage.Rating,
					Type = cage.Type,
					CreatedOn = DateTime.Now,
					CreatedBy = "System",
					LastModifiedBy = "System",
					LastModifiedOn = DateTime.Now
				});

				count++;
			}

			await this.context.SaveChangesAsync();
			return count;
		}

		public async Task<int> SeedAnimalsAsync()
		{
			var count = 0;
			var currentDir = Directory.GetCurrentDirectory();
			using var reader = new StreamReader($"{currentDir}/SeedData/Animals.json");
			string jsonString = reader.ReadToEnd();
			if (jsonString is null)
			{
				return count;
			}

			var reservatCage = await this.context.Cages.FirstOrDefaultAsync(x => x.Type == CageType.NaturalEnclosure);
			var aquariumCage = await this.context.Cages.FirstOrDefaultAsync(x => x.Type == CageType.Aquarium);
			var birdCage = await this.context.Cages.FirstOrDefaultAsync(x => x.Type == CageType.Birds);
			var terariumCage = await this.context.Cages.FirstOrDefaultAsync(x => x.Type == CageType.Terarium);

			var fishFood = await this.context.Foods.FirstOrDefaultAsync(x => x.Type == FoodType.Fish);
			var meatFood = await this.context.Foods.FirstOrDefaultAsync(x => x.Type == FoodType.Meat);
			var vegetableFood = await this.context.Foods.FirstOrDefaultAsync(x => x.Type == FoodType.Vegetables);
			var fruitFood = await this.context.Foods.FirstOrDefaultAsync(x => x.Type == FoodType.Fruit);

			var animals = JsonConvert.DeserializeObject<AnimalSeedModel[]>(jsonString);
			foreach (var animal in animals)
			{
				if (this.context.Animals.Any(x => x.Name == animal.Name))
				{
					continue;
				}

				Cage? currentCage = null;

                if (animal.KingdomType == KingdomType.Fish && aquariumCage != null)
                {
					currentCage = aquariumCage;
                }
                else if (animal.KingdomType == KingdomType.Bird && birdCage != null)
                {
					currentCage = birdCage;
                }
                else if (animal.KingdomType == KingdomType.Reptiles && terariumCage != null)
                {
					currentCage = terariumCage;
                }
                else if (animal.KingdomType == KingdomType.Mammal && reservatCage != null)
                {
					currentCage = reservatCage;
                }

                if (currentCage == null)
                {
					continue;
                }

				var animalEntity = new Animal
				{
					Cage = currentCage,
					Age = animal.Age,
					Gender = animal.Gender,
					KingdomType = animal.KingdomType,
					Price = animal.Price,
					Name = animal.Name,
					Description = animal.Description,
					ImageUrl = animal.ImageUrl,
					CreatedOn = DateTime.Now,
					CreatedBy = "System",
					LastModifiedBy = "System",
					LastModifiedOn = DateTime.Now
				};

				await this.context.Animals.AddAsync(animalEntity);

				count++;

				Food currentFood = null;

				if (animal.KingdomType == KingdomType.Fish && vegetableFood != null)
				{
					currentFood = vegetableFood;
				}
				else if (animal.KingdomType == KingdomType.Bird && fishFood != null)
				{
					currentFood = fishFood;
				}
				else if (animal.KingdomType == KingdomType.Reptiles && fruitFood != null)
				{
					currentFood = fruitFood;
				}
				else if (animal.KingdomType == KingdomType.Mammal && meatFood != null)
				{
					currentFood = meatFood;
				}

                if (currentFood == null)
                {
					continue;
                }

				await this.context.AddAsync(new AnimalFood
				{
					Animal = animalEntity,
					Food = currentFood,
					Priority = 5,
					Quantity = 10,
					CreatedOn = DateTime.Now,
					CreatedBy = "System",
					LastModifiedBy = "System",
					LastModifiedOn = DateTime.Now,
				});
			}

			await this.context.SaveChangesAsync();
			return count;
		}

		public async Task<int> SeedEventsAsync()
        {
			var count = 0;
			var cage = await this.context.Cages.FirstOrDefaultAsync();
            if (cage == null)
            {
				return count;
            }

			var currentDir = Directory.GetCurrentDirectory();
			using var reader = new StreamReader($"{currentDir}/SeedData/Events.json");
			string jsonString = reader.ReadToEnd();
            if (jsonString is null)
            {
				return count;
            }

			var events = JsonConvert.DeserializeObject<EventSeedModel[]>(jsonString);
			foreach (var eventData in events)
			{

				await this.context.Events.AddAsync(new Event
				{
					Cage = cage,
					Type = eventData.Type,
					Description = eventData.Description,
					CreatedOn = DateTime.Now,
					CreatedBy = "System",
					LastModifiedBy = "System",
					LastModifiedOn = DateTime.Now
				});

				count++;
			}

			await this.context.SaveChangesAsync();
			return count;
		}

		public async Task<int> SeedFoodsAsync()
		{
			var count = 0;
			var currentDir = Directory.GetCurrentDirectory();
			using var reader = new StreamReader($"{currentDir}/SeedData/Foods.json");
			string jsonString = reader.ReadToEnd();
			if (jsonString is null)
			{
				return count;
			}

			var foods = JsonConvert.DeserializeObject<FoodSeedModel[]>(jsonString);
			foreach (var food in foods)
			{
				if (this.context.Foods.Any(x => x.Name == food.Name))
				{
					continue;
				}

				await this.context.Foods.AddAsync(new Food
				{
					Colories = food.Colories,
					ImageUrl = food.ImageUrl,
					Price = food.Price,
					Type = food.Type,
					UsageType = food.UsageType,
					Name = food.Name,
					Description = food.Description,
					CreatedOn = DateTime.Now,
					CreatedBy = "System",
					LastModifiedBy = "System",
					LastModifiedOn = DateTime.Now
				});

				count++;
			}

			await this.context.SaveChangesAsync();
			return count;
		}
	}
}

