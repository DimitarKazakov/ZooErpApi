using System;
using System.Globalization;
using Newtonsoft.Json;
using PuWeb.Data;
using PuWeb.Data.Entities;
using PuWeb.SeedData.Models;

namespace PuWeb.Services
{
	public class SeedService
	{
		private readonly ApplicationDbContext context;

		public SeedService(ApplicationDbContext context)
		{
			this.context = context;
		}

		public async Task<int> SeedFuelTypesAsync()
		{
			var count = 0;
			var currentDir = Directory.GetCurrentDirectory();
			using var reader = new StreamReader($"{currentDir}/SeedData/FuelTypes.json");
			string jsonString = reader.ReadToEnd();
			if (jsonString is null)
			{
				return count;
			}

			var fuelTypes = JsonConvert.DeserializeObject<FuelTypeSeedModel[]>(jsonString);
			foreach (var fuelType in fuelTypes)
			{
				if (this.context.FuelTypes.Any(x => x.Fuel == fuelType.Fuel))
				{
					continue;
				}

				await this.context.FuelTypes.AddAsync(new FuelType
				{
					Fuel = fuelType.Fuel,
					CurrentPrice = fuelType.CurrentPrice,
					CreatedOn = DateTime.Now,
					CreatedBy = "System"
				});

				count++;
			}

			await this.context.SaveChangesAsync();
			return count;
		}

		public async Task<int> SeedExtrasAsync()
		{
			var count = 0;
			var currentDir = Directory.GetCurrentDirectory();
			using var reader = new StreamReader($"{currentDir}/SeedData/Extras.json");
			string jsonString = reader.ReadToEnd();
			if (jsonString is null)
			{
				return count;
			}

			var extras = JsonConvert.DeserializeObject<ExtraSeedModel[]>(jsonString);
			foreach (var extra in extras)
			{
				if (this.context.Extras.Any(x => x.Name == extra.Name))
				{
					continue;
				}

				await this.context.Extras.AddAsync(new Extra
				{
					Name = extra.Name,
					UsualPrice = extra.UsualPrice,
					CreatedOn = DateTime.Now,
					CreatedBy = "System",
					Description = extra.Description,
					Brand = extra.Brand,
					ImageUrl = extra.ImageUrl
				});

				count++;
			}

			await this.context.SaveChangesAsync();
			return count;
		}

		public async Task<int> SeedTunningsAsync()
        {
			var count = 0;
			var currentDir = Directory.GetCurrentDirectory();
			using var reader = new StreamReader($"{currentDir}/SeedData/Tunnings.json");
			string jsonString = reader.ReadToEnd();
            if (jsonString is null)
            {
				return count;
            }

			var tunnings = JsonConvert.DeserializeObject<TunningSeedModel[]>(jsonString);
			foreach (var tunning in tunnings)
			{
                if (this.context.Tunings.Any(x => x.Name == tunning.Name))
                {
					continue;
                }

				await this.context.Tunings.AddAsync(new Tuning
				{
					Name = tunning.Name,
					Function = tunning.Function,
					Description = tunning.Description,
					ImageUrl = tunning.ImageUrl,
					Brand = tunning.Brand,
					CreatedOn = DateTime.Now,
					CreatedBy = "System"
				});

				count++;
			}

			await this.context.SaveChangesAsync();
			return count;
		}

		public async Task<int> SeedBodyStylesAsync()
		{
			var count = 0;
			var currentDir = Directory.GetCurrentDirectory();
			using var reader = new StreamReader($"{currentDir}/SeedData/BodyStyles.json");
			string jsonString = reader.ReadToEnd();
			if (jsonString is null)
			{
				return count;
			}

			var bodyStyles = JsonConvert.DeserializeObject<BodyStyleSeedModel[]>(jsonString);
			foreach (var bodyStyle in bodyStyles)
			{
				if (this.context.BodyStyles.Any(x => x.Name == bodyStyle.Name))
				{
					continue;
				}

				await this.context.BodyStyles.AddAsync(new BodyStyle
				{
					Name = bodyStyle.Name,
					Description = bodyStyle.Description,
					CreatedOn = DateTime.Now,
					CreatedBy = "System"
				});

				count++;
			}

			await this.context.SaveChangesAsync();
			return count;
		}

