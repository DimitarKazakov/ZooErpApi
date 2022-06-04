using System;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using PuWeb.Data;
using PuWeb.Data.Entities;
using PuWeb.Models;

namespace PuWeb.Services
{
	public class CarService
	{
        private readonly ApplicationDbContext context;
        private readonly AuthenticationService authService;

        public CarService(ApplicationDbContext context, AuthenticationService authService)
		{
            this.context = context;
            this.authService = authService;
        }

        public async Task<IEnumerable<CarDto>> GetAllAsync()
        {
            return await this.context.Cars
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new CarDto
                {
                    Id = x.Id,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    CreatedBy = x.CreatedBy,
                    Acceleration = x.Acceleration,
                    IsAutomatic = x.IsAutomatic,
                    Consumption = x.Consumption,
                    Doors = x.Doors,
                    ImageUrl = x.ImageUrl,
                    IsLeftSteering = x.IsLeftSteering,
                    Price = x.Price,
                    Weight = x.Weight,
                    Power = x.Power,
                    Model = x.Model,
                    MaxSpeed = x.MaxSpeed,
                    Year = x.Year.ToString("d/MM/yyyy"),
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                    BodyStyle = new BodyStyleDto
                    {
                        CreatedBy = x.BodyStyle.CreatedBy,
                        Id = x.BodyStyle.Id,
                        CreatedOn = x.BodyStyle.CreatedOn.ToString("d/MM/yyyy"),
                        Description = x.BodyStyle.Description,
                        Name = x.BodyStyle.Name,
                        NumberOfCars = x.BodyStyle.Cars.Count
                    },
                    CarLevel = new CarLevelDto
                    {
                        Id = x.CarLevel.Id,
                        CreatedBy = x.CarLevel.CreatedBy,
                        CreatedOn = x.CarLevel.CreatedOn.ToString("d/MM/yyyy"),
                        Name = x.CarLevel.Name,
                        NumberOfCars = x.CarLevel.Cars.Count
                    },
                    Color = new ColorDto
                    {
                        Code = x.Color.Code,
                        CreatedBy = x.Color.CreatedBy,
                        CreatedOn = x.Color.CreatedOn.ToString("d/MM/yyyy"),
                        Id = x.Color.Id,
                        NumberOfCars = x.Color.Cars.Count
                    },
                    FuelType = new FuelTypeDto
                    {
                        Id = x.FuelType.Id,
                        CreatedBy = x.FuelType.CreatedBy,
                        CreatedOn = x.FuelType.CreatedOn.ToString("d/MM/yyyy"),
                        CurrentPrice = x.FuelType.CurrentPrice,
                        Fuel = x.FuelType.Fuel,
                        NumberOfCars = x.FuelType.Cars.Count
                    },
                    Condition = new ConditionDto
                    {
                        Id = x.Condition.Id,
                        CreatedBy = x.Condition.CreatedBy,
                        Explanation = x.Condition.Explanation,
                        Name = x.Condition.Name,
                        Reason = x.Condition.Reason,
                        NumberOfCars = x.Condition.Cars.Count,
                        CreatedOn = x.CreatedOn.ToString("d/MM/yyyy")
                    },
                    CarMake = new CarMakeDto
                    {
                        Id = x.CarMake.Id,
                        CreatedBy = x.CarMake.CreatedBy,
                        CreatedOn = x.CarMake.CreatedOn.ToString("d/MM/yyyy"),
                        Description = x.CarMake.Description,
                        FoundedBy = x.CarMake.FoundedBy,
                        FoundedIn = x.CarMake.FoundedIn.ToString("d/MM/yyyy"),
                        FullName = x.CarMake.FullName,
                        Headquarters = x.CarMake.Headquarters,
                        ImageUrl = x.CarMake.ImageUrl,
                        Name = x.CarMake.Name,
                        NumberOfCars = x.CarMake.Cars.Count
                    },
                    Extras = x.CarExtras.Select(y => new ExtraDto
                    {
                        Id = y.ExtraId,
                        Brand = y.Extra.Brand,
                        CreatedBy = y.Extra.CreatedBy,
                        CreatedOn = y.Extra.CreatedOn.ToString("d/MM/yyyy"),
                        Description = y.Extra.Description,
                        ImageUrl = y.Extra.ImageUrl,
                        Name = y.Extra.Name,
                        UsualPrice = y.Extra.UsualPrice,
                        NumberOfCars = y.Extra.CarExtras.Count
                    }),
                    Tunings = x.CarTunings.Select(y => new TuningDto
                    {
                        Id = y.TuningId,
                        Brand = y.Tuning.Brand,
                        CreatedBy = y.Tuning.CreatedBy,
                        CreatedOn = y.Tuning.CreatedOn.ToString("d/MM/yyyy"),
                        Description = y.Tuning.Description,
                        Function = y.Tuning.Function,
                        ImageUrl = y.Tuning.ImageUrl,
                        Name = y.Tuning.Name,
                        NumberOfCars = y.Tuning.CarTunings.Count
                    })
                }).ToListAsync();
        }

