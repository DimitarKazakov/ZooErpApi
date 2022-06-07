using System;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using ZooErp.Data;
using ZooErp.Data.Entities;
using ZooErp.Models;
using ZooErp.Models.Enums;

namespace ZooErp.Services
{
	public class CageService
	{
        private readonly ApplicationDbContext context;
        private readonly AuthenticationService authService;

        public CageService(ApplicationDbContext context, AuthenticationService authService)
		{
            this.context = context;
            this.authService = authService;
        }

        public async Task<IEnumerable<CageDto>> GetAsync(FilterDto filter)
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

			var cages = await this.context
				.Cages
				.Where(x => (!filter.Id.HasValue || x.Id == filter.Id)
							&& (!createdOnFilter.HasValue || DateTime.Compare(x.CreatedOn, (DateTime)createdOnFilter) >= 0)
							&& (!lastModifiedOnFilter.HasValue || DateTime.Compare(x.LastModifiedOn, (DateTime)lastModifiedOnFilter) >= 0)
							&& (!(filter.Description != null) || x.Description.ToLower().Contains(filter.Description.ToLower())))
				.Select(x => new CageDto
				{
					Area = x.Area,
					Capacity = x.Capacity,
					ImageUrl = x.ImageUrl,
					Location = x.Location,
					Rating = x.Rating,
					Type = x.Type.GetEnumDescription(),
					Name = x.Name,
					LastModifiedBy = x.LastModifiedBy,
					CreatedBy = x.CreatedBy,
					Description = x.Description,
					Id = x.Id,
					CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
					LastModifiedOn = x.LastModifiedOn.ToString("d/MM/yyyy"),
					Animals = x.Animals.Select(y => new AnimalDto
					{
						Age = y.Age,
						Cage = x.Name,
						CageId = x.Id,
						Foods = y.AnimalFoods.Select(x => x.Food.Name),
						Gender = y.Gender.GetEnumDescription(),
						ImageUrl = y.ImageUrl,
						NumberOfFoods = y.AnimalFoods.Count,
						Price = y.Price,
						KingdomType = y.KingdomType.GetEnumDescription(),
						Name = y.Name,
						LastModifiedBy = y.LastModifiedBy,
						CreatedBy = y.CreatedBy,
						Description = y.Description,
						Id = y.Id,
						CreatedOn = y.CreatedOn.ToString("d/MM/yyyy"),
						LastModifiedOn = y.LastModifiedOn.ToString("d/MM/yyyy"),
					}),
					Events = x.Events.Select(y => new EventDto
					{
						Cage = x.Name,
						CageId = x.Id,
						LastModifiedBy = y.LastModifiedBy,
						Type = y.Type.GetEnumDescription(),
						CreatedBy = y.CreatedBy,
						Description = y.Description,
						Id = y.Id,
						CreatedOn = y.CreatedOn.ToString("d/MM/yyyy"),
						LastModifiedOn = y.LastModifiedOn.ToString("d/MM/yyyy")
					})
				}).ToListAsync();

			if (filter.Skip.HasValue)
			{
				cages = cages.Skip((int)filter.Skip).ToList();
			}

			if (filter.Take.HasValue)
			{
				cages = cages.Take((int)filter.Take).ToList();
			}

			return cages;
		}

		public async Task<bool> DeleteAsync(int id)
		{
			var animals = await this.context.Animals.Where(x => x.CageId == id).ToListAsync();
			foreach (var animal in animals)
			{
				var animalFoods = await this.context.AnimalFoods.Where(x => x.AnimalId == animal.Id).ToListAsync();
                if (animalFoods.Any())
                {
					this.context.AnimalFoods.RemoveRange(animalFoods);
				}
			}

			if (animals.Any())
			{
				this.context.Animals.RemoveRange(animals);
			}

			var events = await this.context.Events.Where(x => x.CageId == id).ToListAsync();
            if (events.Any())
            {
				this.context.Events.RemoveRange(events);
			}

			var cage = await this.context.Cages.Where(x => x.Id == id).FirstOrDefaultAsync();
			if (cage != null)
			{
				this.context.Cages.Remove(cage);
			}

			await this.context.SaveChangesAsync();

			return true;
		}

		public async Task<bool> CreateAsync(CreateCageDto data, string token)
		{
			var userInfo = await this.authService.GetUserInfoAsync(token);
			var cage = new Cage
			{
				Name = data.Name,
				Description = data.Description,
				CreatedBy = userInfo.FullName,
				CreatedOn = DateTime.Now,
				LastModifiedBy = userInfo.FullName,
				LastModifiedOn = DateTime.Now,
				ImageUrl = data.ImageUrl,
				Type = (CageType)data.Type,
				Area = data.Area,
				Capacity = data.Capacity,
				Location = data.Location,
				Rating = data.Rating
			};

			await this.context.Cages.AddAsync(cage);

			await this.context.Events.AddAsync(new Event
			{
				Cage = cage,
				CreatedBy = userInfo.FullName,
				CreatedOn = DateTime.Now,
				LastModifiedBy = userInfo.FullName,
				LastModifiedOn = DateTime.Now,
				Description = $"Cage {data.Name} was created",
				Type = EventType.CageCreated
			});

			await this.context.SaveChangesAsync();

			return true;
		}

		public async Task<IEnumerable<SelectDto>> GetOptions()
		{
			return await this.context.Cages.Select(x => new SelectDto
			{
				Id = x.Id,
				Name = x.Name
			}).ToListAsync();
		}

		public async Task<bool> UpdateAsync(CreateCageDto data, int id, string token)
		{
			var entity = await this.context.Cages.FirstOrDefaultAsync(x => x.Id == id);
			if (entity is null)
			{
				throw new Exception("Cage with that id was not found");
			}


			var userInfo = await this.authService.GetUserInfoAsync(token);

			entity.Description = data.Description;
			entity.ImageUrl = data.ImageUrl;
			entity.Type = (CageType)data.Type;
			entity.Area = data.Area;
			entity.Capacity = data.Capacity;
			entity.Location = data.Location;
			entity.Rating = data.Rating;
			entity.LastModifiedBy = userInfo.FullName;
			entity.LastModifiedOn = DateTime.Now;
			entity.Name = data.Name;

			this.context.Cages.Update(entity);

			await this.context.Events.AddAsync(new Event
			{
				Cage = entity,
				CreatedBy = userInfo.FullName,
				CreatedOn = DateTime.Now,
				LastModifiedBy = userInfo.FullName,
				LastModifiedOn = DateTime.Now,
				Description = $"Cage {data.Name} was updated",
				Type = EventType.Update
			});

			await this.context.SaveChangesAsync();

			return true;
		}
	}
}

