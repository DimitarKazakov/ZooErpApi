using System;
using Microsoft.EntityFrameworkCore;
using PuWeb.Data;
using PuWeb.Data.Entities;
using PuWeb.Models;

namespace PuWeb.Services
{
	public class FuelTypesService
	{
        private readonly ApplicationDbContext context;
        private readonly AuthenticationService authService;

        public FuelTypesService(ApplicationDbContext context, AuthenticationService authService)
        {
            this.context = context;
            this.authService = authService;
        }

        public async Task<IEnumerable<FuelTypeDto>> GetAllAsync()
        {
            return await this.context.FuelTypes
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new FuelTypeDto
                {
                    Id = x.Id,
                    Fuel = x.Fuel,
                    CurrentPrice = x.CurrentPrice,
                    NumberOfCars = x.Cars.Count,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    CreatedBy = x.CreatedBy,
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                })
                .ToListAsync();
        }

        public async Task<FuelTypeDto> GetByIdAsync(int id)
        {
            var data = await this.context.FuelTypes
                .Where(x => x.Id == id)
                .Select(x => new FuelTypeDto
                {
                    CreatedBy = x.CreatedBy,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    NumberOfCars = x.Cars.Count,
                    Id = x.Id,
                    Fuel = x.Fuel,
                    CurrentPrice = x.CurrentPrice,
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                })
                .FirstOrDefaultAsync();

            if (data is null)
            {
                throw new Exception("Fuel Type with that id was not found");
            }

            return data;
        }

        public async Task<bool> UpdateAsync(CreateFuelTypeDto data, int id, string token)
        {
            var entity = await this.context.FuelTypes.FirstOrDefaultAsync(x => x.Id == id);
            if (entity is null)
            {
                throw new Exception("Fuel Type with that id was not found");
            }

            var userInfo = await this.authService.GetUserInfoAsync(token);
            entity.LastModifiedBy = userInfo.FullName;
            entity.LastModifiedOn = DateTime.Now;
            entity.CurrentPrice = data.CurrentPrice;
            entity.Fuel = data.Fuel;

            this.context.FuelTypes.Update(entity);
            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CreateAsync(CreateFuelTypeDto data, string token)
        {
            var userInfo = await this.authService.GetUserInfoAsync(token);
            await this.context.FuelTypes.AddAsync(new FuelType
            {
                Fuel = data.Fuel,
                CurrentPrice = data.CurrentPrice,
                CreatedBy = userInfo.FullName,
                CreatedOn = DateTime.Now
            });

            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var cars = await this.context.Cars.Where(x => x.FuelTypeId == id).ToListAsync();
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

            var fuelType = await this.context.FuelTypes.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (fuelType != null)
            {
                this.context.FuelTypes.Remove(fuelType);
            }

            await this.context.SaveChangesAsync();

            return true;
        }
    }
}

