using System;
using System.Globalization;
using Microsoft.EntityFrameworkCore;
using PuWeb.Data;
using PuWeb.Data.Entities;
using PuWeb.Models;

namespace PuWeb.Services
{
    public class CarMakeService
    {
        private readonly ApplicationDbContext context;
        private readonly AuthenticationService authService;

        public CarMakeService(ApplicationDbContext context, AuthenticationService authService)
        {
            this.context = context;
            this.authService = authService;
        }

        public async Task<IEnumerable<CarMakeDto>> GetAllAsync()
        {
            return await this.context.CarMakes
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new CarMakeDto
                {
                    Id = x.Id,
                    CreatedBy = x.CreatedBy,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    Description = x.Description,
                    FoundedBy = x.FoundedBy,
                    FoundedIn = x.FoundedIn.ToString("d/MM/yyyy"),
                    FullName = x.FullName,
                    Headquarters = x.Headquarters,
                    ImageUrl = x.ImageUrl,
                    Name = x.Name,
                    NumberOfCars = x.Cars.Count,
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                })
                .ToListAsync();
        }

        public async Task<CarMakeDto> GetByIdAsync(int id)
        {
            var data = await this.context.CarMakes
                .Where(x => x.Id == id)
                .Select(x => new CarMakeDto
                {
                    CreatedBy = x.CreatedBy,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    NumberOfCars = x.Cars.Count,
                    Id = x.Id,
                    Name = x.Name,
                    FoundedBy = x.FoundedBy,
                    FoundedIn = x.FoundedIn.ToString("d/MM/yyyy"),
                    Description = x.Description,
                    FullName = x.FullName,
                    Headquarters = x.Headquarters,
                    ImageUrl = x.ImageUrl,
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                })
                .FirstOrDefaultAsync();

            if (data is null)
            {
                throw new Exception("Car Make with that id was not found");
            }

            return data;
        }

        public async Task<bool> UpdateAsync(CreateCarMakeDto data, int id, string token)
        {
            var entity = await this.context.CarMakes.FirstOrDefaultAsync(x => x.Id == id);
            if (entity is null)
            {
                throw new Exception("Car Make with that id was not found");
            }

            var userInfo = await this.authService.GetUserInfoAsync(token);
            entity.LastModifiedBy = userInfo.FullName;
            entity.LastModifiedOn = DateTime.Now;
            entity.Name = data.Name;
            entity.FoundedBy = data.FoundedBy;
            entity.FoundedIn = DateTime.ParseExact(data.FoundedIn, "d/MM/yyyy", CultureInfo.InvariantCulture);
            entity.FullName = data.FullName;
            entity.ImageUrl = data.ImageUrl;
            entity.Headquarters = data.Headquarters;
            entity.Description = data.Description;

            this.context.CarMakes.Update(entity);
            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CreateAsync(CreateCarMakeDto data, string token)
        {
            var userInfo = await this.authService.GetUserInfoAsync(token);
            await this.context.CarMakes.AddAsync(new CarMake
            {
                Name = data.Name,
                FoundedBy = data.FoundedBy,
                Description = data.Description,
                CreatedBy = userInfo.FullName,
                CreatedOn = DateTime.Now,
                FoundedIn = DateTime.ParseExact(data.FoundedIn, "d/MM/yyyy", CultureInfo.InvariantCulture),
                FullName = data.FullName,
                ImageUrl = data.ImageUrl,
                Headquarters = data.Headquarters,
            });

            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var cars = await this.context.Cars.Where(x => x.CarMakeId == id).ToListAsync();
            foreach (var car in cars)
            {
                var carExtras = await this.context.CarExtras.Where(x => x.CarId == car.Id).ToListAsync();
                var carTunings = await this.context.CarTunings.Where(x => x.CarId == car.Id).ToListAsync();
                this.context.CarExtras.RemoveRange(carExtras);
                this.context.CarTunings.RemoveRange(carTunings);
            }

            if (cars.Any())
            {
                this.context.Cars.RemoveRange(cars);
            }

            var carMake = await this.context.CarMakes.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (carMake != null)
            {
                this.context.CarMakes.Remove(carMake);
            }

            await this.context.SaveChangesAsync();

            return true;
        }
    }
}

