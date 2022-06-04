using System;
using Microsoft.EntityFrameworkCore;
using ZooErp.Data;
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
			var cages = await this.context
				.Cages
				.Where(x => (!filter.Id.HasValue || x.Id == filter.Id)
							&& (!filter.FilterDate.HasValue || DateTime.Compare(x.CreatedOn, (DateTime)filter.FilterDate) >= 0))
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

			if (filter.Skip != null)
			{
				cages = cages.Skip((int)filter.Skip).ToList();
			}

			if (filter.Take != null)
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
	}
}