        public async Task<CarDto> GetByIdAsync(int id)
        {
            var data = await this.context.Cars
                .Where(x => x.Id == id)
                .Select(x => new CarDto
                {
                    Id = x.Id,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    CreatedBy = x.CreatedBy,
                    Acceleration = x.Acceleration,
                    IsAutomatic = x.IsAutomatic,
                    Consumption = x.Consumption,
                    Doors = x.Doors,
                    ImageUrl = x.ImageUrl,
                    IsLeftSteering = x.IsLeftSteering,
                    Price = x.Price,
                    Weight = x.Weight,
                    Power = x.Power,
                    Model = x.Model,
                    MaxSpeed = x.MaxSpeed,
                    Year = x.Year.ToString("d/MM/yyyy"),
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                    BodyStyle = new BodyStyleDto
                    {
                        CreatedBy = x.BodyStyle.CreatedBy,
                        Id = x.BodyStyle.Id,
                        CreatedOn = x.BodyStyle.CreatedOn.ToString("d/MM/yyyy"),
                        Description = x.BodyStyle.Description,
                        Name = x.BodyStyle.Name,
                        NumberOfCars = x.BodyStyle.Cars.Count
                    },
                    CarLevel = new CarLevelDto
                    {
                        Id = x.CarLevel.Id,
                        CreatedBy = x.CarLevel.CreatedBy,
                        CreatedOn = x.CarLevel.CreatedOn.ToString("d/MM/yyyy"),
                        Name = x.CarLevel.Name,
                        NumberOfCars = x.CarLevel.Cars.Count
                    },
                    Color = new ColorDto
                    {
                        Code = x.Color.Code,
                        CreatedBy = x.Color.CreatedBy,
                        CreatedOn = x.Color.CreatedOn.ToString("d/MM/yyyy"),
                        Id = x.Color.Id,
                        NumberOfCars = x.Color.Cars.Count
                    },
                    FuelType = new FuelTypeDto
                    {
                        Id = x.FuelType.Id,
                        CreatedBy = x.FuelType.CreatedBy,
                        CreatedOn = x.FuelType.CreatedOn.ToString("d/MM/yyyy"),
                        CurrentPrice = x.FuelType.CurrentPrice,
                        Fuel = x.FuelType.Fuel,
                        NumberOfCars = x.FuelType.Cars.Count
                    },
                    Condition = new ConditionDto
                    {
                        Id = x.Condition.Id,
                        CreatedBy = x.Condition.CreatedBy,
                        Explanation = x.Condition.Explanation,
                        Name = x.Condition.Name,
                        Reason = x.Condition.Reason,
                        NumberOfCars = x.Condition.Cars.Count,
                        CreatedOn = x.CreatedOn.ToString("d/MM/yyyy")
                    },
                    CarMake = new CarMakeDto
                    {
                        Id = x.CarMake.Id,
                        CreatedBy = x.CarMake.CreatedBy,
                        CreatedOn = x.CarMake.CreatedOn.ToString("d/MM/yyyy"),
                        Description = x.CarMake.Description,
                        FoundedBy = x.CarMake.FoundedBy,
                        FoundedIn = x.CarMake.FoundedIn.ToString("d/MM/yyyy"),
                        FullName = x.CarMake.FullName,
                        Headquarters = x.CarMake.Headquarters,
                        ImageUrl = x.CarMake.ImageUrl,
                        Name = x.CarMake.Name,
                        NumberOfCars = x.CarMake.Cars.Count
                    },
                    Extras = x.CarExtras.Select(y => new ExtraDto
                    {
                        Id = y.ExtraId,
                        Brand = y.Extra.Brand,
                        CreatedBy = y.Extra.CreatedBy,
                        CreatedOn = y.Extra.CreatedOn.ToString("d/MM/yyyy"),
                        Description = y.Extra.Description,
                        ImageUrl = y.Extra.ImageUrl,
                        Name = y.Extra.Name,
                        UsualPrice = y.Extra.UsualPrice,
                        NumberOfCars = y.Extra.CarExtras.Count
                    }),
                    Tunings = x.CarTunings.Select(y => new TuningDto
                    {
                        Id = y.TuningId,
                        Brand = y.Tuning.Brand,
                        CreatedBy = y.Tuning.CreatedBy,
                        CreatedOn = y.Tuning.CreatedOn.ToString("d/MM/yyyy"),
                        Description = y.Tuning.Description,
                        Function = y.Tuning.Function,
                        ImageUrl = y.Tuning.ImageUrl,
                        Name = y.Tuning.Name,
                        NumberOfCars = y.Tuning.CarTunings.Count
                    })
                }).FirstOrDefaultAsync();

            if (data == null)
            {
                throw new Exception("Car with that id was not found");
            }

            return data;
        }

