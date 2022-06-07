using System;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using ZooErp.Data;
using ZooErp.Data.Entities;
using ZooErp.Models;
using ZooErp.Models.Enums;

namespace ZooErp.Services
{
	public class AnimalService
	{
        private readonly ApplicationDbContext context;
        private readonly AuthenticationService authService;

        public AnimalService(ApplicationDbContext context, AuthenticationService authService)
		{
            this.context = context;
            this.authService = authService;
        }

        public async Task<IEnumerable<AnimalDto>> GetAsync(FilterDto filter)
        {
			DateTime? createdOnFilter = null;
			DateTime? lastModifiedOnFilter = null;
			if (filter.CreatedOnDate != null)
            {
				createdOnFilter = DateTime.ParseExact(filter.CreatedOnDate, "d/MM/yyyy", CultureInfo.InvariantCulture);
			}

            if (filter.LastModifiedOnDate != null)
            {
				lastModifiedOnFilter = DateTime.ParseExact(filter.LastModifiedOnDate, "d/MM/yyyy", CultureInfo.InvariantCulture);
			}

			var animals = await this.context
				.Animals
				.Where(x => (!filter.Id.HasValue || x.Id == filter.Id)
							&& (!createdOnFilter.HasValue || DateTime.Compare(x.CreatedOn, (DateTime)createdOnFilter) >= 0)
							&& (!lastModifiedOnFilter.HasValue || DateTime.Compare(x.LastModifiedOn, (DateTime)lastModifiedOnFilter) >= 0)
							&& (!(filter.Description != null) || x.Description.ToLower().Contains(filter.Description.ToLower())))
				.Select(x => new AnimalDto
				{
					Age = x.Age,
					Cage = x.Cage.Name,
					CageId = x.CageId,
					Foods = x.AnimalFoods.Select(x => x.Food.Name),
					Gender = x.Gender.GetEnumDescription(),
					ImageUrl = x.ImageUrl,
					NumberOfFoods = x.AnimalFoods.Count,
					Price = x.Price,
					KingdomType = x.KingdomType.GetEnumDescription(),
					Name = x.Name,
					LastModifiedBy = x.LastModifiedBy,
					CreatedBy = x.CreatedBy,
					Description = x.Description,
					Id = x.Id,
					CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
					LastModifiedOn = x.LastModifiedOn.ToString("d/MM/yyyy"),
				}).ToListAsync();

			if (filter.Skip.HasValue)
			{
				animals = animals.Skip((int)filter.Skip).ToList();
			}

			if (filter.Take.HasValue)
			{
				animals = animals.Take((int)filter.Take).ToList();
			}

			return animals;
		}

		public async Task<bool> DeleteAsync(int id)
		{
			var animalsFoods = await this.context.AnimalFoods.Where(x => x.AnimalId == id).ToListAsync();
			if (animalsFoods.Any())
			{
				this.context.AnimalFoods.RemoveRange(animalsFoods);
			}

			var animal = await this.context.Animals.Where(x => x.Id == id).FirstOrDefaultAsync();
			if (animal != null)
			{
				await this.context.Events.AddAsync(new Event
				{
					CageId = animal.CageId,
					CreatedBy = "System",
					CreatedOn = DateTime.Now,
					LastModifiedBy = "System",
					LastModifiedOn = DateTime.Now,
					Description = $"Animal {animal.Name} was removed from the cage",
					Type = EventType.WaitingForBaby
				});

				this.context.Animals.Remove(animal);
			}

			await this.context.SaveChangesAsync();

			return true;
		}

