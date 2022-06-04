using System;
using Microsoft.EntityFrameworkCore;
using PuWeb.Data;
using PuWeb.Data.Entities;
using PuWeb.Models;

namespace PuWeb.Services
{
	public class ColorService
	{
        private readonly ApplicationDbContext context;
        private readonly AuthenticationService authService;

        public ColorService(ApplicationDbContext context, AuthenticationService authService)
		{
            this.context = context;
            this.authService = authService;
        }

        public async Task<IEnumerable<ColorDto>> GetAllAsync()
        {
            return await this.context.Colors
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new ColorDto
                {
                    Id = x.Id,
                    Code = x.Code,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    CreatedBy = x.CreatedBy,
                    NumberOfCars = x.Cars.Count,
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                })
                .ToListAsync();
        }

        public async Task<ColorDto> GetByIdAsync(int id)
        {
            var data = await this.context.Colors
                .Where(x => x.Id == id)
                .Select(x => new ColorDto
                {
                    CreatedBy = x.CreatedBy,
                    CreatedOn = x.CreatedOn.ToString("d/MM/yyyy"),
                    NumberOfCars = x.Cars.Count,
                    Id = x.Id,
                    Code = x.Code,
                    LastModifiedBy = x.LastModifiedBy != null ? x.LastModifiedBy : "X",
                    LastModifiedOn = x.LastModifiedOn != null ? x.LastModifiedOn.Value.ToString("d/MM/yyyy") : "X",
                })
                .FirstOrDefaultAsync();

            if (data is null)
            {
                throw new Exception("Color with that id was not found");
            }

            return data;
        }

        public async Task<bool> UpdateAsync(CreateColorDto data, int id, string token)
        {
            var entity = await this.context.Colors.FirstOrDefaultAsync(x => x.Id == id);
            if (entity is null)
            {
                throw new Exception("Color with that id was not found");
            }

            var userInfo = await this.authService.GetUserInfoAsync(token);
            entity.LastModifiedBy = userInfo.FullName;
            entity.LastModifiedOn = DateTime.Now;
            entity.Code = data.Code;

            this.context.Colors.Update(entity);
            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CreateAsync(CreateColorDto data, string token)
        {
            var userInfo = await this.authService.GetUserInfoAsync(token);
            await this.context.Colors.AddAsync(new Color
            {
                Code = data.Code,
                CreatedBy = userInfo.FullName,
                CreatedOn = DateTime.Now,
            });

            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var cars = await this.context.Cars.Where(x => x.ColorId == id).ToListAsync();
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

            var color = await this.context.Colors.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (color != null)
            {
                this.context.Colors.Remove(color);
            }

            await this.context.SaveChangesAsync();

            return true;
        }
    }
}

