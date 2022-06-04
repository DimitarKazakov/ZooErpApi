using System;
using Microsoft.EntityFrameworkCore;
using PuWeb.Data;
using PuWeb.Data.Entities;
using PuWeb.Models;

namespace PuWeb.Services
{
	public class CarLevelService
	{
        private readonly ApplicationDbContext context;
        private readonly AuthenticationService authService;

        public CarLevelService(ApplicationDbContext context, AuthenticationService authService)
		{
            this.context = context;
            this.authService = authService;
        }

        public async Task<IEnumerable<CarLevelDto>> GetAllAsync()
        {
            return await this.context.CarLevels
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new CarLevelDto
                {
                    Id = x.Id,
                    CreatedBy = x.CreatedBy,
                    Name = x.Name,
                    NumberOfCars = x.Cars.Count,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                })
                .ToListAsync();
        }

        public async Task<CarLevelDto> GetByIdAsync(int id)
        {
            var data = await this.context.CarLevels
                .Where(x => x.Id == id)
                .Select(x => new CarLevelDto
                {
                    CreatedBy = x.CreatedBy,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    NumberOfCars = x.Cars.Count,
                    Id = x.Id,
                    Name = x.Name,
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                })
                .FirstOrDefaultAsync();

            if (data is null)
            {
                throw new Exception("Car Level with that id was not found");
            }

            return data;
        }

        public async Task<bool> UpdateAsync(CreateCarLevelDto data, int id, string token)
        {
            var entity = await this.context.CarLevels.FirstOrDefaultAsync(x => x.Id == id);
            if (entity is null)
            {
                throw new Exception("Car Level with that id was not found");
            }

            var userInfo = await this.authService.GetUserInfoAsync(token);
            entity.LastModifiedBy = userInfo.FullName;
            entity.LastModifiedOn = DateTime.Now;
            entity.Name = data.Name;

            this.context.CarLevels.Update(entity);
            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CreateAsync(CreateCarLevelDto data, string token)
        {
            var userInfo = await this.authService.GetUserInfoAsync(token);
            await this.context.CarLevels.AddAsync(new CarLevel
            {
                Name = data.Name,
                CreatedBy = userInfo.FullName,
                CreatedOn = DateTime.Now
            });

            await this.context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var cars = await this.context.Cars.Where(x => x.CarLevelId == id).ToListAsync();
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

            var carLevel = await this.context.CarLevels.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (carLevel != null)
            {
                this.context.CarLevels.Remove(carLevel);
            }

            await this.context.SaveChangesAsync();

            return true;
        }
    }
}