		public async Task<int> SeedColorsAsync()
		{
			var count = 0;
			var currentDir = Directory.GetCurrentDirectory();
			using var reader = new StreamReader($"{currentDir}/SeedData/Colors.json");
			string jsonString = reader.ReadToEnd();
			if (jsonString is null)
			{
				return count;
			}

			var colors = JsonConvert.DeserializeObject<ColorSeedModel[]>(jsonString);
			foreach (var color in colors)
			{
				if (this.context.Colors.Any(x => x.Code == color.Code))
				{
					continue;
				}

				await this.context.Colors.AddAsync(new Color
				{
					Code = color.Code,
					CreatedOn = DateTime.Now,
					CreatedBy = "System"
				});

				count++;
			}

			await this.context.SaveChangesAsync();
			return count;
		}

		public async Task<int> SeedCarLevelsAsync()
		{
			var count = 0;
			var currentDir = Directory.GetCurrentDirectory();
			using var reader = new StreamReader($"{currentDir}/SeedData/CarLevels.json");
			string jsonString = reader.ReadToEnd();
			if (jsonString is null)
			{
				return count;
			}

			var carLevels = JsonConvert.DeserializeObject<CarLevelSeedModel[]>(jsonString);
			foreach (var carLevel in carLevels)
			{
				if (this.context.CarLevels.Any(x => x.Name == carLevel.Name))
				{
					continue;
				}

				await this.context.CarLevels.AddAsync(new CarLevel
				{
					Name = carLevel.Name,
					CreatedOn = DateTime.Now,
					CreatedBy = "System"
				});

				count++;
			}

			await this.context.SaveChangesAsync();
			return count;
		}

		public async Task<int> SeedConditionsAsync()
		{
			var count = 0;
			var currentDir = Directory.GetCurrentDirectory();
			using var reader = new StreamReader($"{currentDir}/SeedData/Conditions.json");
			string jsonString = reader.ReadToEnd();
			if (jsonString is null)
			{
				return count;
			}

			var conditions = JsonConvert.DeserializeObject<ConditionSeedModel[]>(jsonString);
			foreach (var condition in conditions)
			{
				if (this.context.Conditions.Any(x => x.Name == condition.Name && x.Reason == condition.Reason))
				{
					continue;
				}

				await this.context.Conditions.AddAsync(new Condition
				{
					Name = condition.Name,
					Reason = condition.Reason,
					Explanation = condition.Explanation,
					CreatedOn = DateTime.Now,
					CreatedBy = "System"
				});

				count++;
			}

			await this.context.SaveChangesAsync();
			return count;
		}

		public async Task<int> SeedCarMakesAsync()
		{
			var count = 0;
			var currentDir = Directory.GetCurrentDirectory();
			using var reader = new StreamReader($"{currentDir}/SeedData/CarMakes.json");
			string jsonString = reader.ReadToEnd();
			if (jsonString is null)
			{
				return count;
			}

			var carMakes = JsonConvert.DeserializeObject<CarMakeSeedModel[]>(jsonString);
			foreach (var carMake in carMakes)
			{
				if (this.context.CarMakes.Any(x => x.Name == carMake.Name))
				{
					continue;
				}

				await this.context.CarMakes.AddAsync(new CarMake
				{
					Name = carMake.Name,
					Description = carMake.Description,
					FoundedBy = carMake.FoundedBy,
					Headquarters = carMake.Headquarters,
					FullName = carMake.FullName,
					ImageUrl = carMake.ImageUrl,
					FoundedIn = DateTime.ParseExact(carMake.FoundedIn, "dd/MM/yyyy", CultureInfo.InvariantCulture),
					CreatedOn = DateTime.Now,
					CreatedBy = "System"
				});

				count++;
			}

			await this.context.SaveChangesAsync();
			return count;
		}
	}
}

