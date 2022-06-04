using System;
using Microsoft.EntityFrameworkCore;
using ZooErp.Data;
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
			var animals = await this.context
				.Animals
				.Where(x => (!filter.Id.HasValue || x.Id == filter.Id)
							&& (!filter.FilterDate.HasValue || DateTime.Compare(x.CreatedOn, (DateTime)filter.FilterDate) >= 0))
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

			if (filter.Skip != null)
			{
				animals = animals.Skip((int)filter.Skip).ToList();
			}

			if (filter.Take != null)
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
				this.context.Animals.Remove(animal);
			}

			await this.context.SaveChangesAsync();

			return true;
		}
	}
}

