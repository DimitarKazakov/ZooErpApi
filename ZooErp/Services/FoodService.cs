using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ZooErp.Data;
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
			var foods = await this.context
				.Foods
				.Where(x => (!filter.Id.HasValue || x.Id == filter.Id)
							&& (!filter.FilterDate.HasValue || DateTime.Compare(x.CreatedOn, (DateTime)filter.FilterDate) >= 0))
				.Select(x => new FoodDto
				{
					Colories = x.Colories,
					CreatedBy = x.CreatedBy,
					Description = x.Description,
					Id = x.Id,
					ImageUrl = x.ImageUrl,
					LastModifiedBy = x.LastModifiedBy,
					Name = x.Name,
					Price = x.Price,
					Type = x.Type.GetEnumDescription(),
					Quantity = x.Quantity,
					UsageType = x.UsageType.GetEnumDescription(),
					CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
					LastModifiedOn = x.LastModifiedOn.ToString("d/MM/yyyy")
				}).ToListAsync();

            if (filter.Skip != null)
            {
				foods = foods.Skip((int)filter.Skip).ToList();
            }

			if (filter.Take != null)
			{
				foods = foods.Take((int)filter.Take).ToList();
			}

			return foods;
		}
	}
}