		public async Task<bool> CreateAsync(CreateAnimalDto data, string token)
        {
			var cage = await this.context.Cages.Include(x => x.Animals).FirstOrDefaultAsync(x => x.Id == data.CageId);
            if (cage == null || cage.Capacity == cage.Animals.Count)
            {
				return false;
            }

			var userInfo = await this.authService.GetUserInfoAsync(token);

            if (cage.Capacity == cage.Animals.Count + 1)
            {
				await this.context.Events.AddAsync(new Event
                {
					Cage = cage,
					CreatedBy = userInfo.FullName,
					CreatedOn = DateTime.Now,
					LastModifiedBy = userInfo.FullName,
					LastModifiedOn = DateTime.Now,
					Description = $"No more space in cage {data.Name}",
					Type = EventType.FullCage
				});
			}


			var animal = new Animal
			{
				Name = data.Name,
				Description = data.Description,
				CreatedBy = userInfo.FullName,
				CreatedOn = DateTime.Now,
				LastModifiedBy = userInfo.FullName,
				LastModifiedOn = DateTime.Now,
				Age = data.Age,
				CageId = data.CageId,
				Gender = (GenderType)data.Gender,
				ImageUrl = data.ImageUrl,
				KingdomType = (KingdomType)data.KingdomType,
				Price = data.Price

			};

			await this.context.Animals.AddAsync(animal);

			foreach (var foodId in data.FoodIds)
			{
				var food = await this.context.Foods.FirstOrDefaultAsync(x => x.Id == foodId);
				if (food == null)
				{
					continue;
				}

				await this.context.AnimalFoods.AddAsync(new AnimalFood
				{
					Animal = animal,
					Food = food,
					CreatedOn = DateTime.Now,
					CreatedBy = userInfo.FullName,
					LastModifiedBy = userInfo.FullName,
					LastModifiedOn = DateTime.Now
				});
			}

			if (cage.Animals.Any(x => x.Gender == GenderType.Male) && cage.Animals.Any(x => x.Gender == GenderType.Female))
			{
				await this.context.Events.AddAsync(new Event
				{
					Cage = cage,
					CreatedBy = userInfo.FullName,
					CreatedOn = DateTime.Now,
					LastModifiedBy = userInfo.FullName,
					LastModifiedOn = DateTime.Now,
					Description = $"Waiting for baby in cage {data.Name}",
					Type = EventType.WaitingForBaby
				});
			}

			await this.context.SaveChangesAsync();

			return true;
		}

		public async Task<IEnumerable<SelectDto>> GetOptions()
        {
			return await this.context.Animals.Select(x => new SelectDto
			{
				Id = x.Id,
				Name = x.Name
			}).ToListAsync();
        }

		public async Task<bool> UpdateAsync(CreateAnimalDto data, int id, string token)
		{
			var entity = await this.context.Animals.Include(x => x.AnimalFoods).Include(x => x.Cage).FirstOrDefaultAsync(x => x.Id == id);
			if (entity is null)
			{
				throw new Exception("Animal with that id was not found");
			}

			var userInfo = await this.authService.GetUserInfoAsync(token);
			entity.LastModifiedBy = userInfo.FullName;
			entity.LastModifiedOn = DateTime.Now;
			entity.Description = data.Description;
			entity.Name = data.Name;
			entity.ImageUrl = data.ImageUrl;
			entity.Price = data.Price;
			entity.Age = data.Age;
			entity.CageId = data.CageId;
			entity.Gender = (GenderType)data.Gender;
			entity.KingdomType = (KingdomType)data.KingdomType;

			this.context.Animals.Update(entity);

            if (entity.CageId != data.CageId)
            {
				await this.context.Events.AddAsync(new Event
				{
					Cage = entity.Cage,
					CreatedBy = userInfo.FullName,
					CreatedOn = DateTime.Now,
					LastModifiedBy = userInfo.FullName,
					LastModifiedOn = DateTime.Now,
					Description = $"Animal {entity.Name} removed from cage {entity.Cage.Name}",
					Type = EventType.AnimalRemoved
				});
			}

			foreach (var foodId in data.FoodIds)
			{
				if (entity.AnimalFoods.Any(x => x.FoodId == foodId))
				{
					continue;
				}

				var food = await this.context.Foods.FirstOrDefaultAsync(x => x.Id == foodId);
				if (food == null)
				{
					continue;
				}

				await this.context.AnimalFoods.AddAsync(new AnimalFood
				{
					Animal = entity,
					Food = food,
					CreatedOn = DateTime.Now,
					CreatedBy = userInfo.FullName,
					LastModifiedOn = DateTime.Now,
					LastModifiedBy = userInfo.FullName,
				});
			}

			foreach (var foodId in entity.AnimalFoods.Select(x => x.FoodId))
			{
				if (data.FoodIds.Any(x => x == foodId))
				{
					continue;
				}

				var animalFood = await this.context.AnimalFoods.FirstOrDefaultAsync(x => x.AnimalId == entity.Id && x.FoodId == foodId);
				if (animalFood == null)
				{
					continue;
				}

				this.context.AnimalFoods.Remove(animalFood);
			}

			await this.context.SaveChangesAsync();

			return true;
		}
	}
}