        public async Task<bool> UpdateAsync(CreateCarDto data, int id, string token)
        {
            var bodyStyle = await this.context.BodyStyles.FirstOrDefaultAsync(x => x.Id == data.BodyStyleId);
            if (bodyStyle == null)
            {
                throw new Exception("Body Style with that id was not found");
            }

            var carLevel = await this.context.CarLevels.FirstOrDefaultAsync(x => x.Id == data.CarLevelId);
            if (carLevel == null)
            {
                throw new Exception("Car Level with that id was not found");
            }

            var color = await this.context.Colors.FirstOrDefaultAsync(x => x.Id == data.ColorId);
            if (color == null)
            {
                throw new Exception("Color with that id was not found");
            }

            var fuelType = await this.context.FuelTypes.FirstOrDefaultAsync(x => x.Id == data.FuelTypeId);
            if (fuelType == null)
            {
                throw new Exception("Fuel Type with that id was not found");
            }

            var condition = await this.context.Conditions.FirstOrDefaultAsync(x => x.Id == data.ConditionId);
            if (condition == null)
            {
                throw new Exception("Condition with that id was not found");
            }

            var carMake = await this.context.CarMakes.FirstOrDefaultAsync(x => x.Id == data.CarMakeId);
            if (carMake == null)
            {
                throw new Exception("Car Make with that id was not found");
            }

            var car = await this.context.Cars.FirstOrDefaultAsync(x => x.Id == id);
            if (car == null)
            {
                throw new Exception("Car with that id was not found");
            }

            var userInfo = await this.authService.GetUserInfoAsync(token);
            car.Acceleration = data.Acceleration;
            car.IsAutomatic = data.IsAutomatic;
            car.BodyStyle = bodyStyle;
            car.CarLevel = carLevel;
            car.CarMake = carMake;
            car.Condition = condition;
            car.Color = color;
            car.Consumption = data.Consumption;
            car.Doors = data.Doors;
            car.FuelType = fuelType;
            car.Year = DateTime.ParseExact(data.Year, "d/MM/yyyy", CultureInfo.InvariantCulture);
            car.LastModifiedBy = userInfo.FullName;
            car.LastModifiedOn = DateTime.Now;
            car.ImageUrl = data.ImageUrl;
            car.Weight = data.Weight;
            car.Price = data.Price;
            car.Power = data.Power;
            car.Model = data.Model;
            car.MaxSpeed = data.MaxSpeed;
            car.IsLeftSteering = data.IsLeftSteering;

            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> CreateAsync(CreateCarDto data, string token)
        {
            var bodyStyle = await this.context.BodyStyles.FirstOrDefaultAsync(x => x.Id == data.BodyStyleId);
            if (bodyStyle == null)
            {
                throw new Exception("Body Style with that id was not found");
            }

            var carLevel = await this.context.CarLevels.FirstOrDefaultAsync(x => x.Id == data.CarLevelId);
            if (carLevel == null)
            {
                throw new Exception("Car Level with that id was not found");
            }

            var color = await this.context.Colors.FirstOrDefaultAsync(x => x.Id == data.ColorId);
            if (color == null)
            {
                throw new Exception("Color with that id was not found");
            }

            var fuelType = await this.context.FuelTypes.FirstOrDefaultAsync(x => x.Id == data.FuelTypeId);
            if (fuelType == null)
            {
                throw new Exception("Fuel Type with that id was not found");
            }

            var condition = await this.context.Conditions.FirstOrDefaultAsync(x => x.Id == data.ConditionId);
            if (condition == null)
            {
                throw new Exception("Condition with that id was not found");
            }

            var carMake = await this.context.CarMakes.FirstOrDefaultAsync(x => x.Id == data.CarMakeId);
            if (carMake == null)
            {
                throw new Exception("Car Make with that id was not found");
            }

            var userInfo = await this.authService.GetUserInfoAsync(token);
            var car = new Car
            {
                Acceleration = data.Acceleration,
                IsAutomatic = data.IsAutomatic,
                BodyStyle = bodyStyle,
                CarLevel = carLevel,
                CarMake = carMake,
                Condition = condition,
                Color = color,
                Consumption = data.Consumption,
                Doors = data.Doors,
                FuelType = fuelType,
                Year = DateTime.ParseExact(data.Year, "d/MM/yyyy", CultureInfo.InvariantCulture),
                CreatedBy = userInfo.FullName,
                CreatedOn = DateTime.Now,
                ImageUrl = data.ImageUrl,
                Weight = data.Weight,
                Price = data.Price,
                Power = data.Power,
                Model = data.Model,
                MaxSpeed = data.MaxSpeed,
                IsLeftSteering = data.IsLeftSteering
            };

            await this.context.Cars.AddAsync(car);

            foreach (var extraId in data.ExtraIds)
            {
                var extra = await this.context.Extras.FirstOrDefaultAsync(x => x.Id == extraId);
                if (extra == null)
                {
                    continue;
                }

                await this.context.CarExtras.AddAsync(new CarExtras
                {
                    Car = car,
                    Extra = extra,
                    CreatedOn = DateTime.Now,
                    CreatedBy = userInfo.FullName
                });
            }

            foreach (var tunningId in data.TunningIds)
            {
                var tunning = await this.context.Tunings.FirstOrDefaultAsync(x => x.Id == tunningId);
                if (tunning == null)
                {
                    continue;
                }

                await this.context.CarTunings.AddAsync(new CarTunings
                {
                    Car = car,
                    Tuning = tunning,
                    CreatedOn = DateTime.Now,
                    CreatedBy = userInfo.FullName
                });
            }

            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var carTunings = await this.context.CarTunings.Where(x => x.CarId == id).ToListAsync();
            if (carTunings.Any())
            {
                this.context.CarTunings.RemoveRange(carTunings);
            }

            var carExtras = await this.context.CarExtras.Where(x => x.CarId == id).ToListAsync();
            if (carExtras.Any())
            {
                this.context.CarExtras.RemoveRange(carExtras);
            }

            var car = await this.context.Cars.FirstOrDefaultAsync(x => x.Id == id);
            if (car != null)
            {
                this.context.Cars.Remove(car);
            }

            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateExtraAsync(UpdateCarExtraDto data, string token)
        {
            var car = await this.context.Cars.Include(x => x.CarExtras).FirstOrDefaultAsync(x => x.Id == data.CarId);
            if (car == null)
            {
                throw new Exception("Car with that id was not found");
            }

            var carExtraIds = car.CarExtras.Select(x => x.ExtraId);
            var userInfo = await this.authService.GetUserInfoAsync(token);
            foreach (var extraId in data.ExtraIds)
            {
                if (carExtraIds.Any(x => x == extraId))
                {
                    continue;
                }

                var extra = await this.context.Extras.FirstOrDefaultAsync(x => x.Id == extraId);
                if (extra == null)
                {
                    continue;
                }

                await this.context.CarExtras.AddAsync(new CarExtras
                {
                    Car = car,
                    Extra = extra,
                    CreatedOn = DateTime.Now,
                    CreatedBy = userInfo.FullName
                });
            }

            foreach (var extraId in carExtraIds)
            {
                if (data.ExtraIds.Any(x => x == extraId))
                {
                    continue;
                }

                var carExtra = await this.context.CarExtras.FirstOrDefaultAsync(x => x.ExtraId == extraId && x.CarId == car.Id);
                if (carExtra == null)
                {
                    continue;
                }

                this.context.CarExtras.Remove(carExtra);
            }

            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateTunningAsync(UpdateCarTuningDto data, string token)
        {
            var car = await this.context.Cars.Include(x => x.CarTunings).FirstOrDefaultAsync(x => x.Id == data.CarId);
            if (car == null)
            {
                throw new Exception("Car with that id was not found");
            }

            var carTunningIds = car.CarTunings.Select(x => x.TuningId);
            var userInfo = await this.authService.GetUserInfoAsync(token);
            foreach (var tunningId in data.TuningIds)
            {
                if (carTunningIds.Any(x => x == tunningId))
                {
                    continue;
                }

                var tunning = await this.context.Tunings.FirstOrDefaultAsync(x => x.Id == tunningId);
                if (tunning == null)
                {
                    continue;
                }

                await this.context.CarTunings.AddAsync(new CarTunings
                {
                    Car = car,
                    Tuning = tunning,
                    CreatedOn = DateTime.Now,
                    CreatedBy = userInfo.FullName
                });
            }

            foreach (var tunningId in carTunningIds)
            {
                if (data.TuningIds.Any(x => x == tunningId))
                {
                    continue;
                }

                var carTunning = await this.context.CarTunings.FirstOrDefaultAsync(x => x.TuningId == tunningId && x.CarId == car.Id);
                if (carTunning == null)
                {
                    continue;
                }

                this.context.CarTunings.Remove(carTunning);
            }

            await this.context.SaveChangesAsync();
            return true;
        } 
    }
}

