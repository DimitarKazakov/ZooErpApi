using System;
using System.Globalization;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ZooErp.Data;
using ZooErp.Data.Entities;
using ZooErp.Models;
using ZooErp.Models.Enums;

namespace ZooErp.Services
{
	public class FoodService
	{
		private readonly ApplicationDbContext context;
		private readonly AuthenticationService authService;

		public FoodService(ApplicationDbContext context, AuthenticationService authService)
		{
			this.context = context;
			this.authService = authService;
		}

		public async Task<IEnumerable<FoodDto>> GetAsync(FilterDto filter)
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

			var foods = await this.context
				.Foods
				.Where(x => (!filter.Id.HasValue || x.Id == filter.Id)
							&& (!createdOnFilter.HasValue || DateTime.Compare(x.CreatedOn, (DateTime)createdOnFilter) >= 0)
							&& (!lastModifiedOnFilter.HasValue || DateTime.Compare(x.LastModifiedOn, (DateTime)lastModifiedOnFilter) >= 0)
							&& (!(filter.Description != null) || x.Description.ToLower().Contains(filter.Description.ToLower())))
				.Select(x => new FoodDto
				{
					Colories = x.Colories,
					CreatedBy = x.CreatedBy,
					TypeId = (int)x.Type,
					UsageTypeId = (int)x.UsageType,
					Description = x.Description,
					Id = x.Id,
					ImageUrl = x.ImageUrl,
					LastModifiedBy = x.LastModifiedBy,
					Name = x.Name,
					Price = x.Price,
					Type = x.Type.GetEnumDescription(),
					Quantity = x.AnimalFoods.Sum(x => x.Quantity),
					UsageType = x.UsageType.GetEnumDescription(),
					NumberOfAnimals = x.AnimalFoods.Count,
					Animals = x.AnimalFoods.Select(x => x.Animal.Name),
					CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
					LastModifiedOn = x.LastModifiedOn.ToString("d/MM/yyyy")
				}).ToListAsync();

            if (filter.Skip.HasValue)
            {
				foods = foods.Skip((int)filter.Skip).ToList();
            }

			if (filter.Take.HasValue)
			{
				foods = foods.Take((int)filter.Take).ToList();
			}

			return foods;
		}

		public async Task<bool> DeleteAsync(int id)
		{
			var animalsFoods = await this.context.AnimalFoods.Where(x => x.FoodId == id).ToListAsync();
			if (animalsFoods.Any())
			{
				this.context.AnimalFoods.RemoveRange(animalsFoods);
			}

			var food = await this.context.Foods.Where(x => x.Id == id).FirstOrDefaultAsync();
			if (food != null)
			{
				this.context.Foods.Remove(food);
			}

			await this.context.SaveChangesAsync();

			return true;
		}

		public async Task<bool> CreateAsync(CreateFoodDto data, string token)
		{
			var userInfo = await this.authService.GetUserInfoAsync(token);
			var food = new Food
			{
				Name = data.Name,
				Description = data.Description,
				CreatedBy = userInfo.FullName,
				CreatedOn = DateTime.Now,
				LastModifiedBy = userInfo.FullName,
				LastModifiedOn = DateTime.Now,
				ImageUrl = data.ImageUrl,
				Price = data.Price,
				Colories = data.Colories,
				Type = (FoodType)data.Type,
				UsageType = (UsageType)data.UsageType

			};

			await this.context.Foods.AddAsync(food);

			foreach (var animalId in data.AnimalIds)
			{
				var animal = await this.context.Animals.FirstOrDefaultAsync(x => x.Id == animalId);
				if (animal == null)
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

			await this.context.SaveChangesAsync();

			return true;
		}

		public async Task<IEnumerable<SelectDto>> GetOptions()
		{
			return await this.context.Foods.Select(x => new SelectDto
			{
				Id = x.Id,
				Name = x.Name
			}).ToListAsync();
		}

		public async Task<bool> UpdateAsync(CreateFoodDto data, int id, string token)
		{
			var entity = await this.context.Foods.Include(x => x.AnimalFoods).FirstOrDefaultAsync(x => x.Id == id);
			if (entity is null)
			{
				throw new Exception("Food with that id was not found");
			}

			var userInfo = await this.authService.GetUserInfoAsync(token);
			entity.LastModifiedBy = userInfo.FullName;
			entity.LastModifiedOn = DateTime.Now;
			entity.Description = data.Description;
			entity.Name = data.Name;
			entity.ImageUrl = data.ImageUrl;
			entity.Price = data.Price;
			entity.Colories = data.Colories;
			entity.Type = (FoodType)data.Type;
			entity.UsageType = (UsageType)data.UsageType;

			this.context.Foods.Update(entity);

			foreach (var animalId in data.AnimalIds)
			{
				if (entity.AnimalFoods.Any(x => x.AnimalId == animalId))
				{
					continue;
				}

				var animal = await this.context.Animals.FirstOrDefaultAsync(x => x.Id == animalId);
				if (animal == null)
				{
					continue;
				}

				await this.context.AnimalFoods.AddAsync(new AnimalFood
				{
					Animal = animal,
					Food = entity,
					CreatedOn = DateTime.Now,
					CreatedBy = userInfo.FullName,
					LastModifiedOn = DateTime.Now,
					LastModifiedBy = userInfo.FullName,
				});
			}

			foreach (var animalId in entity.AnimalFoods.Select(x => x.AnimalId))
			{
				if (data.AnimalIds.Any(x => x == animalId))
				{
					continue;
				}

				var animalFood = await this.context.AnimalFoods.FirstOrDefaultAsync(x => x.AnimalId == animalId && x.FoodId == entity.Id);
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

